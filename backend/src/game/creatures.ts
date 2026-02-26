import { HUNGER, CREATURE_STATS } from '../constants'
import { CreatureType } from '../../generated/prisma'
import { CreatureStats } from '../types'

// Cette fonction compare le moment du dernier repas avec l'heure actuel et renvoie le taux de faim mis a jour
export function getHunger(lastFedAt: Date, now: Date): number {
  if (lastFedAt.getTime() > now.getTime()) {
    throw new Error("lastFedAt can't be in the future")
  }

  const elapsed_time_in_ms: number = now.getTime() - lastFedAt.getTime()
  const elapsed_time_in_hours: number = elapsed_time_in_ms / (1000 * 60 * 60)
  const hunger_lost: number = elapsed_time_in_hours * HUNGER.DECAY_PER_HOUR
  return Math.max(0, HUNGER.MAX - hunger_lost)
}

// Cette fonction initialise les caractéristique d'une créature de facon déterministe lors du mint
export function rollStats(
  creatureType: CreatureType,
  blockId: string,
  txId: string
): CreatureStats {
  const hash = new Bun.CryptoHasher('sha256').update(`${blockId}:${txId}`).digest()
  const ranges = CREATURE_STATS[creatureType]
  let index = 0
  const stats: CreatureStats = { hp: 0, atk: 0, def: 0, spd: 0, sta: 0 }
  for (const [statName, [min, max]] of Object.entries(ranges)) {
    stats[statName as keyof CreatureStats] = min + (hash[index] % (max - min + 1))
    index++
  }
  return stats
}
