import IAbility from "./ability"
import IItemId from "./itemId"

export default interface IMinion {
  Owner: number
  Enum: number
  Location: number
  Point: {
    x: number
    y: number
  },
  Exp: number
  Level: number
  Health: {
    Permanent: number
    Temporary: number
  },
  Attack: {
    Permanent: number
    Temporary: number
  },
  Perk: null
  Abilities: IAbility[]
  Cosmetic: number
  Dead: boolean
  Destroyed: boolean
  DestroyedBy: null
  Id: IItemId
  Price: number
  Frozen: boolean
}