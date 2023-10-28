import React from "react"
import { Box, Button, Image, Text } from "@chakra-ui/react"

const Product = () => {
    return (
        <Box
            display={'flex'}
            justifyContent={'space-evenly'}
            position={'relative'}
            zIndex={'1'}
            isolation={'isolate'}
        >
            <Box width={'60%'}>
                <Text textAlign={'center'} paddingTop={'35px'}>Item Name</Text>
                <Box display={'flex'} justifyContent={'space-evenly'}>
                    <Box>
                        <Image src="https://placehold.co/120x80" padding={'15px 0px'}/>
                        <Image src="https://placehold.co/120x80" padding={'15px 0px'}/>
                        <Image src="https://placehold.co/120x80" padding={'15px 0px'}/>
                        <Image src="https://placehold.co/120x80" padding={'15px 0px'}/>
                    </Box>
                    <Image src="https://placehold.co/600x400"/>
                </Box>
            </Box>
            <Box width={'30%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
                <Text paddingTop={'35px'}>Description</Text>
                <Box paddingBottom={'35px'}>
                    <Button width={'120px'}>Add to Cart</Button>
                    <Text paddingLeft={'10px'}>$count available</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Product