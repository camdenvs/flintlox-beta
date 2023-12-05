import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const About = () => {

    return (
        <Box margin={'auto'} width={'80%'}>
            <Heading margin={'25px'}>Who We Are</Heading>
            <Text paddingY={'10px'}>We're an American family living in Mesa, AZ. Our main product designer and leather crafter is me, Josiah. I've spent about 29 years in the IT industry, but I've always felt pulled towards more creative pursuits. A couple years back, I began looking into leatherworking, and with a heavy investment in tools, materials, and time, I started to produce some items that friends and family encouraged me to sell. So here we are.</Text>
            <Text paddingY={'10px'}>My son runs our website, my daughters take photos and run the social media accounts, and my wife gives my products a critical eye, and gives me all the support I need.</Text>
            <Text paddingY={'10px'}>Our plan is to create new products every few weeks to a month - some repeats, some updates on previous products, and some new. We'll announce the product drops, and hopefully people will like them enough to purchase.</Text>

            <Text paddingY={'10px'}>We're using top quality leathers from tanneries like Horween and Sidel in the USA, Conceria Walpier in Italy, and Shinki Hikaku in Japan. We use Ritza Tiger waxed polyester thread, and we're hand stitching everything.</Text>

            <Text paddingY={'10px'}>We're not trying to compete with most leather goods available in department stores, which barely contain any leather at all. We want rugged, rustic, eye-catching pieces that become more beautiful over time with patina. The kind of items you'll want to collect, and your kids will want to inherit.</Text>
        </Box>
    )
}

export default About