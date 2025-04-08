import axios from 'axios';

const token = localStorage.getItem('token');

export const fetchProfile = async (setLoading, setUser, setUpdatedUser) => {
    setLoading(true);
    try {
        const response = await axios.get('/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`, // Include token in Authorization header
            },
        });
        setUser(response.data.user);
        setUpdatedUser(response.data.user); // Initialize updatedUser with fetched data
    } catch (error) {
        console.error('Failed to fetch profile:', error.response?.data || error.message);
    } finally {
        setLoading(false);
    }
};

export const updateProfile = (e, updatedUser, setUpdatedUser) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
};

export const saveProfile = async (updatedUser, setSaving, setUser, setEditing) => {
    setSaving(true);

    try {
        const response = await axios.put('/api/profile', updatedUser, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        setUser(response.data.user); // Update user state with new data
        setEditing(false); // Exit edit mode
    } catch (error) {
        console.error('Error saving profile:', error.response?.data || error.message);
    } finally {
        setSaving(false);
    }
}
