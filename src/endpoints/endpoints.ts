export interface IEndpoint<Params, Results> {
  url: string;
  makeBody: (params: Params) => any;
}

export function createEndpoint<Params, Results>(url: string, makeBody:(params:Params) => unknown):IEndpoint<Params, Results> {
  return { url, makeBody }
}
