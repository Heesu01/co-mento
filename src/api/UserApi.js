import { Axios } from "./Api";

export const fetchUserProfile = async (userProfileId) => {
  const response = await Axios.get(`/users/${userProfileId}`);
  return response.data;
};

export const fetchUserSolutions = async (userProfileId) => {
  const response = await Axios.get(`/solutions?${userProfileId}`);
  return response.data.data.solutionList.map((solution) => ({
    id: solution.id,
    solutionId: solution.id,
    num: solution.problemId,
    title: solution.problemTitle,
    language: solution.language,
    submitter: solution.userName,
    subtime: solution.timeAgo,
    success: solution.correct,
  }));
};

export const fetchSolutionDetail = async (solutionId) => {
  try {
    const response = await Axios.get(`/solutions/${solutionId}`);
    return response.data.data;
  } catch (error) {
    console.error("문제 상세조회 에러:", error);
    throw error;
  }
};
