import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { Flex, Button, CardHeader, Image, Text, Card, Link, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalFooter, Box } from '@chakra-ui/react'
import { QUERY_PRUDUCT_TYPES, QUERY_ME } from "../utils/queries"
import { CREATE_PRODUCT_TYPE } from "../utils/mutations"
import Auth from '../utils/auth'

const Gallery = () => {
    const { loading, error, data } = useQuery(QUERY_PRUDUCT_TYPES)
    const productTypes = data?.productTypes || {}

    const me = useQuery(QUERY_ME)

    const [createProductType] = useMutation(CREATE_PRODUCT_TYPE)

    const [formState, setFormState] = useState({
        name: '',
        subcategory: '',
        image: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await createProductType({
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

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {Auth.loggedIn() && me.data?.me.isAdmin ? (
                <>
                    <Box width={'100%'} display={'flex'}>
                        <Button marginX={'auto'} marginTop={'20px'} onClick={onOpen}>Add Product Type</Button>
                    </Box>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader textAlign={'center'}>Add New Product Type</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <form>
                                    <FormControl isRequired>
                                        <FormLabel>Product Type Name</FormLabel>
                                        <Input value={formState.name} name='name' onChange={handleChange} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Subcategory</FormLabel>
                                        <Input value={formState.subcategory} name='subcategory' onChange={handleChange} />
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
                    {productTypes &&
                        productTypes.length > 0 ?
                        (productTypes.map((productType) => (
                            <Card border={'1px'} borderColor={'blackAlpha.300'} w={{ "base": "92%", "md": "360px" }} mb='5' _hover={{ 'base': {}, 'md': { boxShadow: '2xl', width: '385px' } }} transition={'0.3s'} key={productType._id}>
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