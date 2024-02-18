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

export function filterDivisionData(
  teams: {
    division_id: any;
    team_name: any;
    placement: any;
    win: any;
    draw: any;
    lost: any;
    played: any;
    point: any;
    strength: any;
  }[]
) {
  // Sort the data based on points and strength
  teams.sort((a, b) => {
    // First, compare points
    if (a.point !== b.point) {
      return b.point - a.point; // Higher points come first
    } else {
      // If points are the same, compare strengths
      return b.strength - a.strength; // Higher strength come first
    }
  });

  return teams;
}
