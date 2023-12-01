import React, {useState} from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { Box, Button, Image, Text, useToast } from "@chakra-ui/react"
import { QUERY_SINGLE_PRODUCT } from "../utils/queries"
import { ADD_TO_CART } from "../utils/mutations"

import Auth from '../utils/auth'

const Product = () => {
    const { productId } = useParams()
    const { loading, error, data } = useQuery(QUERY_SINGLE_PRODUCT, {
        variables: { productId: productId }
    })
    const product = data?.product || {}

    console.log(product)

    const [activeImage, setActiveImage] = useState(product.images ? product.images[0] : '')

    const imageSwap = (event) => {
        var clickedImage = event.target.src
        setActiveImage(clickedImage)
    }

    const [addToCart] = useMutation(ADD_TO_CART)
    const toast = useToast()
    const [itemState, setItemState] = useState({ productId: productId, quantity: 1 })


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addToCart({
                variables: {
                    userId: Auth.getProfile().data._id,
                    productId: itemState.productId,
                    quantity: Number(itemState.quantity)
                }
            })
            window.location.reload(false)
        }
        catch (e) {
            toast({
                title: `Couldn't add to cart.`,
                description: `Make sure you are logged in.`,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
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
                                    <Image src={image} padding={'15px 0px'} onClick={imageSwap} key={image}/>
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
                            <Button width={'120px'} onClick={handleFormSubmit}>Add to Cart</Button>
                            <Text paddingLeft={'10px'}>{product.availableCount} available</Text>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Product