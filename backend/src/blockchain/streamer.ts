import { Client } from "@hiveio/dhive";
import { PrismaClient, ValidatorState } from "../../generated/prisma"; 

const client = new Client(["https://api.hive.blog", "https://api.hivekings.com", "https://anyx.io", "https://api.openhive.network"])
const prisma = new PrismaClient()

export async function  startStreaming(){
    // On essaie de récupérer en BDD la valeur du dernier bloc
    const state: ValidatorState | null  = await prisma.validatorState.findUnique({
        where: { id: 1}
    })

    let currentBlock: number;

    if (state != null){
        currentBlock =  state.lastBlockNum + 1
    }else{
        // Si la valeur n'exite pas en BDD alors on récupère le dernier bloc traité directement sur la blockchain
       let props = await client.database.getDynamicGlobalProperties()
       currentBlock = props.last_irreversible_block_num
    }

    while(true){
        const block = await client.database.getBlock(currentBlock)
        // TODO - a compléter
       
    }