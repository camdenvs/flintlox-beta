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
                    flexDirection={{'base': 'column', 'md': 'row'}}
                    justifyContent={'space-evenly'}
                    position={'relative'}
                    zIndex={'1'}
                    isolation={'isolate'}
                >
                    <Box display={{'base': 'none', 'md': 'inline'}}>
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
                    
                    <Box padding={{'base': '25px', 'md': '150px 0px'}}>
                        <Heading display={{'base': 'block', 'md': 'none'}} textAlign={'center'} fontSize={'24px'} margin={'15px'}>Leather</Heading>
                        <Image width={{'base': '100%', 'md': 'auto'}}src={'https://placehold.co/400x500'} />
                    </Box>

                    <Box display={{'base': 'flex', 'md': 'none'}} flexDirection={'column'} alignItems={'center'}>
                        <Box margin={'15px 0px'}>
                            <Text padding={'10px'}>{'Wallets'}</Text>
                            <Link href='/store/wallets'><Image src={'https://placehold.co/240x160'}/></Link>
                        </Box>
                        <Box margin={'15px 0px'}>
                            <Text padding={'10px'}>{'Keychains'}</Text>
                            <Link href='/store/keychains'><Image src={'https://placehold.co/240x160'}/></Link></Box>
                        <Box margin={'15px 0px'}>
                            <Text padding={'10px'}>{'Other'}</Text>
                            <Link href='/store/other-leather'><Image src={'https://placehold.co/240x160'}/></Link>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    display={'flex'}
                    justifyContent={'space-evenly'}
                    flexDirection={{'base': 'column', 'md': 'row'}}
                    position={'relative'}
                    zIndex={'1'}
                    isolation={'isolate'}
                >
                    <Box display={{'base': 'none', 'md': 'inline'}}>
                        <Heading padding={'50px 0px'} fontSize={'24px'} width='100%' textAlign='right'>Apparel</Heading>
                        <Box display={'flex'} margin={'15px 0px'}>
                            <Link href=''><Image src={'https://placehold.co/240x160'}/></Link>
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
                    
                    <Box padding={{'base': '25px', 'md': '150px 0px'}}>
                        <Heading display={{'base': 'block', 'md': 'none'}} textAlign={'center'} fontSize={'24px'} margin={'15px'}>Apparel</Heading>
                        <Image width={{'base': '100%', 'md': 'auto'}}src={'https://placehold.co/400x500'} />
                    </Box>

                    <Box display={{'base': 'flex', 'md': 'none'}} flexDirection={'column'} alignItems={'center'}>
                        <Box margin={'15px 0px'}>
                            <Text padding={'10px'}>T-Shirts</Text>
                            <Link href='/store/t-shirts'><Image src={'https://placehold.co/240x160'}/></Link>
                        </Box>
                        <Box margin={'15px 0px'}>
                            <Text padding={'10px'}>Bags</Text>
                            <Link href='/store/bags'><Image src={'https://placehold.co/240x160'}/></Link></Box>
                        <Box margin={'15px 0px'}>
                            <Text padding={'10px'}>Other</Text>
                            <Link href='/store/other-apparel'><Image src={'https://placehold.co/240x160'}/></Link>
                        </Box>
                    </Box>
                </Box>
                
            )}
        </>
    )
}

export default Category
