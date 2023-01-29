import { Button, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { endSession, getSession, isLoggedIn } from '../storage/session';

//! New

export default function NavBar() {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }

        let session = getSession();
        setEmail(session.email);
    }, [navigate]);

    const onLogout = () => {
        endSession();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <Typography variant="body1" component="h6" marginRight={1} gutterBottom>
                    You're logged in as:
                </Typography>
                <Typography variant="body1" component="h6" marginRight={3} gutterBottom>
                    {email}
                </Typography>

                <Button variant="contained" color="error" onClick={onLogout}>
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    );
}
