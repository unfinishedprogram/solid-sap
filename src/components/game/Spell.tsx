import { Component} from 'solid-js';
import spells from '../../data/spells';
import ISpell from '../../types/spell';

interface ISpellProps {
  data:ISpell|null
}

const Spell: Component<ISpellProps> = (props) => {

  return (
    <div>
      <h2>{spells[props.data?.Enum] || "None"}</h2>
    </div>
  )
}

export default Spell;