import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api', // Your Strapi API URL
  withCredentials: true,
});

const config = {
  headers: {
    Authorization:
      'Bearer c92966d11e2314e8394be2ced2e040aa96e25b5a444b28cf87bb0a4eb36d03b9f4d5141585fd5c388ec279305a6e80719172be051a380159c0ebe4c5d09263d46c757cc7059ea0f976a383ed3bd4ac1236797218792ab5a2bd1a47042d9c0301a6a5e4e0e372f1c2c21b0f45bb7f188dc09e05a76fea200637744471c120381c',
  },
};

export const fetchModules = async (locale) => {
  const response = await api.get(
    `/modules?populate[0]=module_pages&populate[1]=module_pages.mediaComponents&populate[2]=module_pages.mediaComponents.coverImage&populate[3]=module_pages.textComponents&populate[4]=module_pages.textComponents.fields&populate[5]=coverImage&locale=${locale}`,
    config
  );
  return response.data;
};

export const submitSurveyFormScores = async (data) => {
  try {
    const response = await api.post(
      '/ezforms/submit',
      {
        formName: 'survey-form',
        formData: data,
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting scores:', error);
    throw error;
  }
};

export const fetchMentalMoveSurveyData = async (locale) => {
  const response = await api.get(
    `/mental-move-survey?populate=*&locale=${locale}`,
    config
  );
  return response.data;
};

export const fetchLandingPageData = async () => {
  const response = await api.get(`/landing-page?populate=*`, config);
  return response.data;
};
