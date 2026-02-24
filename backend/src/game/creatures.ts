import { HUNGER } from "../constants";

// Cette fonction compare le moment du dernier repas avec l'heure actuel et renvoie le taux de faim mis a jour
export function getHunger(lastFedAt: Date, now: Date): number {

    if (lastFedAt.getTime() > now.getTime()){
        throw new Error("lastFedAt can't be in the future");
    }

    const elapsed_time_in_ms: number = now.getTime() - lastFedAt.getTime()
    const elapsed_time_in_hours : number = elapsed_time_in_ms / (1000 * 60 * 60)
    const hunger_lost : number = elapsed_time_in_hours * HUNGER.DECAY_PER_HOUR
    return Math.max(0, HUNGER.MAX - hunger_lost)
}