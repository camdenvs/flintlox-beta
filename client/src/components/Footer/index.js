import React from 'react'

import { Flex, Link, Text, } from '@chakra-ui/react'
import { FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <Flex border={'1px'} bgColor={'#212C42'} w={'100%'} justifyContent={'space-around'} h={'13vh'} flexDirection={{ base: 'column', sm: 'row' }} position='relative' zIndex={2}>
                <Text color='white' my='auto' px={{ sm: '3' }} mx={'auto'} fontSize={{base: '12px', sm: '16px'}}>© AllCapsComics. All Rights Reserved</Text>
                <Flex justifyContent={{ base: 'space-around', sm: 'space-between' }}>
                    <Link href='https://twitter.com/EthanVanSciver' fontSize={'48px'} color={'white'} my='auto' mr={{ sm: '10px', md: '50px' }}><FaTwitter /></Link>
                    <Link href='https://www.youtube.com/@ComicArtistProSecrets' fontSize={'48px'} color={'white'} my='auto' ml={{ sm: '10px', md: '50px' }}><FaYoutube /></Link>
                </Flex>
                <Text color='white' my='auto' px={{ sm: '5' }} fontSize={{base: '12px', sm: '16px'}} mx={{ base: 'auto', sm: 'none' }}><Link href='https://camdenvs.github.io/portfolio_v3/' >Who Built This Website?</Link></Text>
            </Flex>
        </footer>
    )
}

export default Footer