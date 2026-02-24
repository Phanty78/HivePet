// === Fourchettes de stats par type de créature ===

export const CREATURE_STATS = {
  Pyrofox:   { hp: [28, 32], atk: [10, 14], def: [6, 10],  spd: [8, 12],  sta: [18, 22] },
  Aquashell: { hp: [36, 44], atk: [6, 10],  def: [12, 16], spd: [4, 8],   sta: [16, 20] },
  Thornbug:  { hp: [32, 38], atk: [8, 12],  def: [10, 14], spd: [6, 10],  sta: [20, 24] },
  Zappowl:   { hp: [26, 30], atk: [12, 16], def: [4, 8],   spd: [12, 16], sta: [14, 18] },
  Shadecat:  { hp: [30, 34], atk: [9, 13],  def: [7, 11],  spd: [10, 14], sta: [17, 21] },
} as const;

// === Système de faim ===

export const HUNGER = {
  MAX: 100,
  DECAY_PER_HOUR: 4,
  THRESHOLDS: {
    SATIATED: 75,   // 75-100 : +10% stats en combat
    NORMAL: 25,     // 25-74  : aucun modificateur
    HUNGRY: 1,      // 1-24   : -15% ATK et SPD
    STARVING: 0,    // 0      : impossible de combattre
  },
  MODIFIERS: {
    SATIATED_BONUS: 0.10,
    HUNGRY_ATK_MALUS: -0.15,
    HUNGRY_SPD_MALUS: -0.15,
  },
} as const;

// === Nourriture de base ===

export enum DietType {
  Carnivore = "Carnivore",
  Herbivore = "Herbivore",
  Omnivore = "Omnivore",
  Scavenger = "Scavenger",
}

export const FOOD = {
  red_berry:  { cost: 2, hunger: 30, valid_diets: [DietType.Herbivore, DietType.Omnivore] },
  raw_meat: { cost: 3, hunger: 25, valid_diets: [DietType.Carnivore, DietType.Omnivore] },
  hard_nut:   { cost: 3, hunger: 25, valid_diets: [DietType.Herbivore, DietType.Omnivore] },
  live_grass:  { cost: 2, hunger: 35, valid_diets: [DietType.Herbivore, DietType.Omnivore] },
  golden_nectar: { cost: 4, hunger: 40, valid_diets: [DietType.Herbivore, DietType.Omnivore] },
  rotten_meat: { cost: 1, hunger: 10, valid_diets: [DietType.Scavenger] },
} as const;

// === Mint ===

export const MINT = {
  COST_PET: 100, // valeur en token du jeu
  COST_HIVE: 5,
  FIRST_LOT_SIZE: 100, // nombre de créatures dans le premier lot de mint
} as const;

// === Progression ===

export const XP = {
  VICTORY_MIN: 10,
  VICTORY_MAX: 30,
  DEFEAT_MIN: 3,
  DEFEAT_MAX: 5,
  FEED_BONUS: 5,
} as const;
