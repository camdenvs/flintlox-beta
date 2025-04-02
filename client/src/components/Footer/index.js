import React from 'react'
import { Box, Image, Link, Text, } from '@chakra-ui/react'
import { FaInstagram, FaEnvelope } from 'react-icons/fa'

const Footer = () => {


    return (
        <footer>
            <Box display={'flex'} height={'100px'} justifyContent={'space-evenly'} marginTop={'25px'}>
                <Text fontSize={'20px'} fontWeight={'600'} alignSelf={'center'}>©Flintlox LLC</Text>
                <Box display={'flex'} alignSelf={'center'}>
                    <Link href='https://www.instagram.com/flintloxleathergoods/' target='_blank' rel="noopener noreferrer"><FaInstagram size={'50px'} /></Link>
                    <Link href='https://twitter.com/flintloxleather' target='_blank' rel="noopener noreferrer"><Image src="/images/x-twitter.svg" marginX='20px' width={'50px'}/></Link>
                    <Link href='mailto:admin@flintlox.com'><FaEnvelope size={'50px'}/></Link>
                </Box>
            </Box>
        </footer>
    )
}

export default Footer