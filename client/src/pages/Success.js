import React, { useEffect } from 'react'
import { Box, Center, Container, Text } from '@chakra-ui/react'
import { ADD_ORDER, LOWER_AVAILABILITY } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth'


const Success = ({ setCart }) => {
    const [addOrder] = useMutation(ADD_ORDER)
    const [lowerAvailability] = useMutation(LOWER_AVAILABILITY)

    useEffect(() => {
        const items = JSON.parse(window.localStorage.getItem('cart')).items
        const invoice = window.localStorage.getItem('sessionId')
        let stripeProductIds = []

        for (let i = 0; i < items.length; i++) {
            stripeProductIds.push(items[i].stripeProductId)
        }
        try {
            lowerAvailability({
                variables: {
                    stripeProductIds: stripeProductIds
                }
            })
        } catch (err) {
            console.error(err)
        }
        if (Auth.loggedIn()) {
            try {
                addOrder({
                    variables: {
                        userId: Auth.getProfile().data._id,
                        stripeProductIds: stripeProductIds,
                        invoice: invoice
                    }
                })
            } catch (err) {
                console.error(err)
            }
        }
    }, [addOrder, lowerAvailability])

    // useEffect(() => {
    //     setTimeout(() => {
    //         window.location.assign('/');
    //     }, 3000);
    //     setCart(window.localStorage.setItem('cart', JSON.stringify({ items: [], total: 0 })))
    // }, [setCart]);

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