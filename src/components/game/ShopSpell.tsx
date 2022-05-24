import { Component, createMemo} from 'solid-js';
import ISpell from '../../types/spell';
import style from "../../style/Match.module.css";
import { BuildState } from './BuildMenu';
import Spell from './Spell';

interface IShopSpellProps {
  data:ISpell|null
  buildState:BuildState
  select:(spell:ISpell) => void
}

const ShopSpell: Component<IShopSpellProps> = (props) => {

  const classes = createMemo(() => {
    return `${style.item} ${props.buildState.selectedShopItem() == props.data ? style.selected : ""}`
  })

  return (
    <div class={classes()} onclick={() => props.select(props.data)}>
      <Spell data={props.data} buildState={props.buildState}/>
    </div>
  )
}

export default ShopSpell;