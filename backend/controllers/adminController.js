import About from '../models/About.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Achievement from '../models/Achievement.js';
import Certification from '../models/Certification.js';
import Log from '../models/Log.js';
import Contact from '../models/Contact.js';

// Helper to log admin actions
const logAction = async (req, action, details) => {
    try {
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        await Log.create({
            action,
            details,
            ipAddress,
            userAgent,
        });
    } catch (err) {
        console.error('Failed to write audit log:', err.message);
    }
};

// ================= ABOUT CONTROLLERS =================

// @desc    Update about/personal info
// @route   PUT /api/admin/about
// @access  Private
export const updateAbout = async (req, res) => {
    try {
        const { personal, bio, philosophy, focus, stats } = req.body;

        let about = await About.findOne();
        if (!about) {
            about = new About({ personal, bio, philosophy, focus, stats });
        } else {
            if (personal) about.personal = personal;
            if (bio !== undefined) about.bio = bio;
            if (philosophy !== undefined) about.philosophy = philosophy;
            if (focus) about.focus = focus;
            if (stats) about.stats = stats;
        }

        await about.save();
        await logAction(req, 'Update About', 'Updated personal bio and/or stats.');

        res.json({ success: true, message: 'About details updated successfully', data: about });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= EXPERIENCE CONTROLLERS =================

// @desc    Create experience
// @route   POST /api/admin/experience
// @access  Private
export const createExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        await logAction(req, 'Create Experience', `Added work experience at ${experience.company}`);
        res.status(201).json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update experience
// @route   PUT /api/admin/experience/:id
// @access  Private
export const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!experience) return res.status(404).json({ success: false, message: 'Experience not found' });
        
        await logAction(req, 'Update Experience', `Updated work experience at ${experience.company}`);
        res.json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete experience
// @route   DELETE /api/admin/experience/:id
// @access  Private
export const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) return res.status(404).json({ success: false, message: 'Experience not found' });

        await logAction(req, 'Delete Experience', `Removed work experience for ${experience.company}`);
        res.json({ success: true, message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= EDUCATION CONTROLLERS =================

// @desc    Create education
// @route   POST /api/admin/education
// @access  Private
export const createEducation = async (req, res) => {
    try {
        const education = await Education.create(req.body);
        await logAction(req, 'Create Education', `Added education at ${education.school}`);
        res.status(201).json({ success: true, data: education });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update education
// @route   PUT /api/admin/education/:id
// @access  Private
export const updateEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!education) return res.status(404).json({ success: false, message: 'Education not found' });

        await logAction(req, 'Update Education', `Updated education at ${education.school}`);
        res.json({ success: true, data: education });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete education
// @route   DELETE /api/admin/education/:id
// @access  Private
export const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);
        if (!education) return res.status(404).json({ success: false, message: 'Education not found' });

        await logAction(req, 'Delete Education', `Removed education record for ${education.school}`);
        res.json({ success: true, message: 'Education deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= SKILLS CONTROLLERS =================

// @desc    Update skills category items
// @route   PUT /api/admin/skills
// @access  Private
export const updateSkills = async (req, res) => {
    try {
        const { category, items } = req.body;
        if (!category || !items) {
            return res.status(400).json({ success: false, message: 'Category and items are required' });
        }

        let skill = await Skill.findOne({ category });
        if (!skill) {
            skill = new Skill({ category, items });
        } else {
            skill.items = items;
        }

        await skill.save();
        await logAction(req, 'Update Skills', `Updated techstack items for category: ${category}`);

        res.json({ success: true, data: skill });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a skills category
// @route   DELETE /api/admin/skills/:category
// @access  Private
export const deleteSkillsCategory = async (req, res) => {
    try {
        const skill = await Skill.findOneAndDelete({ category: req.params.category });
        if (!skill) return res.status(404).json({ success: false, message: 'Skills category not found' });

        await logAction(req, 'Delete Skills Category', `Removed skills category: ${req.params.category}`);
        res.json({ success: true, message: 'Skills category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= PROJECT CONTROLLERS =================

// @desc    Create project
// @route   POST /api/admin/projects
// @access  Private
export const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        await logAction(req, 'Create Project', `Created project: ${project.title}`);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private
export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        await logAction(req, 'Update Project', `Updated project: ${project.title}`);
        res.json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        await logAction(req, 'Delete Project', `Removed project: ${project.title}`);
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= ACHIEVEMENT CONTROLLERS =================

// @desc    Create achievement
// @route   POST /api/admin/achievements
// @access  Private
export const createAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.create(req.body);
        await logAction(req, 'Create Achievement', `Added achievement: ${achievement.title}`);
        res.status(201).json({ success: true, data: achievement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update achievement
// @route   PUT /api/admin/achievements/:id
// @access  Private
export const updateAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });

        await logAction(req, 'Update Achievement', `Updated achievement: ${achievement.title}`);
        res.json({ success: true, data: achievement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete achievement
// @route   DELETE /api/admin/achievements/:id
// @access  Private
export const deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });

        await logAction(req, 'Delete Achievement', `Removed achievement: ${achievement.title}`);
        res.json({ success: true, message: 'Achievement deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= CERTIFICATION CONTROLLERS =================

// @desc    Create certification
// @route   POST /api/admin/certifications
// @access  Private
export const createCertification = async (req, res) => {
    try {
        const certification = await Certification.create(req.body);
        await logAction(req, 'Create Certification', `Added certification: ${certification.title}`);
        res.status(201).json({ success: true, data: certification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update certification
// @route   PUT /api/admin/certifications/:id
// @access  Private
export const updateCertification = async (req, res) => {
    try {
        const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!certification) return res.status(404).json({ success: false, message: 'Certification not found' });

        await logAction(req, 'Update Certification', `Updated certification: ${certification.title}`);
        res.json({ success: true, data: certification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete certification
// @route   DELETE /api/admin/certifications/:id
// @access  Private
export const deleteCertification = async (req, res) => {
    try {
        const certification = await Certification.findByIdAndDelete(req.params.id);
        if (!certification) return res.status(404).json({ success: false, message: 'Certification not found' });

        await logAction(req, 'Delete Certification', `Removed certification: ${certification.title}`);
        res.json({ success: true, message: 'Certification deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= AUDIT LOGS CONTROLLERS =================

// @desc    Get audit logs
// @route   GET /api/admin/logs
// @access  Private
export const getLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
        res.json({ success: true, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================= CONTACT SUBMISSIONS CONTROLLERS =================

// @desc    Get contact form submissions
// @route   GET /api/admin/contacts
// @access  Private
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Mark contact form submission as read/unread
// @route   PUT /api/admin/contacts/:id/read
// @access  Private
export const toggleContactReadStatus = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: 'Submission not found' });

        contact.readStatus = !contact.readStatus;
        await contact.save();

        await logAction(req, 'Toggle Contact Read Status', `Marked message from ${contact.name} as ${contact.readStatus ? 'read' : 'unread'}`);
        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete contact form submission
// @route   DELETE /api/admin/contacts/:id
// @access  Private
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: 'Submission not found' });

        await logAction(req, 'Delete Contact Submission', `Deleted contact submission from ${contact.name}`);
        res.json({ success: true, message: 'Submission deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
