import { createEndpoint } from "./endpoints"

export type LoginParams = {
  Email:string, Password:string
}

const Login = createEndpoint<LoginParams, {Token:string} >("api/user/login", params => params, "POST");

export default Login
