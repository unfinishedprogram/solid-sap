import { Component, createEffect, createSignal } from "solid-js"
import { MenuProps } from "../App";
import RegisterMenu from "./RegisterMenu";
import { requestHandler } from "..";
import Login from "../endpoints/login";
import RegisterGuest from "../endpoints/registerGuest";
import Spinner from "../components/Spinner";
import MainMenu from "./MainMenu";
import CurrentUser from "../endpoints/currentUser";

const LoginMenu:Component<MenuProps> = (props) => {
  const [loading, setLoading] = createSignal<boolean>(false) 
  let email:HTMLInputElement;
  let password:HTMLInputElement;

  const [getError, setError] = createSignal<string>();

  const handleError = err => setError(err.title);

  const login = () => {
    setError("")
    setLoading(true)
    requestHandler.executeRequest(Login, {
      Email:email.value, 
      Password:password.value
    }).then(props.state.setAccountInfo)
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  const guestLogin = () => {
    setError("")
    setLoading(true)
    requestHandler.executeRequest(RegisterGuest, {})
      .then((res) => {
        requestHandler.authToken = res.Token;
        requestHandler.executeRequest(CurrentUser, {})
          .then(res => {
            props.state.setAccountInfo(res);
            props.setMenu(MainMenu)
          })
          .catch(handleError)
      })
      .catch(handleError)
      .finally(() => setLoading(false))
    console.log("GuestLogin")
  }

  createEffect(() => {
    if(props.state.accountInfo()){
      props.setMenu(MainMenu)
    }
  })

  const submit = (e:SubmitEvent) => {
    e.preventDefault();
    login()
  }

  return <>
    <h1>Login</h1>
    <form onsubmit={ submit }>
      <input ref={ email } type="email" placeholder="email..."/>
      <input ref={ password } type="password" placeholder="password..."/>
      <div>
        <input type="button" onclick={() => props.setMenu(RegisterMenu)} value="Register"/>
        <input type="submit" value="Login" />
      </div>
      <input type="button" onclick={guestLogin} value="Play as Guest"/>
    </form>

    
      { getError() }
      { JSON.stringify(props.state.accountInfo()) }
      { loading() && <Spinner/> }
  </>
}

export default LoginMenu