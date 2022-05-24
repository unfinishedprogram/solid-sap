import { createSignal } from "solid-js";
import IBoard from "../types/board";
import IBuild from "../types/build";
import IMinion from "../types/minion";
import ISpell from "../types/spell";

function createReactiveBoard(baseState:IBoard) {
	const [Hash, setHash] = createSignal(baseState.Hash);
	const [MinionShopAttackBonus, setMinionShopAttackBonus] = createSignal(baseState.MinionShopAttackBonus);
	const [MinionShopHealthBonus, setMinionShopHealthBonus] = createSignal(baseState.MinionShopHealthBonus);
	const [MinionShopCapacity, setMinionShopCapacity] = createSignal(0);
	const [MinionShop, setMinionShop] = createSignal<IMinion[]>(baseState.MinionShop);
	const [SpellShop, setSpellShop] = createSignal<ISpell[]>(baseState.SpellShop);
	const [Minions, setMinions] = createSignal<IMinion[]>(baseState.Minions.Items);
	const [LivesMax, setLivesMax] = createSignal(baseState.LivesMax);
	const [Losses, setLosses] = createSignal(baseState.Losses);
	const [LossPoints, setLossPoints] = createSignal(baseState.LossPoints);
	const [Victories, setVictories] = createSignal(baseState.Victories);
	const [Turn, setTurn] = createSignal(baseState.Turn);
	const [Gold, setGold] = createSignal(baseState.Gold);
	const [Tier, setTier] = createSignal(baseState.Tier);

	return {
		Hash, setHash,
		MinionShopAttackBonus, setMinionShopAttackBonus,
		MinionShopHealthBonus, setMinionShopHealthBonus,
		MinionShopCapacity, setMinionShopCapacity,
		MinionShop, setMinionShop,
		SpellShop, setSpellShop,
		Minions, setMinions,
		Losses, setLosses,
		LossPoints, setLossPoints,
		Victories, setVictories,
		LivesMax, setLivesMax,
		Turn, setTurn,
		Gold, setGold,
		Tier, setTier,
	}
}

export default function createReactiveBuild(baseState:IBuild) {
	const [Id, setId] = createSignal(baseState.Id);
	const [AvailableAdjectives, setAvailableAdjectives] = createSignal<string[]>(baseState.AvailableAdjectives);
	const [AvailableNouns, setAvailableNouns] = createSignal<string[]>(baseState.AvailableNouns);

	return  {
		Id, setId,
		AvailableAdjectives, setAvailableAdjectives,
		AvailableNouns, setAvailableNouns,
		Board:createReactiveBoard(baseState.Board),
	}
}

export type ReactiveBoard = ReturnType<typeof createReactiveBoard>;
export type ReactiveBuild = ReturnType<typeof createReactiveBuild>;
