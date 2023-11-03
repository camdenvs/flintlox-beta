import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Box, Button, Image, Text } from "@chakra-ui/react"
import { QUERY_SINGLE_PRODUCT } from "../utils/queries"

const Product = () => {
    const { productId } = useParams()
    const { loading, error, data } = useQuery(QUERY_SINGLE_PRODUCT, {
        variables: { productId: productId }
    })
    const product = data?.product || {}

    var activeImage = 'https://placehold.co/400x500'

    const imageSwap = (event) => {
        var clickedImage = event.target.src
        activeImage = clickedImage
    }

    return (
        <>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <Box
                    display={'flex'}
                    justifyContent={'space-evenly'}
                    position={'relative'}
                    zIndex={'1'}
                    isolation={'isolate'}
                >
                    <Box width={'60%'}>
                        <Text textAlign={'center'} paddingTop={'35px'}>{product.name}</Text>
                        <Box display={'flex'} justifyContent={'space-evenly'}>
                            <Box>
                                {product.images.map((image) => (
                                    <Image src={image} padding={'15px 0px'} onClick={imageSwap}/>
                                ))}
                            </Box>
                            <Image src={activeImage} />
                        </Box>
                    </Box>
                    <Box width={'30%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'}>
                        <Text paddingTop={'35px'} fontWeight={'600'} fontSize={'24px'}>Description</Text>
                        <Text paddingTop={'15px'} height={'100%'}>
                            {product.description}
                        </Text>
                        <Box paddingBottom={'35px'}>
                            <Button width={'120px'}>Add to Cart</Button>
                            <Text paddingLeft={'10px'}>{product.availableCount} available</Text>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Product