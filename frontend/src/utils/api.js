// API configuration and utility functions

const API_BASE_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'production'
        ? window.location.origin.replace(/\/$/, '')
        : 'http://localhost:5000');

/**
 * Construct full API endpoint URL
 * @param {string} endpoint - The API endpoint (e.g., '/api/contact')
 * @returns {string} Full URL to the API endpoint
 */
export const getApiUrl = (endpoint) => {
    return `${API_BASE_URL}${endpoint}`;
};

/**
 * Make an API request with error handling
 * @param {string} endpoint - The API endpoint
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<object>} Response data
 * @throws {Error} If the request fails
 */
export const apiRequest = async (endpoint, options = {}) => {
    const url = getApiUrl(endpoint);

    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30000), // 30 second timeout
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    try {
        const response = await fetch(url, config);

        // Handle non-JSON responses
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const error = new Error(
                data?.message ||
                data?.error ||
                `HTTP ${response.status}: ${response.statusText}`
            );
            error.status = response.status;
            error.data = data;
            throw error;
        }

        return data;
    } catch (error) {
        // Handle timeout errors
        if (error.name === 'AbortError') {
            throw new Error('Request timeout. Please check your connection and try again.');
        }
        // Handle network errors
        if (error instanceof TypeError) {
            throw new Error(
                'Unable to connect to server. Please check your internet connection.'
            );
        }
        throw error;
    }
};

/**
 * Submit contact form
 * @param {object} formData - Form data object
 * @returns {Promise<object>} API response
 */
export const submitContactForm = (formData) => {
    return apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
};

export default {
    getApiUrl,
    apiRequest,
    submitContactForm,
};
