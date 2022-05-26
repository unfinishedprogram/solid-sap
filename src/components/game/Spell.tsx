import { Component, Show} from 'solid-js';
import spells from '../../data/spells';
import ISpell from '../../types/spell';
import style from "../../style/Match.module.scss";
import { BuildState } from './BuildMenu';

interface ISpellProps {
  data:ISpell|null
  buildState:BuildState
}

const Spell: Component<ISpellProps> = (props) => {
  const spellName = spells[props.data?.Enum] || "None";
  const imgSrc = `images/${spellName[0].toUpperCase() + spellName.substring(1)}.png`
  return (<>
      <img class={style.pic} alt={spellName} src={imgSrc} />
      <Show when={props.data.Frozen}>
        <img class={style.ice} src="images/ice.png"></img>
      </Show>
    </>
  )
}

export default Spell;