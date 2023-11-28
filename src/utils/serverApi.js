import axios from 'axios';

const API_BASE_URL = 'https://terrific-lopsided-chauffeur.glitch.me';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL, // Set your API base URL
    headers: {
      'ADMIN_KEY': 'this-is-just-a-thought', // Set your authorization header
    },
  });

export async function fetchData(endpoint) {
  const res = await axiosInstance.get(`/${endpoint}`).catch(error => {
    console.error(error);
  });
  return res.data;
}

export async function updateData(endpoint, data) {
  const response = await axiosInstance.post(`/${endpoint}`, {message: data}).catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

  return response.data
}
