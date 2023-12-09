import { generateCorrectFormatOfUsername } from "@/app/utils/helperFunctions";
import { supabase } from "./config";

export async function registration(username: string, password: string) {
  const { error } = await supabase.auth.signUp({
    email: generateCorrectFormatOfUsername(username),
    password: password,
    phone: "89898234234",
  });

  if (error) {
    console.error("Registration failed:", error);
    return error;
  }

  const databaseResponse = await initUserNametoDatabase(username);

  return login(username, password);
}

export async function login(username: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email: generateCorrectFormatOfUsername(username),
    password: password,
  });
}

export async function logout() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export async function initUserNametoDatabase(username: string) {
  return await supabase
    .from("UsersData")
    .insert({
      username: username,
      email: generateCorrectFormatOfUsername(username),
    })
    .select();
}

export async function getUserData(email: string) {
  return await supabase.from("UsersData").select("*").eq("email", email);
}
