import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { CREATE_USER } from "../utils/mutations"
import Auth from '../utils/auth';
import {
    Container,
    Input,
    FormControl,
    FormLabel,
    Button,
    Box
} from "@chakra-ui/react";

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' })
    const [createUser] = useMutation(CREATE_USER)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createUser({
                variables: {
                    ...formState
                },
            });
            Auth.login(data.createUser.token);
        }
        catch (e) {
            console.log(e)
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <Box
            bgImage={"url('/assets/images/bckgrnd-banner1.jpg')"}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            h='74vh'
        >
            <Container
                mt={'10vh'}
                maxW='500px'
                bgColor='white'
                p={8}
                boxShadow='lg'
                borderRadius='md'>
                <form onSubmit={handleFormSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            mb={2}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={formState.username}
                            onChange={handleChange}
                            mb={2}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            mb={2}
                        />
                    </FormControl>
                    <Button type="submit" w='full' mb={5}>Sign Up</Button>
                </form>
            </Container>
        </Box>
    )
}

export default Signup