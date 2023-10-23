import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Flex, Link, UnorderedList, ListItem, Image, Menu, MenuButton, MenuList, MenuItem, Hide, Show, Box, Heading, Text } from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa'
import Auth from '../../utils/auth'
import ShoppingCart from './ShoppingCart'

import { useQuery } from '@apollo/client'
import { QUERY_CART } from '../../utils/queries'

const Header = () => {
    const logout = (event) => {
        event.preventDefault()
        Auth.logout()
    }

    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : undefined
    const { loading, data } = useQuery(QUERY_CART, { variables: { userId: userId } })
    const cart = data?.cart || {}

    return (
        <Box display='block' backgroundColor='#fff' color='#0F0F0F' pos='fixed' zIndex='1001' width='100%' top='0' left='0'>
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                height={'96px'}
                fontSize={'15px'}
                fontWeight={'700'}
                textTransform={'uppercase'}
                padding={{"base": "0px 15px", "sm": "0px 40px"}}
                borderBottom={'1px solid #A6A6A6'}
            >
                <Image></Image>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <Heading>Flintlox</Heading>
                    <Text fontSize={'18px'} fontWeight={'400'}>Leather Goods and Apparel</Text>
                    <Text fontSize={'14px'} fontWeight={'400'}>Handcrafted in the United States of America</Text>
                </Box>
                
                <Box>
                    <Text>Account</Text>
                    <Text>Cart</Text>
                </Box>
            </Box>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'95%'}
                borderBottom={'1px solid #A6A6A6'}
                height={'34px'}
                margin={'0px 2.5%'}
            >
                <Link margin={'0px 20px'}>Home</Link>
                <Link margin={'0px 20px'}>Latest Releases</Link>
                <Link margin={'0px 20px'}>Leather</Link>
                <Link margin={'0px 20px'}>Apparel</Link>
                <Link margin={'0px 20px'}>Imperfect Items</Link>
                <Link margin={'0px 20px'}>About Us</Link>
                <Link margin={'0px 20px'}>Contact</Link>
            </Box>
        </Box>
    )
}

export default Header