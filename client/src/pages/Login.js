import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth"
import { Link as RouteLink } from 'react-router-dom';
import {
  Container,
  Input,
  FormControl,
  FormLabel,
  Text,
  Button,
  Link,
  Box,
} from "@chakra-ui/react";

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
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
      h='74vh'>
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
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              mb={2}
            />
          </FormControl>
          <Button type="submit" w='full' mb={2}>Login</Button>
        </form>
        <Text mb={5}>
          No account yet?{" "}
          <Link as={RouteLink} color="blue" to="../signup">
            Sign up
          </Link>{" "}
          instead!
        </Text>
      </Container>
    </Box>
  );
}

export default Login