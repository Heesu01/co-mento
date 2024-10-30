import { Axios } from "./Api";

export const fetchUserProfile = async (userProfileId) => {
  const response = await Axios.get(`/users/${userProfileId}`);
  return response.data;
};
