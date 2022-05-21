import { Component, JSXElement, Switch, Match } from "solid-js";
import styles from "../style/Message.module.css";
import Icon from "./Icon";

interface IMessageProps {
  body: string;
  type?: "error" | "warning" | "info";
}

const Message:Component<IMessageProps> = (props) => {
  return (
    <dialog open class={`${styles.message} ${styles[props.type]}`}>
      <Icon icon={props.type}></Icon>
      <span>{ props.body }</span>
      <span></span>
    </dialog>
  )
}

export default Message;