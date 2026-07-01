import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

/** Powers the `sanity` CLI (dataset import/export, deploy, typegen). */
export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
});
