import React from "react"
import { Box, Heading, Image, Text } from '@chakra-ui/react'

const Store = () => {
    
    return (
        <Box
            display={'flex'}
            justifyContent={'space-evenly'}
            position={'relative'}
            zIndex={'1'}
            isolation={'isolate'}
        >
            <Box>
                <Heading padding={'50px 0px'} fontSize={'24px'}>Sub-Category Directory Page</Heading>
                <Box display={'flex'} margin={'15px 0px'}>
                    <Image src='https://placehold.co/240x160'/>
                    <Text padding={'10px'}>Subcategory / Item Name</Text>
                </Box>
                <Box display={'flex'} margin={'15px 0px'}>
                    <Image src='https://placehold.co/240x160'/>
                    <Text padding={'10px'}>Subcategory / Item Name</Text>
                </Box>
                <Box display={'flex'} margin={'15px 0px'}>
                    <Image src='https://placehold.co/240x160'/>
                    <Text padding={'10px'}>Subcategory / Item Name</Text>
                </Box>
            </Box>
            <Box padding={'150px 0px'}>
                <Image src="https://placehold.co/600x400"/>
            </Box>
        </Box>
    )
}

export default Store
