import { createEndpoint } from "./endpoints"

export interface ICurrentVersion {
  Major: number
  MinimumClientPatch: number
  Minor: number
  Patch: number
}

const CurrentVersion = createEndpoint<{}, ICurrentVersion >("api/version/current", params => params, "GET");

export default CurrentVersion
