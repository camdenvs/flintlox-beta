import React, { useEffect, useState } from "react"
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

    const [activeVariant, setActiveVariant] = useState('')

    const [activeImage, setActiveImage] = useState('')

    useEffect(() => {
        if (!loading & !error) {
            setActiveVariant(product.variants[0])
        }
    }, [loading, product.variants, error])

    useEffect(() => {
        if (activeVariant.images) {
            setActiveImage(`/images/product/${activeVariant.images[0]}`)
        }
    }, [loading, activeVariant, error])

    const imageSwap = (event) => {
        var clickedImage = event.target.src
        setActiveImage(clickedImage)
    }

    const variantSwap = (event) => {
        console.log(event.target.value)
        setActiveVariant(product.variants[event.target.value])
    }

    const [addToCart] = useMutation(ADD_TO_CART)
    const toast = useToast()

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addToCart({
                variables: {
                    userId: Auth.getProfile().data._id,
                    image: product.thumbnail,
                    name: `${product.name} - ${activeVariant.name}`,
                    stripeProductId: activeVariant.stripeProductId,
                    price: product.price
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
                    flexDirection={{'base': "column", 'md': "row"}}
                >
                    <Box width={{'base': '100%', 'md': '50%'}}>
                        <Text textAlign={'center'} paddingTop={'35px'}>{product.name} - {activeVariant.name}</Text>
                        <Box display={'flex'} justifyContent={'space-evenly'}>
                            {activeVariant.images ? (
                                <Box width={'10%'}>
                                    {activeVariant.images.map((image) => (
                                        <Image src={`/images/product/${image}`} padding={'15px 0px'} onClick={imageSwap} key={image} _hover={{ cursor: 'pointer' }} />
                                    ))}
                                </Box>
                            ) : (
                                <></>
                            )
                            }
                            <Box width={'80%'} padding={'15px'}><Image src={activeImage} /></Box>
                            
                        </Box>
                    </Box>
                    <Box width={{'base': '100%', 'md': '30%'}} padding={{'base': '25px', 'md': 'nonw'}} display={'flex'} flexDirection={'column'}>
                        <Text paddingTop={'35px'} fontWeight={'600'} fontSize={'24px'}>Description</Text>
                        <Text paddingTop={'15px'} paddingBottom={'20px'}>
                            {activeVariant.description}
                        </Text>
                        <Box paddingBottom={'35px'}>
                            <Button width={'120px'} onClick={handleFormSubmit}>Add to Cart</Button>
                            <Text paddingLeft={'10px'}>{activeVariant.availableCount} available</Text>
                        </Box>
                        <Box>
                            {product.variants.map((variant, index) => (
                                <Button border={'2px'} display={'inline'} margin={'5px'} onClick={variantSwap} fontWeight={'700'} key={variant.name} value={index} _hover={{'cursor': 'pointer'}}>{variant.name}</Button>
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Product