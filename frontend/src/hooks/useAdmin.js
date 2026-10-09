import { useState } from 'react';
import toast from 'react-hot-toast';
import * as adminApi from '../api/adminApi';
import { usePortfolioData } from './usePortfolioData';

export const useAdmin = () => {
    const { refreshData } = usePortfolioData();
    const [actionLoading, setActionLoading] = useState(false);

    const executeAction = async (apiFunc, ...args) => {
        setActionLoading(true);
        try {
            const result = await apiFunc(...args);
            if (result.success) {
                toast.success(result.message || 'Operation successful!');
                await refreshData(); // Update public view cache
                return { success: true, data: result.data };
            } else {
                toast.error(result.message || 'Operation failed');
                return { success: false };
            }
        } catch (error) {
            console.error('Admin operation error:', error);
            const msg = error.response?.data?.message || error.message || 'Request failed';
            toast.error(msg);
            return { success: false, error: msg };
        } finally {
            setActionLoading(false);
        }
    };

    // About
    const updateAbout = (data) => executeAction(adminApi.updateAboutData, data);

    // Experience
    const createExperience = (data) => executeAction(adminApi.createExperienceApi, data);
    const updateExperience = (id, data) => executeAction(adminApi.updateExperienceApi, id, data);
    const deleteExperience = (id) => executeAction(adminApi.deleteExperienceApi, id);

    // Education
    const createEducation = (data) => executeAction(adminApi.createEducationApi, data);
    const updateEducation = (id, data) => executeAction(adminApi.updateEducationApi, id, data);
    const deleteEducation = (id) => executeAction(adminApi.deleteEducationApi, id);

    // Skills
    const updateSkills = (category, items) => executeAction(adminApi.updateSkillsApi, category, items);
    const deleteSkillsCategory = (category) => executeAction(adminApi.deleteSkillsCategoryApi, category);

    // Projects
    const createProject = (data) => executeAction(adminApi.createProjectApi, data);
    const updateProject = (id, data) => executeAction(adminApi.updateProjectApi, id, data);
    const deleteProject = (id) => executeAction(adminApi.deleteProjectApi, id);

    // Achievements
    const createAchievement = (data) => executeAction(adminApi.createAchievementApi, data);
    const updateAchievement = (id, data) => executeAction(adminApi.updateAchievementApi, id, data);
    const deleteAchievement = (id) => executeAction(adminApi.deleteAchievementApi, id);

    // Certifications
    const createCertification = (data) => executeAction(adminApi.createCertificationApi, data);
    const updateCertification = (id, data) => executeAction(adminApi.updateCertificationApi, id, data);
    const deleteCertification = (id) => executeAction(adminApi.deleteCertificationApi, id);

    // Contacts
    const toggleContactRead = (id) => executeAction(adminApi.toggleContactReadApi, id);
    const deleteContact = (id) => executeAction(adminApi.deleteContactApi, id);

    return {
        actionLoading,
        updateAbout,
        createExperience,
        updateExperience,
        deleteExperience,
        createEducation,
        updateEducation,
        deleteEducation,
        updateSkills,
        deleteSkillsCategory,
        createProject,
        updateProject,
        deleteProject,
        createAchievement,
        updateAchievement,
        deleteAchievement,
        createCertification,
        updateCertification,
        deleteCertification,
        toggleContactRead,
        deleteContact,
    };
};
