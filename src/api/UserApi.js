import { Axios } from "./Api";

export const fetchUserProfile = async (userProfileId) => {
  const response = await Axios.get(`/users/${userProfileId}`);
  return response.data.data;
};

export const fetchUserSolutions = async (userProfileId, page) => {
  const response = await Axios.get(`/solutions`, {
    params: { userProfileId, page: page - 1 },
  });

  const { solutionList, paginationResponse } = response.data.data;
  return {
    solutions: solutionList.map((solution) => ({
      id: solution.id,
      solutionId: solution.id,
      num: solution.problemId,
      title: solution.problemTitle,
      language: solution.language,
      submitter: solution.userName,
      subtime: solution.timeAgo,
      success: solution.correct,
    })),
    totalPages: paginationResponse.totalPage,
  };
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

export const fetchCollectionProgress = async () => {
  const response = await Axios.get(`/problems/collections/progress`);
  return response.data.data.collectionProgresses.filter(
    (collection) => collection.progress > 0
  );
};
