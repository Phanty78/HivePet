import { Client } from '@hiveio/dhive'
import { PrismaClient, ValidatorState } from '../../generated/prisma'
import { parseBlock } from './parser'

const client = new Client([
  'https://api.hive.blog',
  'https://api.hivekings.com',
  'https://anyx.io',
  'https://api.openhive.network',
])
const prisma = new PrismaClient()

export async function startStreaming() {
  // On essaie de récupérer en BDD la valeur du dernier bloc
  const state: ValidatorState | null = await prisma.validatorState.findUnique({
    where: { id: 1 },
  })

  let currentBlock: number

  if (state != null) {
    currentBlock = state.lastBlockNum + 1
  } else {
    // Si la valeur n'exite pas en BDD alors on récupère le dernier bloc traité directement sur la blockchain
    const props = await client.database.getDynamicGlobalProperties()
    currentBlock = props.last_irreversible_block_num
  }

  while (true) {
    const props = await client.database.getDynamicGlobalProperties()
    if (currentBlock <= props.last_irreversible_block_num) {
      const block = await client.database.getBlock(currentBlock)

      if (!block) continue
      // Traitement du bloc via le parser
      await parseBlock(block, currentBlock)
      // Sauverage en BDD du bloc courant
      await prisma.validatorState.upsert({
        create: {
          lastBlockNum: currentBlock,
          id: 1,
        },
        update: {
          lastBlockNum: currentBlock,
        },
        where: {
          id: 1,
        },
      })
      currentBlock++
    } else {
      await Bun.sleep(3000)
    }
  }
}
