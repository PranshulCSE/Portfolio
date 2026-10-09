import About from '../models/About.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Achievement from '../models/Achievement.js';
import Certification from '../models/Certification.js';

// @desc    Get all public portfolio data
// @route   GET /api/portfolio
// @access  Public
export const getPortfolioData = async (req, res) => {
    try {
        const [
            aboutData,
            experiences,
            educations,
            skillsData,
            projects,
            achievements,
            certifications
        ] = await Promise.all([
            About.findOne(),
            Experience.find().sort({ createdAt: 1 }), // Return experiences
            Education.find().sort({ createdAt: 1 }),
            Skill.find(),
            Project.find(),
            Achievement.find().sort({ createdAt: -1 }),
            Certification.find().sort({ date: -1 }),
        ]);

        // Format skills to match the original data.js shape
        // { languages: [...], frontend: [...] }
        const skills = {};
        if (skillsData && skillsData.length > 0) {
            skillsData.forEach(s => {
                skills[s.category] = s.items;
            });
        }

        res.json({
            success: true,
            data: {
                personal: aboutData?.personal || {},
                about: {
                    bio: aboutData?.bio || '',
                    philosophy: aboutData?.philosophy || '',
                    focus: aboutData?.focus || [],
                    stats: aboutData?.stats || [],
                },
                experience: experiences || [],
                education: educations || [],
                skills: skills,
                projects: projects || [],
                achievements: achievements || [],
                certifications: certifications || [],
            },
        });
    } catch (error) {
        console.error('Error fetching portfolio data:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve portfolio data',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};
