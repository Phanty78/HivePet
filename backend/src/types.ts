// FOOD

export enum DietType {
  Carnivore = 'Carnivore',
  Herbivore = 'Herbivore',
  Omnivore = 'Omnivore',
  Scavenger = 'Scavenger',
}

export enum hungerThresholds {
  Satiated = "Satiated",
  Normal = "Normal",
  Hungry = "Hungry",
  Starving = "Starving",
}

// CREATURES

export interface CreatureStats {
  hp: number
  atk: number
  def: number
  spd: number
  sta: number
}
