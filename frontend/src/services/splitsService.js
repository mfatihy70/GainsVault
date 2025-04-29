import axios from 'axios';
import axiosInstance from "../utils/axios";

export const getSplits = async (filters = {}) => {
  // Hier wird vom (bestehenden) Backend die Liste geholt
  const response = await axiosInstance.get('/splits', { params: filters });
  return response.data;
};

export const saveReps = async (splitId, repsData) => {
  const response = await axiosInstance.post(`/splits/${splitId}/reps`, repsData);
  return response.data;
};

