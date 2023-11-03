import React from "react"
import { useParams } from "react-router-dom"
import { Box, Heading, Image, Text, Link } from '@chakra-ui/react'

const Category = () => {
    const { category } = useParams()


    return (
        <>
            {category === 'leather' ? (
                <Box
                    display={'flex'}
                    justifyContent={'space-evenly'}
                    position={'relative'}
                    zIndex={'1'}
                    isolation={'isolate'}
                >
                    <Box>
                        <Heading padding={'50px 0px'} fontSize={'24px'}  width='100%' textAlign='right'>Leather</Heading>
                        <Box display={'flex'} margin={'15px 0px'}>
                            <Link href='/store/wallets'><Image src={'https://placehold.co/240x160'}/></Link>
                            <Text padding={'10px'}>{'Wallets'}</Text>
                        </Box>
                        <Box display={'flex'} margin={'15px 0px'}>
                            <Link href='/store/keychains'><Image src={'https://placehold.co/240x160'}/></Link>
                            <Text padding={'10px'}>{'Keychains'}</Text>
                        </Box>
                        <Box display={'flex'} margin={'15px 0px'}>
                            <Link href='/store/other-leather'><Image src={'https://placehold.co/240x160'}/></Link>
                            <Text padding={'10px'}>{'Other'}</Text>
                        </Box>
                    </Box>
                    <Box padding={'150px 0px'}>
                        <Image src={'https://placehold.co/400x500'} />
                    </Box>
                </Box>
            ) : (
                <Box
                    display={'flex'}
                    justifyContent={'space-evenly'}
                    position={'relative'}
                    zIndex={'1'}
                    isolation={'isolate'}
                >
                    <Box>
                        <Heading padding={'50px 0px'} fontSize={'24px'} width='100%' textAlign='right'>Apparel</Heading>
                        <Box display={'flex'} margin={'15px 0px'}>
                            <Link href='/store/t-shirts'><Image src={'https://placehold.co/240x160'}/></Link>
                            <Text padding={'10px'}>{'T-Shirts'}</Text>
                        </Box>
                        <Box display={'flex'} margin={'15px 0px'}>
                            <Link href='/store/bags'><Image src={'https://placehold.co/240x160'}/></Link>
                            <Text padding={'10px'}>{'Bags'}</Text>
                        </Box>
                        <Box display={'flex'} margin={'15px 0px'}>
                            <Link href='/store/other-apparel'><Image src={'https://placehold.co/240x160'}/></Link>
                            <Text padding={'10px'}>{'Other'}</Text>
                        </Box>
                    </Box>
                    <Box padding={'150px 0px'}>
                        <Image src={'https://placehold.co/400x500'} />
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Category
