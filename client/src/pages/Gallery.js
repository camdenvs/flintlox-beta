import React from "react"
import { Flex, CardHeader, CardBody, Center, Image, Text, Card, Link, useQuery } from '@chakra-ui/react'
import { QUERY_PRUDUCT_TYPES } from "../utils/queries"
import { useParams } from "react-router-dom"

const Gallery = () => {
    const { subcategory } = useParams()
    const { loading, error, data } = useQuery(QUERY_PRUDUCT_TYPES)

    console.log(loading, error, data)

    const productTypes = data?.productTypes || {}

    return (
        <>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={"space-around"} mt='5' mx='auto' w={{ "sm": "95%", "md": "760px", "xl": '1200px' }}>
                    {console.log(data)}
                    {productTypes &&
                        productTypes.length > 0 ?
                        (productTypes.map((productType) => (
                            <Card border={'1px'} borderColor={'blackAlpha.300'} w={{ "sm": "100%", "md": "360px" }} mb='5' _hover={{ 'base': {}, 'md': { boxShadow: '2xl', width: '385px' } }} transition={'0.3s'} key={productType._id}>
                                <Link href={`/products/${productType._id}`} _hover={'none'}>
                                    <Image src={productType.image ? `/images/product/${productType.image}` : ''} w='300px' h='300px' mx='auto' marginTop={'25px'}></Image>
                                    <Center><CardHeader fontSize={'20px'} pb='0'>{productType.name}</CardHeader></Center>
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