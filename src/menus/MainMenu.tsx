import { Component, createEffect, createSignal } from "solid-js"
import { MenuProps } from "../App";
import LoginMenu from "./LoginMenu";

const MainMenu:Component<MenuProps> = (props) => {
  createEffect(() => {
    if(!props.state.accountInfo()){
      props.setMenu(LoginMenu)
    }
  })
  return <div>
    <div>
      <span>{ props.state.accountInfo()?.DisplayName || "Guest" }</span>
      <button onclick={() => props.state.setAccountInfo()}>Logout</button>
    </div>      
    <h1>Main Menu</h1>
    <button onclick={() => props.setMenu(LoginMenu)}>Login</button>
  </div>
}

export default MainMenu