import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_PRODUCTS, QUERY_ME, QUERY_PRUDUCT_TYPE } from "../utils/queries";
import { CREATE_PRODUCT, REMOVE_PRODUCT } from "../utils/mutations";
import { Box, Button, Card, CardHeader, Flex, Image, Link, Text, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalFooter } from "@chakra-ui/react";
import Auth from '../utils/auth'
import { FaTrash } from "react-icons/fa";

const Listings = () => {
    const { productTypeId } = useParams()
    const { data, loading, error } = useQuery(QUERY_PRODUCTS, {
        variables: { productType: productTypeId }
    })

    const listings = data?.products || {}

    const me = useQuery(QUERY_ME)
    const productType = useQuery(QUERY_PRUDUCT_TYPE, {
        variables: { productType: productTypeId }
    })

    const [formState, setFormState] = useState({
        name: '',
        listingURL: '',
        image: '',
        productType: productTypeId
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const [createListing] = useMutation(CREATE_PRODUCT)
    const [removeListing] = useMutation(REMOVE_PRODUCT)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await createListing({
                variables: {
                    ...formState
                },
            });
            onClose()
            window.location.reload()
        }
        catch (e) {
            console.log(e)
        }
    };

    const handleRemoveListing = async (event) => {
        event.preventDefault()
        const productId = event.target.value
        try {
            console.log(event.target)
            await removeListing({
                variables: {
                    productId
                }
            })
            window.location.reload()
        }
        catch (e) {
            console.log(e)
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {Auth.loggedIn() && me.data?.me.isAdmin ? (
                <>
                    <Box width={'100%'} display={'flex'}>
                        <Button marginX={'auto'} marginTop={'20px'} onClick={onOpen}>Add Listing</Button>
                    </Box>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader textAlign={'center'}>Add New Listing</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                            <form>
                                <FormControl isRequired>
                                    <FormLabel>Listing Name</FormLabel>
                                    <Input value={formState.name} name='name' onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Listing URL</FormLabel>
                                    <Input value={formState.listingURL} name='listingURL' onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Image Address</FormLabel>
                                    <Input value={formState.image} name='image' onChange={handleChange} />
                                </FormControl>
                            </form>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="blue" onClick={handleFormSubmit}>Submit</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            ) : (<></>)}
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={"space-around"} mt='5' mx='auto' w={{ "sm": "95%", "md": "760px", "xl": '1200px' }}>
                    {listings &&
                        listings.length > 0 ?
                        (listings.map((listing) => (
                            <Card border={'1px'} borderColor={'blackAlpha.300'} w={{ "sm": "100%", "md": "360px" }} mb='5' _hover={{ 'base': {}, 'md': { boxShadow: '2xl', width: '385px' } }} transition={'0.3s'} key={listing._id}>
                                {Auth.loggedIn() && me.data?.me.isAdmin ? (<Button colorScheme="red" onClick={handleRemoveListing} value={listing._id}><FaTrash onClick={handleRemoveListing} value={listing._id}/></Button>) : (<></>)}
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