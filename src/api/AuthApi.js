import { Axios } from "./Api";

export const signUp = async (data) => {
  return await Axios.post("/auth/sign-up", {
    userId: data.id,
    password: data.password,
    name: data.name,
  });
};
