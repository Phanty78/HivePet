# HIVE PET BATTLE — Suivi d'avancement

Dernière mise à jour : 28 Février 2026

---

## Phase 1 — Fondations : Mint + Feed

### Infrastructure & Setup

- [x] Monorepo Bun avec workspaces (backend + frontend)
- [x] Configuration Bun + TypeScript
- [x] PostgreSQL + Prisma (modèles: ValidatorState, Creature, GameTransaction, MintLot)
- [x] Configuration environnement (config.ts, .env, DATABASE_URL)
- [x] Bootstrap & graceful shutdown (index.ts)
- [x] Seed du lot 1 (100 créatures)

### Blockchain Streaming

- [x] Streamer — boucle sur blocs irréversibles
- [x] Streamer — checkpoint du bloc courant en BDD
- [x] Parser — filtrage des custom_json id="hivepet"
- [x] Parser — dédoublonnage par txId
- [x] Parser — gestion JSON invalide (warn + skip)
- [x] Parser — gestion required_posting_auths manquant (warn + skip)
- [x] Tests parser

### Système de créatures

- [x] rollStats — génération déterministe via SHA-256 (blockId:txId)
- [x] rollStats — stats dans les ranges par type de créature
- [x] Constantes — types de créatures (Pyrofox, Aquashell, Thornbug, Zappowl, Shadecat)
- [x] Tests rollStats (déterminisme, variation, ranges)

### Système de faim

- [x] getHunger — calcul dynamique basé sur le temps écoulé
- [x] getHunger — prise en compte du hungerAtLastFed
- [x] Constantes — DECAY_PER_HOUR (~4/h), HUNGER.MAX (100)
- [x] Tests getHunger (throw, décroissance, zéro, même timestamp)
- [x] getHungerState — détermination de l'état de faim (Satiated/Normal/Hungry/Starving)
- [ ] Tests getHungerState

### Système de nourriture

- [x] feedCreature — calcul de la faim mise à jour
- [x] feedCreature — gestion foodType invalide (warn + return)
- [x] feedCreature — gestion régime incompatible (warn + return)
- [x] feedCreature — cap à HUNGER.MAX
- [x] Constantes — types de nourriture (red_berry, raw_meat, hard_nut, vivid_herb, golden_nectar)
- [x] Constantes — régimes alimentaires (Carnivore, Herbivore, Omnivore, Scavenger)
- [x] Tests feedCreature (throw, cas nominal, food invalide, régime incompatible)

### Actions (routeur)

- [x] handleAction — routeur switch sur payload.action
- [x] handleAction — validation username
- [ ] Typage du payload (interface)
- [ ] Action mint — logique complète (vérif lot, places dispo, création créature, NFT)
- [ ] Action feed — logique complète (vérif créature, ownership, calcul faim, update BDD)

### Token & Economie

- [ ] Token PET sur Hive Engine
- [ ] Coût de la nourriture en PET
- [ ] Coût du mint (100 PET ou 5 HIVE)

### Frontend

- [ ] Connexion Hive Keychain
- [ ] Interface web minimaliste
- [ ] Broadcast des custom_json via Keychain

---

## Phase 2 — Combat + Heal

- [ ] Système de combat (résolution par SPD, ATK vs DEF, variance ±15%)
- [ ] Logs de combat détaillés
- [ ] Coût en Stamina par combat
- [ ] Récompenses (XP + PET tokens)
- [ ] Système de Heal (régénération passive + heal payant)
- [ ] Système de leveling (XP, gain de stats au level up)
- [ ] Classement / leaderboard

---

## Phase 3 — Economie + Profondeur

- [ ] Nourriture de boost (buffs temporaires)
- [ ] Nouveaux lots de mint
- [ ] Marché de créatures (trading NFT)
- [ ] Nouveaux types de créatures
- [ ] Système d'éléments (avantages/faiblesses)
- [ ] Combats PvP
- [ ] Tournois avec reward pool
- [ ] Breeding / évolution
