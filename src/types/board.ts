import IMinion from "./minion"
import ISpell from "./spell"

export default interface IBoard {
  Id: string
  UniqueNumberCounter: number,
  State: number,
  Captain: number,
  LivesMax: number,
  Losses: number,
  LossPointsMode: number,
  LossPoints: number,
  Victories: number,
  VictoriesMax: number,
  Turn: number,
  Gold: number,
  Tier: number,
  BoardCapacity: number,

  Minions: {
    Size: {
      x: 5,
      y: 1
    },
    Items: (IMinion|null)[]
  },

  MinionShopCapacity: number
  MinionShopAttackBonus: number
  MinionShopHealthBonus: number
  MinionShop: IMinion[]
  SpellShopCapacity: number
  SpellShop: ISpell[]
  Adjective: string|null
  Noun: string|null
  PreviousOutcome: number
  PreviousEnemies: null
  MinionGraveyard: []
  MinionsPlayed: number
  MinionSold: []
  SpellPlayed: []
  Mode: number
  Cosmetic: number
  Background: number
  Pack: number
  Deck: null
  Hash: number
}