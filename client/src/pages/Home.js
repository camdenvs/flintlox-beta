import React from 'react'
import { Box, Heading, Image, Text } from '@chakra-ui/react'

const Home = () => {


    return (
        <Box  
            display={'flex'} 
            flexDirection={'column'} 
            alignItems={'center'}
            position={'relative'}
            zIndex={'1'}
            isolation={'isolate'}
        >
            <Image src='https://placehold.co/600x400'/>
            <Box 
                margin={'25px 0px'}
                display={'flex'} 
                flexDirection={'column'} 
                alignItems={'center'}
            >
                <Heading textTransform={'uppercase'}>New things to come</Heading>
                <Text>Next product drop in: </Text>
            </Box>
            <Box
                width={'100%'}
                padding={'20px'}
                display={'flex'}
                justifyContent={'space-evenly'}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <Image src='https://placehold.co/240x160'/>
                    <Text width={'200px'} textAlign={'center'}>Shop our currently available wallets</Text>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <Image src='https://placehold.co/240x160'/>
                    <Text width={'200px'} textAlign={'center'}>Shop our currently available bags</Text>
                </Box>
                <Box 
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <Image src='https://placehold.co/240x160'/>
                    <Text width={'200px'} textAlign={'center'}>Shop our currently available keychains, trays, notebooks, and more.</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Home