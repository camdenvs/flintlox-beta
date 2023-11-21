import React, { useState, useEffect } from 'react'
import { Link, Image, Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link as ReactLink, useLocation } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
import Auth from '../../utils/auth'
import ShoppingCart from './ShoppingCart'

import { useQuery } from '@apollo/client'
import { QUERY_CART } from '../../utils/queries'

const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const pathname = useLocation()

    useEffect(() => {
        setNavbarOpen(false); // Close the navigation panel
      }, [ pathname ])

    const logout = (event) => {
        event.preventDefault()
        Auth.logout()
    }

    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : undefined
    const { loading, data } = useQuery(QUERY_CART, { variables: { userId: userId } })
    const cart = data?.cart || {}

    const toggleNav = (event) => {
        event.preventDefault()

        setNavbarOpen(!navbarOpen)
    }

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
                padding={{ "base": "0px 15px", "sm": "0px 40px" }}
                borderBottom={'1px solid #A6A6A6'}
            >
                <Image src='/Flintlox_Logo.png' width={{ 'base': '64px', 'md': '75px' }} />
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <Heading fontSize={{ 'base': '24px', 'md': '32px' }}>Flintlox</Heading>
                    <Text display={{ 'base': 'none', 'md': 'flex' }} fontSize={'18px'} fontWeight={'400'}>Leather Goods and Apparel</Text>
                    <Text display={{ 'base': 'none', 'md': 'flex' }} fontSize={'14px'} fontWeight={'400'}>Handcrafted in the United States of America</Text>
                </Box>

                <Box width={{ 'base': '64px', 'md': '75px' }} textAlign={'center'}>

                    {Auth.loggedIn() ? (
                        <Link onClick={logout} textDecoration={'none'}>Logout</Link>
                    ) : (
                        <Link as={ReactLink} to='/login'>Login</Link>
                    )}
                    
                    {Auth.loggedIn() ? (
                        <ShoppingCart cart={cart} loading={loading} />
                    ) : (
                        <ShoppingCart />
                    )}
                    
                </Box>
            </Box>
            <Box
                display={{ 'base': 'none', 'md': 'flex' }}
                justifyContent={'center'}
                alignItems={'center'}
                width={'95%'}
                borderBottom={'1px solid #A6A6A6'}
                height={'34px'}
                margin={'0px 2.5%'}
            >
                <Link as={ReactLink} margin={'0px 15px'} to='/'>Home</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/store'>Latest Releases</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/category/leather'>Leather</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/category/apparel'>Apparel</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/store/imperfect'>Imperfect Items</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/about'>About Us</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/contact'>Contact</Link>
            </Box>
            <Box
                display={{ 'base': 'flex', 'md': 'none' }}
                justifyContent={'center'}
                alignItems={'center'}
                width={'95%'}
                borderBottom={'1px solid #A6A6A6'}
                height={'34px'}
                margin={'0px 2.5%'}
            >
                <Button
                    height={'100%'}
                    width={'100%'}
                    background='none'
                    borderRadius={'none'}
                    onClick={toggleNav}
                ><FaChevronDown color='black' /></Button>
            </Box>
            <Box
                id='navbar'
                display={navbarOpen ? 'flex' : 'none'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'95%'}
                borderBottom={'1px solid #A6A6A6'}
                margin={'0px 2.5%'}
            >
                <Link as={ReactLink} margin={'0px 15px'} to='/'>Home</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/store'>Latest Releases</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/category/leather'>Leather</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/category/apparel'>Apparel</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/imperfect'>Imperfect Items</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/about'>About Us</Link>
                <Link as={ReactLink} margin={'0px 15px'} to='/contact'>Contact</Link>
            </Box>
        </Box>
    )
}

export default Header