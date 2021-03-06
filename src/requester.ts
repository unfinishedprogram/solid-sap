import { IEndpoint } from "./endpoints/endpoints";

interface IRequestError {
  "type": string,
  "title": string,
  "status": number,
  "traceId": string
}


export default class RequestHandler {
  private base_url:string;
  public authToken = "";
  private currentVersion = {
    "Major":0,
    "Minor":18,
    "Patch":35,
    "MinimumClientPatch":0
  }

  public syncVersion() {
    // this.currentVersion = await this.executeRequest(CurrentVersion, {})
    this.base_url = `https://api.teamwood.games/${0}.${18}`;
  }
  
  public async executeRequest<Params, Results>(endpoint:IEndpoint<Params, Results>, params:Params):Promise<Results> {
    const url = `${this.base_url}/${endpoint.url}`
    const body = endpoint.makeBody(params);
    const method = endpoint.method;

    body["Version"] = this.currentVersion.Minor;

    console.log(endpoint, body)
    return new Promise<Results>(async (res, rej) => {
      const result = await this.executeFetch(url, method, body);
      if(result.ok){
        res(await result.json());
      } else {
        rej(await result.json())
      }
    })
  }

  private async executeFetch(url:string, method:"GET" | "POST", body_content:any) {
    const headers = {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json; utf-8",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "sec-gpc": "1",
    };

    const body = JSON.stringify(body_content);

    if(this.authToken) { 
      headers["authorization"] = `Bearer ${this.authToken}`
    }
    
    if(method == "POST") return fetch(url, {headers, body, method});
    if(method == "GET") return fetch(url, {headers, method});
  }
}
