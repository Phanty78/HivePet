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

export enum FoodList {
  red_berry = 'Red Berry',
  raw_meat = 'Raw Meat',
  hard_nut = 'Hard Nut',
  live_grass = 'Live Grass',
  golden_nectar = 'Golden Nectar',
  rotten_meat = 'Rotten Meat'
}

// CREATURES

export enum CreatureList {
  pyrofox = 'Pyrofox',
  aquashell = 'Aquashell',
  thornbug = 'Thornbug',
  zappowl = 'Zappowl',
  shadecat = 'Shadecat'
}

export enum CreatureElement {
  Normal = "Normal",
  Fire = "Fire",
  Water = "Water",
  Earth = "Earth",
  Air = "Air",
  Light = "Light",
  Shadow = "Shadow",
  Rock = "Rock",
  Insect = "Insect"
}

export interface CreatureStats {
  hp: number
  atk: number
  def: number
  spd: number
  sta: number
}

// Handle action Type

export enum Actions {
  mint = 'mint',
  feed = 'feed'
}

export interface MintType {
  action : Actions.mint,
  type : CreatureList,
  name : string
}

export interface FeedType {
  action : Actions.feed,
  food : FoodList,
  creatureId : number,
}

export type GamePayload = MintType | FeedType