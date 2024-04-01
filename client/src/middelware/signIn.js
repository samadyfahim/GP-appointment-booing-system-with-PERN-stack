import { setCookie } from './cookieUtils'; 

const signIn = async (formData) => {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            const data = await response.json();
            setCookie('token', data.token, 1); 
            return { success: true, redirectUrl: '/home' };
        } else {
            if (response.status === 404) {
                return { success: false, error: 'User not found' };
            } else if (response.status === 401) {
                return { success: false, error: 'Password is wrong' };
            } else {
                return { success: false, error: 'Authentication failed' };
            }
        }
    } catch (error) {
        console.error('Error occurred during authentication:', error);
        return { success: false, error: 'Error occurred during authentication' };
    }
};

export default signIn;
