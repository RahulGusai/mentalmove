import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api', // Your Strapi API URL
});

const config = {
  headers: {
    Authorization:
      'Bearer ac05d1fed43b73dc9b24c915059af9620d90072a2c4ad27e6afbacd2ddbb829b61454eb18a373aa95a54faad805f6affb63a372312746290c53cc41b8c7e4d4a71b12707d4aa308f1af5452e157543c7285ec5842eb3e1ab6f331b067b24c725f7d290501795b9f5143734fe7b131a80be3564a0ddd02560829250c1f59f4a3c',
  },
};

export const fetchMentalHealthPage1Data = async () => {
  const response = await api.get('/mental-health-page-1?populate=*', config);
  return response.data;
};

export const fetchMentalHealthPage2Data = async () => {
  const response = await api.get('/mental-health-page-2?populate=*', config);
  return response.data;
};

export const fetchMentalHealthPage3Data = async () => {
  const response = await api.get('/mental-health-page-3?populate=*', config);
  return response.data;
};
