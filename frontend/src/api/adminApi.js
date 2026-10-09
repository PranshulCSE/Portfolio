import apiClient from './apiClient';

// ================= AUTH API =================
export const loginAdmin = async (username, password) => {
    const response = await apiClient.post('/api/auth/login', { username, password });
    return response.data;
};

export const verifyAdminToken = async () => {
    const response = await apiClient.get('/api/auth/verify');
    return response.data;
};

// ================= ABOUT API =================
export const updateAboutData = async (data) => {
    const response = await apiClient.put('/api/admin/about', data);
    return response.data;
};

// ================= EXPERIENCE API =================
export const createExperienceApi = async (data) => {
    const response = await apiClient.post('/api/admin/experience', data);
    return response.data;
};

export const updateExperienceApi = async (id, data) => {
    const response = await apiClient.put(`/api/admin/experience/${id}`, data);
    return response.data;
};

export const deleteExperienceApi = async (id) => {
    const response = await apiClient.delete(`/api/admin/experience/${id}`);
    return response.data;
};

// ================= EDUCATION API =================
export const createEducationApi = async (data) => {
    const response = await apiClient.post('/api/admin/education', data);
    return response.data;
};

export const updateEducationApi = async (id, data) => {
    const response = await apiClient.put(`/api/admin/education/${id}`, data);
    return response.data;
};

export const deleteEducationApi = async (id) => {
    const response = await apiClient.delete(`/api/admin/education/${id}`);
    return response.data;
};

// ================= SKILLS API =================
export const updateSkillsApi = async (category, items) => {
    const response = await apiClient.put('/api/admin/skills', { category, items });
    return response.data;
};

export const deleteSkillsCategoryApi = async (category) => {
    const response = await apiClient.delete(`/api/admin/skills/${category}`);
    return response.data;
};

// ================= PROJECTS API =================
export const createProjectApi = async (data) => {
    const response = await apiClient.post('/api/admin/projects', data);
    return response.data;
};

export const updateProjectApi = async (id, data) => {
    const response = await apiClient.put(`/api/admin/projects/${id}`, data);
    return response.data;
};

export const deleteProjectApi = async (id) => {
    const response = await apiClient.delete(`/api/admin/projects/${id}`);
    return response.data;
};

// ================= ACHIEVEMENTS API =================
export const createAchievementApi = async (data) => {
    const response = await apiClient.post('/api/admin/achievements', data);
    return response.data;
};

export const updateAchievementApi = async (id, data) => {
    const response = await apiClient.put(`/api/admin/achievements/${id}`, data);
    return response.data;
};

export const deleteAchievementApi = async (id) => {
    const response = await apiClient.delete(`/api/admin/achievements/${id}`);
    return response.data;
};

// ================= CERTIFICATIONS API =================
export const createCertificationApi = async (data) => {
    const response = await apiClient.post('/api/admin/certifications', data);
    return response.data;
};

export const updateCertificationApi = async (id, data) => {
    const response = await apiClient.put(`/api/admin/certifications/${id}`, data);
    return response.data;
};

export const deleteCertificationApi = async (id) => {
    const response = await apiClient.delete(`/api/admin/certifications/${id}`);
    return response.data;
};

// ================= LOGS API =================
export const fetchLogsApi = async () => {
    const response = await apiClient.get('/api/admin/logs');
    return response.data;
};

// ================= CONTACT SUBMISSIONS API =================
export const fetchContactsApi = async () => {
    const response = await apiClient.get('/api/admin/contacts');
    return response.data;
};

export const toggleContactReadApi = async (id) => {
    const response = await apiClient.put(`/api/admin/contacts/${id}/read`);
    return response.data;
};

export const deleteContactApi = async (id) => {
    const response = await apiClient.delete(`/api/admin/contacts/${id}`);
    return response.data;
};
