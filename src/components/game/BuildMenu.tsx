import { Component, createEffect, createSignal, For, Match, Signal } from "solid-js";
import MatchManager from "../../game/matchManager";
import { IMatch, ReactiveMatch } from "../../game/matchState";
import style from "../../style/Match.module.css";
import IItemId from "../../types/itemId";
import IMinion from "../../types/minion";
import ISpell from "../../types/spell";
import ShopMinion from "./ShopMinion";
import ShopSpell from "./ShopSpell";
import TeamMinion from "./TeamMinion";

interface IBuildMenuProps {
  manager: MatchManager
  match: Signal<ReactiveMatch>
}

type ShopItemType = "spell" | "minion" | null; 

function createBuildState() {
  const [selectedShopItem, setSelectedShopItem] = createSignal<IItemId>(null);
  const [selectedTeamMinion, setSelectedTeamMinion] = createSignal<number>(null);
  const [selectedShopItemType, setSelectedShopItemType] = createSignal<ShopItemType>(null);
  return {
    selectedShopItem, setSelectedShopItem, 
    selectedTeamMinion, setSelectedTeamMinion,
    selectedShopItemType, setSelectedShopItemType
  }
}

export type BuildState = ReturnType<typeof createBuildState>;

const BuildMenu:Component<IBuildMenuProps> = (props) => {
  
  const buildState = createBuildState();

  const match = props.match[0]
  
  props.manager.startBuild()

  const selectShopItem = (id:IItemId) => {
    if(buildState.selectedShopItem()?.Unique == id.Unique){
      buildState.setSelectedShopItem(null);
    } else {
      buildState.setSelectedShopItem(id);
    }
    buildState.setSelectedTeamMinion(null);
  }

  const selectShopSpell = (spell:ISpell) => {
    selectShopItem(spell.Id)
    buildState.setSelectedShopItemType("spell");
  }

  const selectShopMinion = (minion:IMinion) => {
    selectShopItem(minion.Id)
    buildState.setSelectedShopItemType("minion");
  }
  
  const selectTeamMinion = (index:number) => {
    if(buildState.selectedTeamMinion() == index) {
      buildState.setSelectedTeamMinion(null)
    } else if (buildState.selectedTeamMinion() != null) {
      props.manager.movePet(buildState.selectedTeamMinion(), index);
      buildState.setSelectedTeamMinion(null)
    } else if (buildState.selectedShopItem() != null) {
      if(buildState.selectedShopItemType() == "minion") {
        props.manager.playMinion(buildState.selectedShopItem(), index);
      } else if (buildState.selectedShopItemType() == "spell") {
        props.manager.playSpell(buildState.selectedShopItem(), index);
      }
      buildState.setSelectedShopItem(null)
      buildState.setSelectedTeamMinion(null)
    } else {
      if(match().Build.Board.Minions()[index]){
        buildState.setSelectedTeamMinion(index)
      }
    }
  }

  createEffect(() => {
    if(buildState.selectedTeamMinion() != null) {
      if(buildState.selectedShopItem()) {
        props.manager.playMinion(buildState.selectedShopItem(), buildState.selectedTeamMinion());
      }
    }
  })
  
  createEffect(() => {
    if(buildState.selectedShopItem()){
      buildState.setSelectedTeamMinion(null);
    }
  })

  return (
    <div class={style.buildMenu}>
      <div class={style.header}>
        <span>Gold: {match().Build.Board.Gold}</span>
        <span>Lives: {match().Build.Board.LivesMax() - match().Build.Board.LossPoints()}</span>
      </div>
      <div>
        <h2>Your Team</h2>
        <div class={style.itemList}>
          <For each={match().Build.Board.Minions()} >
            {(item, index) => <TeamMinion index={index()} select={selectTeamMinion} data={item} buildState={buildState} />}
          </For>
        </div>
      </div>

      <div class={style.shop}>
      <div>
        <h2>Shop Pets</h2>
        <div class={style.itemList}>
          <For each={match().Build.Board.MinionShop()} >
            {(item, index) => <ShopMinion data={item} select={selectShopMinion} buildState={buildState}/>}
          </For>
        </div>
      </div>
      <div>
        <h2>Shop Food</h2>
        <div class={style.itemList}>
          <For each={match().Build.Board.SpellShop()} >
            {(item, index) => <ShopSpell data={item} select={selectShopSpell} buildState={buildState}/>}
          </For>
        </div>
      </div>
      </div>
      <div class={style.buttons}>
        <button onclick={() => props.manager.rollShop()}>Roll</button>
        <button>Freeze</button>
        <button>Sell</button>
        <button onclick={() => props.manager.endTurn()}>End Turn</button>
      </div>
    </div>
  )
}

export default BuildMenu