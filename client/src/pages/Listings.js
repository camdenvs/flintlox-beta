import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_PRODUCTS } from "../utils/queries";
import { Card, CardHeader, Flex, Image, Link, Text } from "@chakra-ui/react";

const Listings = () => {
    const { productType } = useParams()
    const { data, loading, error } = useQuery(QUERY_PRODUCTS, {
        variables: { productType: productType }
    })
    console.log(data, loading, error)

    const listings = data?.products || {}

    return (
        <>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={"space-around"} mt='5' mx='auto' w={{ "sm": "95%", "md": "760px", "xl": '1200px' }}>
                    {listings &&
                        listings.length > 0 ?
                        (listings.map((listing) => (
                            <Card border={'1px'} borderColor={'blackAlpha.300'} w={{ "sm": "100%", "md": "360px" }} mb='5' _hover={{ 'base': {}, 'md': { boxShadow: '2xl', width: '385px' } }} transition={'0.3s'} key={listing._id}>
                                <Link href={listing.listingURL} _hover={'none'} marginY={'auto'} target='_blank' rel="noopener noreferrer">
                                    <Image src={listing.image} maxW='300px' maxHeight='300px' mx='auto' marginTop={'25px'}></Image>
                                    <CardHeader fontSize={'20px'} textAlign={'center'}>{listing.name}</CardHeader>
                                </Link>
                            </Card>
                        ))) : (
                            <>
                                <Text>There are currently no available listings for the selected product type. For any specific product requests or commissions, please email admin@flintlox.com</Text>
                            </>
                        )
                    }
                </Flex>
            )
            }
        </>
    )
}

export default Listings