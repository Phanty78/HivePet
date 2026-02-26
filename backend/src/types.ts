export enum DietType {
  Carnivore = 'Carnivore',
  Herbivore = 'Herbivore',
  Omnivore = 'Omnivore',
  Scavenger = 'Scavenger',
}

export interface CreatureStats {
  hp: number
  atk: number
  def: number
  spd: number
  sta: number
}
