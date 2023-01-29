//import { Button, Container, Typography, Box, AppBar, Toolbar, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { endSession, getSession, isLoggedIn } from '../storage/session';

import { getFirestore, doc, getDocs, collection } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

//? Component
import NavBar from '../components/NavBar';
import AddItemModal from '../components/AddItemModal.jsx';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Dashboard() {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const colRef = collection(firestore, "items");
        const docsSnap = await getDocs(colRef);

        docsSnap.forEach(item => {
            setItems([...items, item.data()])
            console.log(item.data());
        })
    }

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }

        let session = getSession();
        setEmail(session.email);
        fetchItems();
    }, [navigate]);


    return (
        <div>
            <NavBar />
            <AddItemModal />
            {
                items && items.map(item => {
                    return (
                        <Box display="flex" justifyContent="center" alignItems="top" marginBottom={3}>
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}>
                                <Item key={item.itemId}>
                                    <Typography variant="h4" component="h2">
                                        {item.itemId}
                                    </Typography>
                                    <Typography variant="h6" component="h4">
                                        Name: {item.itemName}
                                    </Typography>
                                    <Typography variant="h6" component="h4">
                                        Price: {item.price}
                                    </Typography>
                                </Item>
                            </Stack>
                        </Box>
                    )

                })
            }
        </div>
    );
}
