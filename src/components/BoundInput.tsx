import { Component, createEffect, Signal } from "solid-js";

type InputType = 
"button"|"checkbox"|"color"|"date"|"datetime-local"|"email"|
"file"|"hidden"|"image"|"month"|"number"|"password"|"radio"|
"range"|"reset"|"search"|"submit"|"tel"|"text"|"time"|"url"|"week";

interface IBoundInputProps {
  value:Signal<unknown>
  type:InputType
  placeholder?:string
}

const BoundInput:Component<IBoundInputProps> = (props) => {
  const getter = props.value[0];
  const setter = props.value[1];

  const inputType = props.type;

  let inputElm:HTMLInputElement;

  const inputChange = (e) => setter(e.target.value);
  
  createEffect(() => (inputElm.value as any) = getter());

  return <input placeholder={props.placeholder || ""} ref={inputElm} type={inputType} oninput={inputChange} />
}

export default BoundInput