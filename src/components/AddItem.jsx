import { useState } from 'react';
import { collection, doc ,setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const AddItem = () => {
    const [itemId, SetItemId] = useState('');
    const [itemName, SetItemName] = useState('');
    const [price, SetPrice] = useState(0);
    const sub = async (e) => {
        e.preventDefault();

        const docRef = doc(firestore, "items", itemId);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            if ((itemId !== "") && (itemName !== "") && (price !== 0)) {

                const data = {
                    itemId: itemId,
                    itemName: itemName,
                    price: Number(price),
                }

                await setDoc(docRef, data).then(docRef => {
                    alert('Successfully add new item to database!')
                }).catch(error => {
                    alert('Error adding item to database: ', error);
                })
            } else {
                alert('All input are required!')
            }
        } else {
            alert(`Item ID ${itemId} already existed in the database!`)
        }


    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>

            <Stack
                component="form"
                sx={{
                    width: '25ch',
                }}
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                    sub(e);
                }}
            >
                <TextField
                    id="setItemId"
                    label="Item ID"
                    variant="outlined"
                    type="text"
                    placeholder="Item ID"
                    onChange={(e) => {
                        SetItemId(e.target.value);
                    }}
                />
                <TextField
                    id="setItemName"
                    label="Item Name"
                    variant="outlined"
                    type="text"
                    placeholder="Item Name"
                    onChange={(e) => {
                        SetItemName(e.target.value);
                    }}
                />
                <TextField
                    id="setPrice"
                    label="Item Price"
                    variant="outlined"
                    type="number"
                    placeholder="Item Price"
                    onChange={(e) => {
                        SetPrice(e.target.value);
                    }}
                />
                <Button variant="contained" color="success" type="submit">
                    Add Item
                </Button>
            </Stack>
        </Box>
    );
};

export default AddItem;