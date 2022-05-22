import { Component, createMemo, createSignal, For, Signal } from "solid-js";
import MatchManager from "../../game/matchManager";
import IMatchState from "../../game/matchState";
import Minion from "./Minion";
import Spell from "./Spell";

interface IBuildMenuProps {
  manager: MatchManager
  state:Signal<IMatchState>
}

const BuildMenu:Component<IBuildMenuProps> = (props) => {
  return (
    <div>
        <fieldset>
          <legend>Your Team</legend>
          <For each={props.state[0]().Build.Board.Minions.Items} >
            {(item, index) => <Minion data={item}/>}
          </For>
       </fieldset>
       <fieldset>
          <legend>Shop Pets</legend>
          <For each={props.state[0]().Build.Board.MinionShop} >
            {(item, index) => <Minion data={item}/>}
          </For>
       </fieldset>
       <fieldset>
        <legend>Shop Food</legend>
          <For each={props.state[0]().Build.Board.SpellShop} >
            {(item, index) => <Spell data={item}/>}
          </For>
       </fieldset>
    </div>
  )
}

export default BuildMenu