import { Component, createMemo} from 'solid-js';
import ISpell from '../../types/spell';
import style from "../../style/Match.module.scss";
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
    <Show when={props.data.Frozen}>
      <img class={style.ice} src="images/ice.png"></img>
    </Show>
    <div class={classes()} onclick={() => props.select(props.data)}>
      <Spell data={props.data} buildState={props.buildState}/>
    </div>
  )
}

export default ShopSpell;