import React, { useEffect } from 'react'
import { Box, Center, Container, Text } from '@chakra-ui/react'
import { CLEAR_CART } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth'

const Success = () => {
    const [clearCart] = useMutation(CLEAR_CART, {variables: {userId: Auth.getProfile().data._id}})
    
    useEffect(() => {
        setTimeout(() => {
            window.location.assign('/');
        }, 3000);
        clearCart()
    }, [clearCart]);
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
                <Center><Text>Transaction successful! Returning to the home page.</Text></Center>
            </Container>
        </Box>
    )
}

export default Success