import supabase from "@/app/services/supabase/config";

export async function signUp(username: string, password: string) {
  const responseObject: {
    status: "ok" | "error";
    message: string;
  } = {
    status: "ok",
    message: "",
  };

  if (username.length < 3) {
    responseObject.status = "error";
    responseObject.message = "Username must be at least 3 characters long";

    return responseObject;
  }

  if (password.length < 3) {
    responseObject.status = "error";
    responseObject.message = "Password must be at least 3 characters long";

    return responseObject;
  }

  //check if username isnot taken
  const res = await supabase
    .from("Users")
    .select("username")
    .eq("username", username);

  if (res.error) {
    responseObject.status = "error";
    responseObject.message = res.error.message;

    return responseObject;
  }

  if (res.data!.length > 0) {
    responseObject.status = "error";
    responseObject.message =
      "Username is already taken, please choose another one";

    return responseObject;
  }

  if (res.data!.length === 0) {
    const { error } = await supabase
      .from("Users")
      .insert({ username, password });

    if (error) {
      responseObject.status = "error";
      responseObject.message = "Something went wrong, please try again";

      return responseObject;
    }

    if (!error) {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);

      responseObject.status = "ok";
      responseObject.message = "User created successfully";
      return responseObject;
    }
  }

  responseObject.status = "error";
  responseObject.message = "Something went wrong, please try again";

  return responseObject;
}

export async function signIn(username: string, password: string) {
  const responseObject: {
    status: "ok" | "error";
    message: string;
    userData?: {
      username: string;
    };
  } = {
    status: "ok",
    message: "",
  };

  if (username.length < 3) {
    responseObject.status = "error";
    responseObject.message = "Username must be at least 3 characters long";

    return responseObject;
  }

  if (password.length < 3) {
    responseObject.status = "error";
    responseObject.message = "Password must be at least 3 characters long";

    return responseObject;
  }

  // try log in
  const res = await supabase
    .from("Users")
    .select("username")
    .eq("username", username)
    .eq("password", password);

  if (res.error) {
    responseObject.status = "error";
    responseObject.message = res.error.message;

    return responseObject;
  }

  if (res.data?.length === 0) {
    responseObject.status = "error";
    responseObject.message = "Username or password is incorrect";

    return responseObject;
  }

  if (res.status === 200) {
    responseObject.status = "ok";
    responseObject.message = "User logged in successfully";
    // create session
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
    responseObject.userData = {
      username: res.data![0].username,
    };

    return responseObject;
  }

  responseObject.status = "error";
  responseObject.message = "Username or password is incorrect";

  return responseObject;
}

export function logOut() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("password");

  window.location.reload();
}
