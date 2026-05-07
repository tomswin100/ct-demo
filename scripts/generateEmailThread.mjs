import { createAcquisitionEmailThread, formatEmailThread } from "../lib/acquisitionEmailThread.ts";

const wantsJson = process.argv.includes("--json");
const thread = createAcquisitionEmailThread();

if (wantsJson) {
  console.log(JSON.stringify(thread, null, 2));
} else {
  console.log(formatEmailThread(thread));
}
