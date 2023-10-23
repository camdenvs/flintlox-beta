import React, { useState } from "react"
import { redirect, useParams } from 'react-router-dom'
import { useQuery, useMutation } from "@apollo/client"
import { useToast, Box, Button, Flex, Heading, Image, Input, Select, Text, Center, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import { QUERY_SINGLE_PRODUCT, QUERY_ME } from "../utils/queries"
import { ADD_TO_CART, REMOVE_PRODUCT } from '../utils/mutations'
import Auth from '../utils/auth'

const Product = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const { productId } = useParams()
    const { loading, error, data } = useQuery(QUERY_SINGLE_PRODUCT, {
        variables: { productId: productId }
    })
    const userData = useQuery(QUERY_ME)
    const userIsAdmin = userData.data?.me.isAdmin
    const [removeProduct] = useMutation(REMOVE_PRODUCT)
    const [addToCart] = useMutation(ADD_TO_CART)
    const product = data?.product || {}
    const toast = useToast()

    const sizes = product.sizes?.split(',') || []
    const [itemState, setItemState] = useState({ productId: productId, quantity: 1, size: sizes[0] || '' })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItemState({
            ...itemState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addToCart({
                variables: {
                    userId: Auth.getProfile().data._id,
                    productId: itemState.productId,
                    quantity: Number(itemState.quantity),
                    size: itemState.size
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

    const handleRemoveProduct = async (e) => {
        e.preventDefault()
        await removeProduct({
            variables: {productId: product._id}
        })
        redirect('/store')
    }

    return (
        <div>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <>

                    <Box mx={{ base: '50px', md: '150' }} mt='50' mb='5'>
                        <Flex flexDir={{ base: 'column', md: 'row' }}>
                            <Image
                                src={`/assets/images/products/${product.image}`}
                                alt={'Product Image'}
                                p='5'
                                border='1px'
                                borderColor={'blackAlpha.400'}
                                w={{ sm: '100%', md: '50%' }}
                            />
                            <Box mt={5} ml={{ base: '0', md: '75' }} width={{ sm: '75%', md: '100%' }}>
                                <form>
                                    <Heading fontSize={'48px'}>{product.name}</Heading>
                                    <Text fontSize={'36px'} fontWeight={600}>${product.price}</Text>
                                    {product.sizes !== '' ? (
                                        <Flex>
                                            <Text fontSize={'20px'} w={'200px'}>Select a size:</Text>
                                            <Select w={{ sm: '30%' }} value={itemState.size} name="size" onChange={handleChange}>
                                                {sizes.map((size) => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </Select>
                                        </Flex>
                                    ) : (
                                        <></>
                                    )}
                                    <Flex>
                                        <Input type='number' width={'50px'} value={itemState.quantity} step={'1'} name='quantity' onChange={handleChange} />
                                        <Button ml={3} onClick={handleFormSubmit}>Place Order</Button>
                                    </Flex>
                                    <Heading mt='5'>Description</Heading>
                                    <Text>{product.description}</Text>
                                </form>
                            </Box>
                        </Flex>
                    </Box>
                    {userIsAdmin ? (
                        <>
                            <Center><Button colorScheme="red" onClick={onOpen}>Remove Product</Button></Center>
                            <AlertDialog
                                isOpen={isOpen}
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                            Delete Product
                                        </AlertDialogHeader>

                                        <AlertDialogBody>
                                            Are you sure? You can't undo this action afterwards.
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button ref={cancelRef} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme='red' onClick={handleRemoveProduct} ml={3}>
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    )
}

export default Product