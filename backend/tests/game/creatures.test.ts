import { describe, it, expect } from 'bun:test'
import { getHunger, rollStats } from '../../src/game/creatures'
import { CreatureType } from '../../generated/prisma'
import { CREATURE_STATS } from '../../src/constants'

describe('getHunger', () => {
  const now = new Date('2026-02-28T01:00:00')
  const nowLater = new Date('9999-12-15')
  const nowMinorOneHour = new Date('2026-02-28T00:00:00')
  const nowMinorOneYear = new Date('2025-02-28T00:00:00')

  it('Devrais throw Si lastFed At est supérieur au now.getTime.', () => {
    expect(() => getHunger(nowLater, now, 80)).toThrow()
  })

  it('devrait pedre 4 point de faim après 1 heure et retourner le numéro 76', () => {
    expect(getHunger(nowMinorOneHour, now, 80)).toBe(76)
  })

  it('devrait retourner le numéro 80', () => {
    expect(getHunger(now, now, 80)).toBe(80)
  })

  it('devrait retourner le numéro 0', () => {
    expect(getHunger(nowMinorOneYear, now, 80)).toBe(0)
  })
})

describe('rollStats', () => {
  it("devraient Retournez les mêmes statistiques deux fois, car c'est une approche déterministe.", () => {
    const firstRoll = rollStats(CreatureType.Pyrofox, 'block123', 'tx123')
    const secondRoll = rollStats(CreatureType.Pyrofox, 'block123', 'tx123')
    expect(firstRoll).toEqual(secondRoll)
  })

  // Peut échouer en cas de hash identique, mais c'est peu probable.
  it('devraient Retournez des résultat différents', () => {
    const firstRoll = rollStats(CreatureType.Pyrofox, 'block123', 'tx123')
    const secondRoll = rollStats(CreatureType.Pyrofox, 'block157', 'tx212')
    expect(firstRoll).not.toEqual(secondRoll)
  })

  it('devraient Être dans la plage de données acceptable.', () => {
    const firstRoll = rollStats(CreatureType.Pyrofox, 'block123', 'tx123')
    expect(firstRoll.hp).toBeGreaterThanOrEqual(CREATURE_STATS.Pyrofox.hp[0])
    expect(firstRoll.hp).toBeLessThanOrEqual(CREATURE_STATS.Pyrofox.hp[1])
    expect(firstRoll.atk).toBeGreaterThanOrEqual(CREATURE_STATS.Pyrofox.atk[0])
    expect(firstRoll.atk).toBeLessThanOrEqual(CREATURE_STATS.Pyrofox.atk[1])
    expect(firstRoll.def).toBeGreaterThanOrEqual(CREATURE_STATS.Pyrofox.def[0])
    expect(firstRoll.def).toBeLessThanOrEqual(CREATURE_STATS.Pyrofox.def[1])
    expect(firstRoll.spd).toBeGreaterThanOrEqual(CREATURE_STATS.Pyrofox.spd[0])
    expect(firstRoll.spd).toBeLessThanOrEqual(CREATURE_STATS.Pyrofox.spd[1])
    expect(firstRoll.sta).toBeGreaterThanOrEqual(CREATURE_STATS.Pyrofox.sta[0])
    expect(firstRoll.sta).toBeLessThanOrEqual(CREATURE_STATS.Pyrofox.sta[1])
  })
})
