import { createEndpoint } from "./endpoints"

const RegisterGuest = createEndpoint<{}, {Token:string}>("api/user/register-guest", params => params);

export default RegisterGuest
