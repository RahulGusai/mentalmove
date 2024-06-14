import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api', // Your Strapi API URL
});

const config = {
  headers: {
    Authorization:
      'Bearer c92966d11e2314e8394be2ced2e040aa96e25b5a444b28cf87bb0a4eb36d03b9f4d5141585fd5c388ec279305a6e80719172be051a380159c0ebe4c5d09263d46c757cc7059ea0f976a383ed3bd4ac1236797218792ab5a2bd1a47042d9c0301a6a5e4e0e372f1c2c21b0f45bb7f188dc09e05a76fea200637744471c120381c',
  },
};

export const fetchMentalHealthPage1Data = async (locale) => {
  const response = await api.get(
    `/mental-health-page-1?populate=*&locale=${locale}`,
    config
  );
  return response.data;
};

export const fetchMentalHealthPage2Data = async (locale) => {
  const response = await api.get(
    `/mental-health-page-2?populate=*&locale=${locale}`,
    config
  );
  return response.data;
};

export const fetchMentalHealthPage3Data = async (locale) => {
  const response = await api.get(
    `/mental-health-page-3?populate=*&locale=${locale}`,
    config
  );
  return response.data;
};
