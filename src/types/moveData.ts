import IItemId from "./itemId"

export type IBoardFreezes = {ItemId:IItemId, Freeze:boolean}[]
export type IBoardOrders = {MinionId:IItemId, Point:{x:number, y:number}}[]



export default interface IMoveData {
	BoardFreezes: IBoardFreezes | null,
	BoardOrders: IBoardOrders | null,
	BoardHash: number,
	BuildId: string
}