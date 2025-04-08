import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner, Row, Col, Image, Form } from 'react-bootstrap';
import logo from "@/assets/gainsvault.png";
import { fetchProfile, saveProfile, updateProfile } from '../utils/profile';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false); // Track if the user is editing their profile
    const [updatedUser, setUpdatedUser] = useState({}); // Store updated user data
    const [saving, setSaving] = useState(false); // Track save operation

    // Fetch user profile data once
    useEffect(() => {
        fetchProfile(setLoading, setUser, setUpdatedUser);
    }, []);

    // Handle input changes in the edit form
    const handleChange = (e) => {
        updateProfile(e, updatedUser, setUpdatedUser);
    };

    // Save updated profile data using Axios
    const handleSave = async () => {
        saveProfile(updatedUser, setSaving, setUser, setEditing);
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className="text-center mt-5">
                <p>Failed to load user data.</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Row>
                        <Col md={4} className="text-center">
                            <Image
                                src={user.avatar || logo}
                                roundedCircle
                                fluid
                                width={150}
                                height={150}
                            />
                        </Col>
                        <Col md={8}>
                            {editing ? (
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={updatedUser.name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={updatedUser.email}
                                            onChange={handleChange}
                                            disabled // Email is usually not editable
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="address"
                                            value={updatedUser.address || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="bio"
                                            value={updatedUser.bio || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    {/* Save and Cancel Buttons */}
                                    <Button variant="success" onClick={handleSave} disabled={saving}>
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </Button>{' '}
                                    <Button variant="secondary" onClick={() => setEditing(false)}>
                                        Cancel
                                    </Button>
                                </Form>
                            ) : (
                                <>
                                    {/* Display Profile Information */}
                                    <h3>{user.name}</h3>
                                    <p className="text-muted">{user.email}</p>
                                    <p><strong>Location:</strong> {user.address || 'N/A'}</p>
                                    <p><strong>Bio:</strong> {user.bio || 'No bio yet.'}</p>
                                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

                                    {/* Edit Profile Button */}
                                    <Button variant="primary" className="mt-3" onClick={() => setEditing(true)}>
                                        Edit Profile
                                    </Button>
                                </>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
