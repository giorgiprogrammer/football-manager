import { initialTeamsData } from "@/app/config/initialTeamsData";
import supabase from "@/app/services/supabase/config";

export function deleteUser(username: string) {}

// use this function when you want to sign up a new user
export async function createUserInitialData(username: string) {
  const responseObject: {
    status: "ok" | "error";
    message: string;
  } = {
    status: "error",
    message: "uknown error",
  };

  const res = await supabase
    .from("Teams")
    .insert([{ owner: username, teams: initialTeamsData }]);

  if (res.error) {
    console.log(res.error.message);

    responseObject.status = "error";
    responseObject.message = res.error.message;
    return;
  }

  if (!res.error) {
    responseObject.status = "ok";
    responseObject.message = "Teams created successfully";
  }

  return responseObject;
}

export async function getUserTemasData(username: string) {
  const { data, error } = await supabase
    .from("Teams")
    .select("*")
    .eq("owner", username);

  if (error) {
    console.log(error.message);
    return;
  }

  return data;
}
