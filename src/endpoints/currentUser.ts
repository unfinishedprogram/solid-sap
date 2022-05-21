import IAccountInfo from "../types/accountInfo";
import { createEndpoint } from "./endpoints"

const CurrentUser = createEndpoint<{}, IAccountInfo >("api/user/current", params => params, "GET");

export default CurrentUser
