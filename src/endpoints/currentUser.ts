import IAccountInfo from "../types/accountInfo";
import { createEndpoint } from "./endpoints"

const Login = createEndpoint<{Token:string}, IAccountInfo >("api/user/current", params => params);

export default Login
