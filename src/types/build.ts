import IBoard from "./board"

export default interface IBuild {
    Id: string
    Board: IBoard
    AvailableCaptains: number[]
    AvailableAdjectives: [string, string, string]
    AvailableNouns: [string, string, string]
}