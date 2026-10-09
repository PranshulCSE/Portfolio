import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
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
    getLogs,
    getContacts,
    toggleContactReadStatus,
    deleteContact,
} from '../controllers/adminController.js';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// About
router.put('/about', updateAbout);

// Experience
router.post('/experience', createExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);

// Education
router.post('/education', createEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);

// Skills
router.put('/skills', updateSkills);
router.delete('/skills/:category', deleteSkillsCategory);

// Projects
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Achievements
router.post('/achievements', createAchievement);
router.put('/achievements/:id', updateAchievement);
router.delete('/achievements/:id', deleteAchievement);

// Certifications
router.post('/certifications', createCertification);
router.put('/certifications/:id', updateCertification);
router.delete('/certifications/:id', deleteCertification);

// Logs
router.get('/logs', getLogs);

// Contacts/Submissions
router.get('/contacts', getContacts);
router.put('/contacts/:id/read', toggleContactReadStatus);
router.delete('/contacts/:id', deleteContact);

export default router;
