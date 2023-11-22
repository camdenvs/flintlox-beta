import React from 'react'
import { Box, Heading, Image, Link, Text } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

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
            <Image width={{"base": "100%", "md": "95%"}} height={'90vh'} objectFit={'cover'} src='/images/flintlox_drop.jpg'/>
            <Box 
                margin={'25px 0px'}
                display={'flex'} 
                flexDirection={'column'} 
                alignItems={'center'}
            >
                <Heading textTransform={'uppercase'} textAlign={'center'}>New things to come</Heading>
                <Text>Next product drop in: </Text>
            </Box>
            <Box
                flexDirection={{ 'base': 'column', 'md': 'row' }}
                width={'100%'}
                padding={'10px'}
                display={'flex'}
                justifyContent={'space-evenly'}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    margin={{'base': '10px'}}
                >
                    <Link as={ReactLink} to='/store/wallets'><Image src={'https://placehold.co/240x160'}/></Link>
                    <Text width={{"base": '80%', "md": '200px'}} textAlign={'center'}>Shop our currently available wallets</Text>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    margin={{'base': '10px'}}
                >
                    <Link as={ReactLink} to='/store/bags'><Image src='https://placehold.co/240x160'/></Link>
                    <Text width={{"base": '80%', "md": '200px'}} textAlign={'center'}>Shop our currently available bags</Text>
                </Box>
                <Box 
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    margin={{'base': '10px'}}
                >
                    <Link as={ReactLink} to='/store'><Image src='https://placehold.co/240x160'/></Link>
                    <Text width={{"base": '80%', "md": '200px'}} textAlign={'center'}>Shop our currently available keychains, trays, notebooks, and more.</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Home