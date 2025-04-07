export const handleLogin = async (email, password, setError, navigate, lang) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    localStorage.setItem('token', data.token); // Save token
    console.log('Token:', data.token);
    console.log('Login response:', data);

    if (res.ok) {
        // Redirect to profile page
        navigate('/profile');
    }
    setError(null);

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        // Redirect or perform any other action after successful login
    } catch (error) {
        setError(error.message);
    }
};

export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null;
}
export const handleLogout = (navigate) => {
    localStorage.removeItem('token');
    navigate('/login');
}
