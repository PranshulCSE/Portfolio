import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import About from '../models/About.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Achievement from '../models/Achievement.js';
import Certification from '../models/Certification.js';
import Log from '../models/Log.js';

dotenv.config();

const seedData = {
    personal: {
        name: 'Pranshul Threja',
        title: 'Aspiring SDE | MERN Stack Developer | MCA Student',
        email: 'threjapranshul@gmail.com',
        phone: '+91 9992560407',
        location: 'Karnal, Haryana, India',
        tagline: 'Building Scalable Software, One Commit at a Time.',
    },
    about: {
        bio: "MCA student at Geeta University and a results-driven Full-Stack Developer with hands-on experience across three internships, building AI-integrated full-stack applications, REST APIs, and scalable backend systems.\n\nI specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js) and have a solid foundation in Data Structures & Algorithms, with an emphasis on writing efficient, optimized, and clean code. I'm also skilled in leveraging AI-assisted development to ship production-ready features.\n\nBeyond development, I actively contribute to teams, mentor peers, and communicate technical concepts through public speaking. I enjoy turning complex ideas into real-world solutions while continuously learning and adapting to new technologies.\n\nCurrently seeking opportunities to apply my MERN and DSA skills in a professional software development environment. 🚀",
        philosophy: 'Consistency + Curiosity + Clean Code = Great Software',
        focus: [
            'Advanced MERN Stack Architecture',
            'System Design Fundamentals',
            'Backend Performance Optimization',
            'Authentication & Security',
        ],
        stats: [
            { label: 'LeetCode & GFG Problems', value: 325, suffix: '+' },
            { label: 'Certifications', value: 30, suffix: '+' },
            { label: 'Internship Experience', value: 3 },
            { label: 'MCA SGPA', value: 9.33 },
        ],
    },
    experience: [
        {
            company: 'SVS Techforge Pvt. Ltd.',
            position: 'MERN Stack Intern – AI (Summer Internship)',
            duration: 'June 2026 – July 2026 (45 Days)',
            location: 'Delhi (On-site)',
            icon: 'briefcase',
            achievements: [
                'Building GTECH Code, an AI-augmented MERN-stack online judge platform integrating Judge0 API for real-time multi-language code execution',
                'Implementing AI-assisted backend workflows and secure authentication (JWT, bcrypt) with Redis-backed caching for performance optimization',
            ],
            technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redis', 'JWT', 'bcrypt', 'Judge0 API', 'AI'],
        },
        {
            company: 'Codec Technologies',
            position: 'MERN Stack Intern',
            duration: 'March 2026 – April 2026',
            location: 'Remote',
            icon: 'briefcase',
            achievements: [
                'Designed and implemented complex backend architectures and RESTful APIs for a private enterprise client, ensuring optimal application performance and security',
                'Bridged database management (MongoDB) with server-side operations (Node.js/Express.js) to support dynamic client-facing features on a collaborative project',
            ],
            technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
        },
        {
            company: '3 Skills Pvt. Ltd.',
            position: 'Web Developer Intern',
            duration: 'Dec 2025 – Feb 2026',
            location: 'Remote',
            icon: 'briefcase',
            achievements: [
                'Architected and deployed 2 full-stack web applications using the MERN stack, from responsive front-end to server-side APIs',
                'Managed source control using Git and GitHub, maintaining clean codebases and facilitating conflict-free deployments',
            ],
            technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'GitHub'],
        },
    ],
    skills: [
        { category: 'languages', items: ['C++', 'Java', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
        { category: 'frontend', items: ['React.js', 'Tailwind CSS', 'Bootstrap', 'Responsive UI'] },
        { category: 'backend', items: ['Node.js', 'Express.js', 'REST API Development', 'JWT', 'bcrypt'] },
        { category: 'database', items: ['MongoDB', 'MySQL', 'Redis'] },
        { category: 'dsaCS', items: ['Problem Solving', 'OOPS', 'Time Complexity Analysis', 'Data Structures'] },
        { category: 'tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Netlify', 'Cursor', 'Claude', 'Antigravity', 'Judge0 API', 'Razorpay API', 'Basics of AWS', 'Docker'] },
        {
            category: 'learning',
            items: [
                'Advanced MERN Stack Architecture',
                'Backend Performance Optimization',
                'Artificial Intelligence (AI) & LLMs',
                'System Design Fundamentals',
                'Authentication & Security',
                'Scalable API Development',
            ],
        },
    ],
    projects: [
        {
            title: 'GTECH Code',
            description: 'AI-augmented, LeetCode-style competitive coding platform (in progress) with real-time multi-language code execution via the Judge0 API. Secure JWT + bcrypt authentication with Redis-backed session/caching for the submission and polling pipeline, on a MongoDB/Mongoose + Express.js/Node.js backend.',
            image: '/assets/Projects/GTECHCode.png',
            tags: ['MERN Stack', 'Redis', 'JWT', 'bcrypt', 'Judge0 API', 'AI'],
            github: 'https://github.com/PranshulCSE/gtech-code',
            featured: true,
            category: 'Full Stack',
        },
        {
            title: 'SAJSSM – Society Website',
            description: 'Built and maintained official website using MERN stack. Increased engagement by 35% and automated 5+ processes reducing admin workload by 50%. Managed deployments and 15+ feature updates.',
            image: '/assets/Projects/SAJSSM.png',
            tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js'],
            github: 'https://github.com/PranshulCSE/Shri_Amarnath_Janshakti_Website.git',
            live: 'https://shriamarnathjanshakti.app/',
            featured: true,
            category: 'Full Stack',
        },
        {
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce app with dynamic UI, REST APIs, and Razorpay payment integration. Focused on scalability and backend business logic.',
            image: '/assets/Projects/ECommerce.png',
            tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Razorpay'],
            github: 'https://github.com/PranshulCSE/E-Commerce-Full-Stack-Web-Application-.git',
            featured: true,
            category: 'Full Stack',
        },
    ],
    education: [
        {
            degree: "Master's of Computer Applications (MCA)",
            school: 'Geeta University, Panipat',
            duration: 'Aug 2025 – May 2027',
            gpa: 9.33,
            highlights: ['Class Representative', 'INCSTIC 2025 Attendee', 'Student Mentor', 'Event Organiser – Tech Symposium'],
            description: 'Focused on Full-Stack Development, System Design, and Artificial Intelligence (AI).',
        },
        {
            degree: "Bachelor's of Computer Applications (BCA)",
            school: 'Dyal Singh College, Karnal',
            duration: 'Aug 2022 – May 2025',
            gpa: 7.5,
            highlights: ['Class Topper', 'Ambassdor of Computer Science Department'],
            description: 'Built strong foundation in programming and computer science fundamentals.',
        },
    ],
    certifications: [
        { title: 'Python Essentials 1', issuer: 'Cisco Networking Academy (Python Institute)', date: 'Sep 2025' },
        { title: 'Bootstrap CSS Bootcamp', issuer: 'LetsUpgrade (NSDC & ITM Edutech)', date: 'Oct 2025' },
        { title: 'Computer Hardware Basics', issuer: 'Cisco Networking Academy', date: 'Oct 2025' },
        { title: 'Introduction to CSS', issuer: 'Simplilearn SkillUp', date: 'Sep 2025' },
        { title: 'Introduction to Front End Development', issuer: 'Simplilearn SkillUp', date: 'Oct 2025' },
        { title: 'Full Stack Development Bootcamp', issuer: 'LetsUpgrade (NSDC & ITM Edutech)', date: 'Oct 2025' },
        { title: 'Certificate of Participation – Tech Show', issuer: 'Google Student Ambassador Program, Geeta University', date: 'Nov 2025' },
        { title: 'Introduction to HTML', issuer: 'Simplilearn SkillUp', date: 'Sep 2025' },
        { title: 'Introduction to Network Analysis', issuer: 'Security Blue Team', date: 'Sep 2025' },
        { title: 'Introduction to Python', issuer: 'Security Blue Team', date: 'Sep 2025' },
        { title: 'Introduction to Threat Hunting', issuer: 'Security Blue Team', date: 'Oct 2025' },
        { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', date: 'Oct 2025' },
        { title: 'Network Support and Security', issuer: 'Cisco Networking Academy', date: 'Sep 2025' },
        { title: 'Networking Basics', issuer: 'Cisco Networking Academy', date: 'Sep 2025' },
        { title: 'C++ Programming Course For Beginners', issuer: 'ScholarHat', date: 'Sep 2025' },
        { title: 'Data Structures & Algorithms Course For Beginners', issuer: 'ScholarHat', date: 'Sep 2025' },
        { title: 'JavaScript Programming Course For Beginners', issuer: 'ScholarHat', date: 'Nov 2025' },
        { title: 'Certificate of Participation – Yugantran 2.0', issuer: 'Geeta University (School of CSE & Geeta Technical Hub)', date: 'Nov 2025' },
        { title: 'Python Essentials 2', issuer: 'Cisco Networking Academy (Python Institute)', date: 'Sep 2025' },
        { title: 'Certificate of Appreciation – Coordinator, Discipline Committee, Yugantran 2.0', issuer: 'Geeta University (School of CSE & Geeta Technical Hub)', date: 'Nov 2025' },
        { title: 'AI Tools & ChatGPT Workshop', issuer: 'be10x', date: 'Feb 2026' },
        { title: 'MERN Stack Development Training', issuer: 'Codec Technologies (ICAC Recognized)', date: 'Apr 2026' },
        { title: 'Data Structures in C++ Course', issuer: 'Scaler Topics', date: 'Mar 2026' },
        { title: 'Red Hat Training: Getting Started with Linux Fundamentals (RH104)', issuer: 'Red Hat', date: 'Mar 2026' },
        { title: 'Node JS Certification Course – Master the Fundamentals', issuer: 'Scaler Topics', date: 'Mar 2026' },
    ],
    achievements: [
        {
            title: '325+ DSA Problems + 100-Day Streak',
            description: 'Solved 325+ algorithmic problems on LeetCode & GeeksforGeeks with a 50-day problem-solving streak on LeetCode.',
            category: 'Technical',
            date: '2026',
            image: '/assets/Images/Leetcode.png',
        },
        {
            title: 'Winner – Yugantran 2.0',
            description: "Won 1st place in Geeta University's annual Tech fest.",
            category: 'Competition',
            date: '2025',
            image: '/assets/Images/Yugantran.jpg',
        },
        {
            title: 'Mentor – HackForge 2.0',
            description: "Mentored 140+ teams and 490+ participants in Geeta University's hackathon.",
            category: 'Mentorship',
            date: '2026',
            image: '/assets/Images/RED01504.JPG',
        },
        {
            title: 'Class Representative (CR)',
            description: 'Acted as liaison between students and faculty, improving coordination.',
            category: 'Leadership',
            date: '2025-2026',
            image: '/assets/Images/PC.jpg',
        },
        {
            title: 'MCA 1st Semester Topper',
            description: 'Named 1st Semester Topper in MCA at Geeta University with an SGPA of 9.33.',
            category: 'Academic',
            date: '2025-2026',
            image: '/assets/Images/TOPPER.jpg',
        },
    ],
};

export const seedDatabase = async () => {
    try {
        console.log('⏳ Starting database seeding checks...');

        // 1. Seed Admin User
        const adminCount = await User.countDocuments();
        if (adminCount === 0) {
            const username = process.env.ADMIN_USERNAME ;
            const password = process.env.ADMIN_PASSWORD ;

            const adminUser = new User({
                username,
                password, // Will be hashed by pre-save hook
            });
            await adminUser.save();
            console.log(`✓ Admin user created successfully (username: ${username})`);
            await Log.create({
                action: 'System Seed',
                details: `Admin user account created with username: ${username}`,
            });
        }

        // 2. Seed About Data
        const aboutCount = await About.countDocuments();
        if (aboutCount === 0) {
            await About.create({
                personal: seedData.personal,
                bio: seedData.about.bio,
                philosophy: seedData.about.philosophy,
                focus: seedData.about.focus,
                stats: seedData.about.stats,
            });
            console.log('✓ About data seeded');
        }

        // 3. Seed Experience Data
        const expCount = await Experience.countDocuments();
        if (expCount === 0) {
            await Experience.insertMany(seedData.experience);
            console.log('✓ Experience data seeded');
        }

        // 4. Seed Education Data
        const eduCount = await Education.countDocuments();
        if (eduCount === 0) {
            await Education.insertMany(seedData.education);
            console.log('✓ Education data seeded');
        }

        // 5. Seed Skills Data
        const skillsCount = await Skill.countDocuments();
        if (skillsCount === 0) {
            await Skill.insertMany(seedData.skills);
            console.log('✓ Skills data seeded');
        }

        // 6. Seed Projects Data
        const projCount = await Project.countDocuments();
        if (projCount === 0) {
            await Project.insertMany(seedData.projects);
            console.log('✓ Projects data seeded');
        }

        // 7. Seed Achievements Data
        const achCount = await Achievement.countDocuments();
        if (achCount === 0) {
            await Achievement.insertMany(seedData.achievements);
            console.log('✓ Achievements data seeded');
        }

        // 8. Seed Certifications Data
        const certCount = await Certification.countDocuments();
        if (certCount === 0) {
            await Certification.insertMany(seedData.certifications);
            console.log('✓ Certifications data seeded');
        }

        console.log('✓ Database seeding checks completed successfully!');
    } catch (error) {
        console.error('❌ Database seeding failed:', error.message);
    }
};
