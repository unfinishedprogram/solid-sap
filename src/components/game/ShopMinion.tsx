import { Component, createMemo} from 'solid-js';
import IMinion from '../../types/minion';
import style from "../../style/Match.module.css";
import { BuildState } from './BuildMenu';
import Minion from './Minion';

interface IShopMinionProps {
  data:IMinion|null
  buildState:BuildState
}

const ShopMinion: Component<IShopMinionProps> = (props) => {

  const classes = createMemo(() => {
    return `${style.item} ${props.buildState.selectedShopItem() == props.data.Id ? style.selected : ""}`
  })

  const click = () => {
    props.buildState.setSelectedShopItem((prev) => {
      if(prev == props.data.Id){
        return null;
      } else {
        return props.data.Id
      }
    })
  }

  return (
    <div class={classes()} onclick={click}>
      <Minion data={props.data} buildState={props.buildState} />
    </div>
  )
}

export default ShopMinion;