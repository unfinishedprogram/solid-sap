import { Component, createMemo} from 'solid-js';
import IMinion from '../../types/minion';
import style from "../../style/Match.module.css";
import { BuildState } from './BuildMenu';
import Minion from './Minion';

interface IShopMinionProps {
  data:IMinion|null
  buildState:BuildState
  select:(minion:IMinion) => void
}

const ShopMinion: Component<IShopMinionProps> = (props) => {

  const classes = createMemo(() => {
    return `${style.item} ${props.buildState.selectedShopItem() == props.data ? style.selected : ""}`
  })

  return (
    <div class={classes()} onclick={() => props.select(props.data)}>
      <Minion data={props.data} buildState={props.buildState} />
    </div>
  )
}

export default ShopMinion;