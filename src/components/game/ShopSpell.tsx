import { Component, createMemo} from 'solid-js';
import ISpell from '../../types/spell';
import style from "../../style/Match.module.css";
import { BuildState } from './BuildMenu';
import Spell from './Spell';

interface IShopSpellProps {
  data:ISpell|null
  buildState:BuildState
}

const ShopSpell: Component<IShopSpellProps> = (props) => {

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
      <Spell data={props.data} buildState={props.buildState}/>
    </div>
  )
}

export default ShopSpell;