import { IEndpoint } from "./endpoints/endpoints";


interface IRequestError {
  "type": string,
  "title": string,
  "status": number,
  "traceId": string
}

export default class RequestHandler {
  private base_url:string;
  private game_version: number = 18;

  set gameVersion(game_version:number) {
    this.game_version = game_version;
    this.base_url = `https://api.teamwood.games/0.${game_version}`;
  }

  public async executeRequest<Params, Results>(endpoint:IEndpoint<Params, Results>, params:Params):Promise<Results> {
    const url = `${this.base_url}/${endpoint.url}`
    const body = endpoint.makeBody(params);
    body["Version"] = this.game_version;

    return new Promise<Results>(async (res, rej) => {
      const result = await this.executeFetch(url, body);
      if(result.ok){
        res(await result.json());
      } else {
        rej(await result.json())
      }
    })
  }

  private async executeFetch(url:string, body:any) {
    return fetch(url, {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json; utf-8",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "sec-gpc": "1"
      },
      "body": JSON.stringify(body),
      "method": "POST",
    });
  }
}
