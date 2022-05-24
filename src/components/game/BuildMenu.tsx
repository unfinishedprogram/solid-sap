import { Component, createEffect, createSignal, For, Signal } from "solid-js";
import state from "../../createState";
import MatchManager from "../../game/matchManager";
import IMatchState from "../../game/matchState";
import style from "../../style/Match.module.css";
import IItemId from "../../types/itemId";
import ShopMinion from "./ShopMinion";
import ShopSpell from "./ShopSpell";
import TeamMinion from "./TeamMinion";

interface IBuildMenuProps {
  manager: MatchManager
  state:Signal<IMatchState>
}

function createBuildState() {
  const [selectedShopItem, setSelectedShopItem] = createSignal<IItemId>(null);
  const [selectedTeamMinion, setSelectedTeamMinion] = createSignal<number>(null);
  
  return {
    selectedShopItem,setSelectedShopItem, 
    selectedTeamMinion, setSelectedTeamMinion
  }
}

export type BuildState = ReturnType<typeof createBuildState>;

const BuildMenu:Component<IBuildMenuProps> = (props) => {
  
  const buildState = createBuildState();
  
  props.manager.startBuild()

  createEffect(() => {
    if(buildState.selectedTeamMinion() != null) {
      if(buildState.selectedShopItem()) {
        props.manager.playMinion(buildState.selectedShopItem(), buildState.selectedTeamMinion());
      }
    }
  })

  createEffect<number>((last:number) => {
    const current = buildState.selectedTeamMinion();
    if(last != current && last != null && current != null) {
      props.manager.movePet(last, current);
      buildState.setSelectedTeamMinion(null)
      return null
    } else {
      return current;
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
        <span>Gold: {props.state[0]().Build.Board.Gold}</span>
        <span>Lives: {props.state[0]().Build.Board.LivesMax - props.state[0]().Build.Board.LossPoints}</span>
      </div>
      <div>
          <h2>Your Team</h2>
          <div class={style.itemList}>
            <For each={props.state[0]().Build.Board.Minions.Items} >
              {(item, index) => <TeamMinion index={index()} data={item} buildState={buildState} />}
            </For>
          </div>
      </div>

      <div class={style.shop}>
      <div>
          <h2>Shop Pets</h2>
        <div class={style.itemList}>
          <For each={props.state[0]().Build.Board.MinionShop} >
            {(item, index) => <ShopMinion data={item} buildState={buildState}/>}
          </For>
        </div>
      </div>
      <div>
        <h2>Shop Food</h2>
        <div class={style.itemList}>
          <For each={props.state[0]().Build.Board.SpellShop} >
            {(item, index) => <ShopSpell data={item} buildState={buildState}/>}
          </For>
        </div>
      </div>
      </div>
      <div class={style.buttons}>
        <button onclick={() => props.manager.rollShop()}>Roll</button>
        <button>Freeze</button>
        <button>Sell</button>
        <button>End Turn</button>
      </div>
    </div>
  )
}

export default BuildMenu