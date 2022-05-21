import { Component, createEffect, createSignal } from "solid-js"
import { MenuProps } from "../App";
import LoginMenu from "./LoginMenu";

const RegisterMenu:Component<MenuProps> = (props) => {
  const login = () => {
    console.log("Login")
  }

  const guestLogin = () => {
    console.log("GuestLogin")
  }

  return <>
    <h1>Login</h1>
    <input type="text" placeholder="username..."/>
    <input type="password" placeholder="password..."/>
    <button onclick={login}>Login</button>
    <button onclick={() => props.setMenu(LoginMenu)}>Login</button>
    <button onclick={guestLogin}>Play as Guest</button>
  </>
}

export default RegisterMenu