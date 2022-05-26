import { Component, createMemo, Show} from 'solid-js';
import IMinion from '../../types/minion';
import style from "../../style/Match.module.scss";
import { BuildState } from './BuildMenu';
import Minion from './Minion';
import { DeepReadonly } from 'solid-js/store';

interface IShopMinionProps {
  data:DeepReadonly<IMinion>|null
  buildState:BuildState
  select:(minion:DeepReadonly<IMinion>) => void
}

const ShopMinion: Component<IShopMinionProps> = (props) => {

  const classes = createMemo(() => {
    return `${style.item} ${props.buildState.selectedShopItem() == props.data ? style.selected : ""}`
  })

  return <div>
    <Show when={props.data.Frozen}>
      <img class={style.ice} src="images/ice.png"></img>
    </Show>
    <div class={classes()} onclick={() => props.select(props.data)}>
      <Minion data={props.data} buildState={props.buildState} />
    </div>
  </div>
}

export default ShopMinion;