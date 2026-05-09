import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Code2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { portfolioData } from '../constants/data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Contact.css';
import { submitContactForm } from '../utils/api';

const Contact = () => {
    const sectionRef = useScrollReveal();
    const { personal, socials } = portfolioData;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return false;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            toast.error('Valid email is required');
            return false;
        }
        if (!formData.message.trim()) {
            toast.error('Message is required');
            return false;
        }
        if (formData.message.trim().length < 10) {
            toast.error('Message must be at least 10 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await submitContactForm(formData);

            if (response.success) {
                toast.success(response.message || 'Message sent! I\'ll get back to you soon 🚀');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error(response.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            const errorMessage = error.data?.message ||
                error.message ||
                'Error connecting to server. Please try again later.';
            toast.error(errorMessage);
            console.error('Contact form error:', error);
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: personal.email,
            href: socials.email,
        },
        {
            icon: Phone,
            label: personal.phone,
            href: `tel:${personal.phone.replace(/\s/g, '')}`,
        },
        {
            icon: MapPin,
            label: personal.location,
            href: '#',
        },
    ];

    return (
        <section id="contact" className="contact section" ref={sectionRef}>
            <Toaster position="bottom-right" />
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">LET'S CONNECT</p>
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">
                        Have a project in mind? Let's build something amazing together.
                    </p>
                </motion.div>

                <div className="contact-grid">
                    {/* Left Column - Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>Contact Information</h3>
                        <div className="info-items">
                            {contactInfo.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        className="info-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="info-icon">
                                            <Icon size={24} />
                                        </div>
                                        <div>
                                            <p className="info-label">
                                                {item.icon === Mail ? 'Email' : item.icon === Phone ? 'Phone' : 'Location'}
                                            </p>
                                            <p className="info-value">{item.label}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Socials */}
                        <div className="contact-socials">
                            <h4>Follow Me</h4>
                            <div className="socials-row">
                                <a href={socials.github} target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <Github size={24} />
                                </a>
                                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <Linkedin size={24} />
                                </a>
                                <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <Code2 size={24} />
                                </a>
                                <a href={socials.email} className="social-btn">
                                    <Mail size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        aria-busy={loading}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your name"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Project inquiry"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Your Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell me about your project..."
                                rows="5"
                                required
                                disabled={loading}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message 🚀'}
                        </button>

                        <p className="form-note">
                            Your message is stored immediately, then the emails are sent in the background.
                        </p>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
