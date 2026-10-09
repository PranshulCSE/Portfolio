import apiClient from './apiClient';

export const fetchPortfolioData = async () => {
    const response = await apiClient.get('/api/portfolio');
    return response.data;
};

export const submitContactForm = async (formData) => {
    const response = await apiClient.post('/api/contact', formData);
    return response.data;
};
