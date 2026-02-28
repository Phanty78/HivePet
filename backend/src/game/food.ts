import { FOOD, HUNGER } from '../constants'
import { DietType } from '../types'

export function feedCreature(
  foodType: string,
  creatureDiet: DietType,
  currentHunger: number
): number {
  // HINT - cette contrainte devient un problème si le joueur veut utiliser une food pour boost sa créature
  if (currentHunger >= HUNGER.MAX) {
    throw new Error(`${currentHunger} est égale ou supérieur à la constante HUNGER.MAX`)
  }

  if (!(foodType in FOOD)) {
    console.warn(`${foodType} n'est pas une FOOD déclaré dans la constante FOOD`)
    return currentHunger
  }

  const food = FOOD[foodType as keyof typeof FOOD]

  // Si le foodType n'est pas comptable avec creatureDiet alors on retourne currentHunger
  if (!(food.valid_diets as readonly DietType[]).includes(creatureDiet)) {
    console.warn(`${food} n'est pas une nouritture valide pour ${creatureDiet}`)
    return currentHunger
  }

  let updatedHunger = currentHunger + food.hunger
  if (updatedHunger > HUNGER.MAX) {
    updatedHunger = HUNGER.MAX
  }
  return updatedHunger
}
