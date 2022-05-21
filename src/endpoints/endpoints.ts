export interface IEndpoint<Params, Results> {
  url: string;
  method: "GET" | "POST";
  makeBody: (params: Params) => any;
}

export function createEndpoint<Params, Results>(
    url: string, 
    makeBody:(params:Params) => unknown,
    method: "POST" | "GET",
  ):IEndpoint<Params, Results> {
  return { url, makeBody, method }
}
