import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner, Row, Col, Image } from 'react-bootstrap';
import logo from "@/assets/gainsvault.png"

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Uncomment if you're using JWT
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                console.log('User data:', data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch profile:', err);
                setLoading(false);
            });
    }, [token]);

    if (loading) {
        console.log('Name:', user?.name);
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
                            <h3>{user.name}</h3>
                            <p className="text-muted">{user.email}</p>
                            <p>{user.email}</p>
                            <p><strong>Location:</strong> {user.address || 'N/A'}</p>
                            <p><strong>Bio:</strong> {user.bio || 'No bio yet.'}</p>
                            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

                            <Button variant="primary" className="mt-3">
                                Edit Profile
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
