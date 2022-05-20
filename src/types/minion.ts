import IAbility from "./ability"

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
    Permanent: 1
    Temporary: 0
  },
  Perk: null
  Abilities: IAbility[]
  Cosmetic: number
  Dead: boolean
  Destroyed: boolean
  DestroyedBy: null
  Id: {
    BoardId: string
    Unique: number
  }
  Price: number,
  Frozen: boolean
}