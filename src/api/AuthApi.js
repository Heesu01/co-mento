import { Axios } from "./Api";

export const signUp = async (data) => {
  return await Axios.post("/auth/sign-up", {
    userId: data.id,
    password: data.password,
    name: data.name,
  });
};

export const login = async (data) => {
  return await Axios.post("/auth/login", {
    userId: data.id,
    password: data.password,
  });
};

export const logout = async () => {
  return await Axios.post("/auth/logout");
};
