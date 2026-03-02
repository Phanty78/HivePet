import { describe, it, expect } from 'bun:test'
import { feedCreature, getHungerState } from '../../src/game/food'
import { FOOD } from '../../src/constants'
import { DietType, hungerThresholds } from '../../src/types'

describe('FeedCreature', () => {
  it('Devrais throw si la valeur de current-hunger est supérieure ou égale à hunger.max.', () => {
    expect(() => feedCreature('red_berry', DietType.Omnivore, 100)).toThrow()
  })

  it('devraient retourner le number 80', () => {
    expect(feedCreature('red_berry', DietType.Omnivore, 50)).toBe(FOOD.red_berry.hunger + 50)
  })

  it("devrait retourner le numéro 50 car le food type n'existe pas", () => {
    expect(feedCreature('red_sorry', DietType.Omnivore, 50)).toBe(50)
  })

  it("devrait retourner le numéro 50 car Le DietType n'autorise pas cette nourriture.", () => {
    expect(feedCreature('red_berry', DietType.Carnivore, 50)).toBe(50)
  })
})

describe('getHungerState', () => {
  it("Devrait throw si Currenthunger est inférieur à zéro.", () => {
    expect(() => getHungerState(-1)).toThrow()
  })

  it("devrait renvoyer Satiated si currenthunger est supérieure ou égale à HUNGER.THRESHOLDS.SATIATED", () => {
    expect(getHungerState(76)).toBe(hungerThresholds.Satiated)
  })

  it("devrait renvoyer Satiated si currenthunger est inférieur à HUNGER.THRESHOLDS.HUNGRY", () => {
    expect(getHungerState(0)).toBe(hungerThresholds.Starving)
  })
})
