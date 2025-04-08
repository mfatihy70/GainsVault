import axios from 'axios';

export const getSplits = async (filters = {}) => {
  // Hier wird vom (bestehenden) Backend die Liste geholt
  const response = await axios.get('/api/splits', { params: filters });
  return response.data;
};
