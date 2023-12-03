import { transliterate } from "transliteration";

function generateIdToCorrectFormat(id: string) {
  id = id.replaceAll("`", "_");
  id = id.replaceAll(" ", "");
  return id;
}

export function generateCorrectFormatOfUsername(username: string) {
  const inputUsername = `${generateIdToCorrectFormat(
    `${transliterate(username)}`
  )}`;
  const replaceInput = inputUsername.replace("@gmail.com", "");
  return `${replaceInput}@gmail.com`;
}
