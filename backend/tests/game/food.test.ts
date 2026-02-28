import { describe, it, expect } from 'bun:test'
import { feedCreature } from '../../src/game/food'
import { FOOD } from '../../src/constants'
import { DietType } from '../../src/types'

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
