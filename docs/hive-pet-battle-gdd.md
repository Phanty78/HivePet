# HIVE PET BATTLE

**Game Design Document**

Blockchain : Hive | Genre : Idle / Pet Battle | Plateforme : Web
Version : 0.1 — Prototype
Date : Février 2026

---

## 1. Vision du jeu

Hive Pet Battle est un jeu idle/casual sur la blockchain Hive où les joueurs collectionnent, nourrissent et font combattre des créatures numériques. Chaque créature est un NFT minté sur Hive Engine, et toutes les actions de jeu sont enregistrées on-chain via des custom_json.

Le jeu repose sur un cycle d'engagement quotidien : nourrir ses créatures pour les maintenir en forme, les entraîner via des combats, et gérer ses ressources entre heal, nourriture et boosts.

## 2. Core Loop

Le gameplay s'articule autour de trois actions principales, toutes liées par un système de faim et de stamina qui régule le rythme de jeu.

### 2.1 Feed (Nourrir)

L'action la plus importante du jeu. Chaque créature possède une jauge de faim qui décroît avec le temps. Si la jauge atteint zéro, la créature passe en état « Starving » et ne peut plus combattre ni recevoir de boosts. Le feed est donc un pré-requis obligatoire pour toute activité de jeu.

- **Nourriture de base :** permet uniquement de maintenir la créature hors de l'état Starving. Coûte peu de tokens. N'accorde aucun gain de stats, son seul rôle est de garder la créature opérationnelle pour combattre.
- **Nourriture de boost (phase ultérieure) :** items plus rares et chers qui confient un buff temporaire (ex : +20% ATK pendant 3 combats). Ne sera pas implémenté dans le MVP, prévu pour une mise à jour future.
- **Fréquence :** la jauge de faim se vide en ~12-24h selon le niveau, créant un engagement quotidien type tamagotchi.

### 2.2 Battle (Combattre)

Combat résolu côté serveur (validator node) mais présenté au joueur sous forme de logs détaillés qui s'affichent au fur et à mesure, créant une expérience narrative.

- **Pré-requis :** la créature ne doit pas être en Starving et doit avoir assez de Stamina.
- **Résolution :** la SPD détermine l'ordre d'attaque. Les dégâts sont calculés par ATK de l'attaquant vs DEF du défenseur, avec une variance aléatoire de ±15%.
- **Logs de combat :** chaque tour génère des messages affichés progressivement : « Pyrofox attaque et inflige 8 dégâts », « Aquashell esquive l'attaque ! », « Pyrofox subit 5 dégâts (12 ATK - 7 DEF) », jusqu'à la résolution finale.
- **Récompenses :** victoire = XP + tokens du jeu. Défaite = perte de HP, nécessité de heal.
- **Coût :** chaque combat consomme de la Stamina (ex : 5 STA par combat).

### 2.3 Heal (Soigner)

Récupération des HP après un combat. Le joueur a le choix entre deux méthodes :

- **Attente gratuite :** régénération passive de 1 HP toutes les X minutes (ajustable selon la balance).
- **Heal instantané (payant) :** coûte des tokens du jeu (PET) pour un heal complet immédiat.

## 3. Système de statistiques

Chaque créature possède 5 statistiques de base, déterminées au mint avec une variance aléatoire qui crée de la rareté naturelle.

| Icône | Stat | Rôle                                                              |
| ----- | ---- | ----------------------------------------------------------------- |
| ❤️    | HP   | Points de vie. Détermine la survie en combat.                     |
| ⚔️    | ATK  | Attaque. Détermine les dégâts infligés à l'adversaire.            |
| 🛡️    | DEF  | Défense. Réduit les dégâts subis en combat.                       |
| 💨    | SPD  | Vitesse. Détermine l'ordre d'attaque et la chance d'esquive.      |
| ⚡    | STA  | Stamina. Énergie nécessaire pour agir. Se régénère avec le temps. |

La Stamina se régénère passivement (1 STA toutes les X minutes) ou peut être restaurée instantanément via le token du jeu, identique au modèle de heal.

## 4. Système de faim

La faim est le mécanisme central de rétention du jeu. Chaque créature a une jauge de faim de 0 à 100.

| État     | Jauge  | Effets                                          |
| -------- | ------ | ----------------------------------------------- |
| Rassasié | 75-100 | Bonus de +10% sur toutes les stats en combat.   |
| Normal   | 25-74  | Aucun modificateur, fonctionnement standard.    |
| Affamé   | 1-24   | Malus de -15% sur ATK et SPD.                   |
| Starving | 0      | Impossible de combattre ou recevoir des boosts. |

La jauge diminue de ~4 points par heure, soit un cycle complet de ~24h. Nourrir avec de la nourriture de base restaure 30-50 points selon le type.

## 5. Progression et leveling

L'XP est gagnée principalement via les combats, avec un bonus de fidélité pour le feed régulier.

- **Victoire en combat :** +10-30 XP selon le niveau de l'adversaire.
- **Défaite en combat :** +3-5 XP (récompense de participation).
- **Feed quotidien :** +5 XP par feed si la créature n'était pas en Starving, récompensant les joueurs assidus.

Chaque level up augmente légèrement les stats de base (+1-2 points répartis aléatoirement) et débloque l'accès à des adversaires plus forts avec de meilleures récompenses.

## 6. Types de nourriture

### 6.1 Nourriture de base

La nourriture de base sert uniquement à maintenir la jauge de faim. Elle n'accorde aucun bonus de stats. Différents types existent pour varier le gameplay et les coûts.

| Aliment     | Coût  | Faim restaurée |
| ----------- | ----- | -------------- |
| Baie rouge  | 2 PET | +30 faim       |
| Viande crue | 3 PET | +25 faim       |
| Noix dure   | 3 PET | +25 faim       |
| Herbe vive  | 2 PET | +35 faim       |
| Nectar doré | 4 PET | +40 faim       |

### 6.2 Nourriture de boost (prévue phase ultérieure)

Non implémentée dans le MVP. Les boosts temporaires seront ajoutés dans une mise à jour future pour enrichir la stratégie de combat. Exemples envisagés :

| Aliment            | Coût      | Effet             | Durée     |
| ------------------ | --------- | ----------------- | --------- |
| Élixir de rage     | 15 tokens | +25% ATK          | 3 combats |
| Bouclier de fer    | 15 tokens | +25% DEF          | 3 combats |
| Potion de célérité | 12 tokens | +30% SPD          | 3 combats |
| Festin royal       | 30 tokens | +15% toutes stats | 5 combats |

Les boosts ne sont pas cumulables entre eux (le dernier écrase le précédent). Ne peut être appliqué que si la créature est en état Normal ou Rassasié.

## 7. Économie et tokenomics

### 7.1 Token du jeu

Un token Hive Engine (ex : PET) est la monnaie principale du jeu, obtenue via les victoires en combat et échangeable sur le marché Hive Engine.

### 7.2 Principe fondamental : émission < burn

Il est vital que le taux de burn (dépenses) soit supérieur au taux d'émission (gains) pour éviter la dévaluation rapide du token. Les joueurs doivent néanmoins percevoir un potentiel de gain pour rester motivés. L'équilibre visé : un joueur actif et stratégique peut être légèrement rentable, tandis qu'un joueur casual dépensera plus qu'il ne gagne, créant une pression déflationniste naturelle.

### 7.3 Sources de tokens (faucets)

- **Victoire en combat :** 5-20 PET selon le niveau de l'adversaire.
- **Bonus quotidien :** 10 PET pour le premier combat gagné du jour.
- **Série de victoires :** bonus multiplicateur pour les victoires consécutives.

### 7.4 Dépenses de tokens (sinks)

- **Nourriture de base :** 2-4 PET par feed (dépense récurrente obligatoire — principal sink du jeu).
- **Heal instantané :** 5-15 PET selon les HP manquants.
- **Stamina instantanée :** 8-12 PET pour remplir la jauge.
- **Mint de créature :** coût unique de 100 PET (ou 5 HIVE) pour créer une nouvelle créature.

## 8. Créatures (NFTs)

Chaque créature est un NFT Hive Engine. Au mint, les stats de base sont générées aléatoirement dans une fourchette liée au type, créant de la rareté naturelle.

### 8.1 Offre limitée par lots

Le nombre total de créatures est limité. Le mint s'ouvre par lots successifs pour contrôler l'offre et créer de la rareté.

- **Lot 1 (lancement) :** 100 créatures disponibles au mint.
- **Lots suivants :** taille et timing définis en fonction de la demande et de la santé économique du jeu.
- **Pas de limite par joueur :** un joueur peut posséder autant de créatures qu'il le souhaite (mais chacune doit être nourrie individuellement).

### 8.2 Types de créatures

| Créature  | HP    | ATK   | DEF   | SPD   | STA   |
| --------- | ----- | ----- | ----- | ----- | ----- |
| Pyrofox   | 28-32 | 10-14 | 6-10  | 8-12  | 18-22 |
| Aquashell | 36-44 | 6-10  | 12-16 | 4-8   | 16-20 |
| Thornbug  | 32-38 | 8-12  | 10-14 | 6-10  | 20-24 |
| Zappowl   | 26-30 | 12-16 | 4-8   | 12-16 | 14-18 |
| Shadecat  | 30-34 | 9-13  | 7-11  | 10-14 | 17-21 |

Les créatures avec des stats proches du maximum de leur fourchette seront naturellement plus recherchées sur le marché secondaire, créant une économie de trading.

## 9. Architecture technique (Hive)

### 9.1 Stack

- **Frontend :** React + @hiveio/dhive + Hive Keychain SDK
- **Backend (Validator Node) :** Bun qui lit les blocs Hive, parse les custom_json du jeu et met à jour l'état en BDD.
- **Base de données :** MySQL ou PostgreSQL pour l'état du jeu (stats, inventaire, cooldowns).
- **Tokens & NFTs :** Hive Engine (sidechain) via l'API sscjs.

### 9.2 Flux d'une action

1. Le joueur clique sur « Feed » dans le frontend.
2. Hive Keychain signe et broadcast un custom_json : `{ action: "feed", creature_id: "xxx", food: "baie_rouge" }`
3. Le validator node détecte la transaction dans le bloc suivant (~3 sec).
4. Il vérifie les règles (créature valide, nourriture en inventaire, pas en cooldown).
5. Il met à jour l'état en BDD (faim, stats, XP) et notifie le frontend via WebSocket.

### 9.3 custom_json types

| Action | Payload                       | Auth    |
| ------ | ----------------------------- | ------- |
| mint   | `{ creature_type }`           | Active  |
| feed   | `{ creature_id, food_type }`  | Posting |
| battle | `{ creature_id, difficulty }` | Posting |
| heal   | `{ creature_id, method }`     | Posting |

## 10. Roadmap MVP

### Phase 1 — Fondations : Mint + Feed (3-4 semaines)

- Connexion Hive Keychain
- Mint d'une créature (NFT Hive Engine) — premier lot de 100 créatures
- Système de Feed avec jauge de faim et état Starving
- Token PET sur Hive Engine pour acheter la nourriture
- Validator node basique (Bun + MySQL)
- Interface web minimaliste

### Phase 2 — Combat + Heal (3-4 semaines)

- Système de Battle avec logs détaillés et récompenses
- Système de Heal (attente gratuite + heal payant)
- Système de leveling (XP + gain de stats)
- Classement / leaderboard

### Phase 3 — Économie + Profondeur (en continu)

- Nourriture de boost (buffs temporaires)
- Ouverture de nouveaux lots de mint
- Marché de créatures (trading NFT)
- Nouveaux types de créatures
- Système d'éléments (avantages/faiblesses)
- Combats PvP entre joueurs
- Tournois avec reward pool
- Breeding / évolution de créatures

## 11. Décisions prises

- Pas de limite au nombre de créatures par joueur.
- Pas de système de breeding dans le MVP.
- Nourriture de boost reportée à une phase ultérieure.
- Offre de créatures limitée, mint par lots (premier lot : 100 créatures).
- Émission de tokens strictement inférieure au burn pour éviter la dévaluation.

## 12. Questions ouvertes

- Quel mécanisme anti-bot pour éviter le farming automatisé ? (à définir plus tard)
- Quel taux exact de décroissance de la jauge de faim par niveau ?
- Quel ratio XP/niveau pour la courbe de progression ?
- Faut-il un cooldown entre les combats en plus du coût en Stamina ?
- Taille et prix des lots de mint suivants ?
