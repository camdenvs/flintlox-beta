import React from "react"
import { useQuery } from "@apollo/client"
import { Flex, CardHeader, Image, Text, Card, Link } from '@chakra-ui/react'
import { QUERY_PRUDUCT_TYPES } from "../utils/queries"

const Gallery = () => {
    const { loading, error, data } = useQuery(QUERY_PRUDUCT_TYPES)

    const productTypes = data?.productTypes || {}

    return (
        <>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={"space-around"} mt='5' mx='auto' w={{ "sm": "95%", "md": "760px", "xl": '1200px' }}>
                    {productTypes &&
                        productTypes.length > 0 ?
                        (productTypes.map((productType) => (
                            <Card border={'1px'} borderColor={'blackAlpha.300'} w={{ "sm": "100%", "md": "360px" }} mb='5' _hover={{ 'base': {}, 'md': { boxShadow: '2xl', width: '385px' } }} transition={'0.3s'} key={productType._id}>
                                <Link href={`/listings/${productType._id}`} _hover={'none'} marginY={'auto'}>
                                    <Image src={productType.image} maxW='300px' maxHeight='300px' mx='auto' marginTop={'25px'}></Image>
                                    <CardHeader fontSize={'20px'} textAlign={'center'}>{productType.name}</CardHeader>
                                </Link>
                            </Card>
                        ))) : (
                            <>
                                <Text>Nothing Here Yet...</Text>
                            </>
                        )
                    }
                </Flex>
            )
            }
        </>
    )
}

export default Gallery