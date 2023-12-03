import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Flex, CardHeader, CardBody, Center, Image, Text, Card, Link } from '@chakra-ui/react'
import { QUERY_PRODUCTS } from "../utils/queries"

const Store = () => {
    const { subcategory } = useParams()
    const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
        variables: { subcategory: subcategory }
    })

    const products = data?.products || {}

    return (
        <>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={"space-around"} mt='5' mx='auto' w={{ "sm": "95%", "md": "760px", "xl": '1200px' }}>
                    {products &&
                        products.length > 0 ?
                        (products.map((product) => (
                            <Card border={'1px'} borderColor={'blackAlpha.300'} w={{ "sm": "100%", "md": "360px" }} mb='5' _hover={{'base': {}, 'md': { boxShadow: '2xl', width: '385px' }}} transition={'0.3s'} key={product._id}>
                                <Link href={`/products/${product._id}`} _hover={'none'}>
                                    <Center><CardHeader fontSize={'32px'} pb='0'>{product.name}</CardHeader></Center>
                                    <CardBody>
                                        <Image src={product.images ? `images/product/${product.thumbnail}` : ''} w='300px' h='300px' mx='auto'></Image>
                                        <Center><Text fontSize={'18px'} mt='3'>${product.price}</Text></Center>
                                    </CardBody>
                                </Link>
                            </Card>
                        ))) : (
                            <>
                                <Text>Nothing Here Yet...</Text>
                            </>
                        )
                    }
                </Flex>
            )}
        </>
    )
}

export default Store
