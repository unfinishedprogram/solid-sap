import { Accessor, Setter, Signal } from "solid-js";
import CurrentUser from "./endpoints/currentUser";
import Login from "./endpoints/login";
import RegisterGuest from "./endpoints/registerGuest";
import RequestHandler from "./requester";
import IAccountInfo from "./types/accountInfo";

export interface IAuthState {
  accountInfo:IAccountInfo
  sessionToken:string
  loggedIn:boolean
}

export default class AuthManager {
  private getState:Accessor<IAuthState>;
  private setState:Setter<IAuthState>;

  constructor(
    private handler:RequestHandler, 
    state:Signal<IAuthState>
  ) {
    [this.getState, this.setState] = state;
  }

  public async login(Email:string, Password:string) {
    const loginRes = await this.handler.executeRequest(Login, {Email, Password})
    this.applyToken(loginRes.Token)
  }

  public async registerGuest() {
    const guestRes = await this.handler.executeRequest(RegisterGuest, {})
    this.applyToken(guestRes.Token)
  }

  public async applyToken(sessionToken:string){
    this.handler.authToken = sessionToken;
    const accountInfo = await this.handler.executeRequest(CurrentUser, {});
    this.setState({accountInfo, sessionToken, loggedIn:true});
  }

  public async logout(){
    this.setState();
  }
}