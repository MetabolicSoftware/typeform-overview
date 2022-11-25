/*eslint-env node */
import dotenv from "dotenv";
import got from "got";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { TYPEFORM_PERSONAL_ACCESS_TOKEN } = process.env;
console.log("TYPEFORM_PERSONAL_ACCESS_TOKEN: ", TYPEFORM_PERSONAL_ACCESS_TOKEN);

const currentDirName = path.dirname(fileURLToPath(import.meta.url));
console.log("currentDirName: ", currentDirName);
const dataPath = path.join(currentDirName, "../data");
console.log("dataPath: ", dataPath);
try {
  await fs.mkdir(dataPath);
} catch {
  //
}

const client = got.extend({
  prefixUrl: "https://api.typeform.com/",
  headers: {
    Authorization: `Bearer ${TYPEFORM_PERSONAL_ACCESS_TOKEN}`,
  },
});

const forms = await client
  .get("forms", {
    searchParams: {
      page_size: 200,
    },
  })
  .json();
for (const item of forms.items) {
  console.log("loading: ", item.id, item.title);
  const form = await client.get(`forms/${item.id}`).json();
  const fileName = `${item.id} - ${item.title}.json`;
  const data = JSON.stringify(form, null, 2);
  fs.writeFile(path.join(dataPath, fileName), data);
}
