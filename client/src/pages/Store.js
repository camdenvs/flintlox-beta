import React, { useState } from "react"
import { useToast, Box, Button, Center, Flex, Select, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, FormErrorMessage, FormHelperText, Textarea } from '@chakra-ui/react'

import { useQuery, useMutation } from "@apollo/client"
import { useParams } from "react-router-dom"
import { QUERY_ME, QUERY_PRODUCTS } from "../utils/queries"
import { CREATE_PRODUCT } from "../utils/mutations"

import ProductCard from "../components/ProductCard"

const Store = () => {
    const [ formState, setFormState ] = useState({ image: '', name: '', description: '', price: '', sizes: '', category: 'apparel' })
    // const [ fileState, setFileState ] = useState()
    const { category } = useParams() || {}
    const toast = useToast()
    const userData = useQuery(QUERY_ME)
    const userIsAdmin = userData.data?.me.isAdmin

    const { data } = useQuery(QUERY_PRODUCTS, {
        variables: { category: category }
    })

    const products = data?.products
    const btnRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [createProduct] = useMutation(CREATE_PRODUCT)
    // const [uploadFile] = useMutation(UPLOAD_FILE)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handlePriceChange = (value) => {
        setFormState({
            ...formState,
            price: value,
        });
    }

    // const handleFileChange = async (event) => {
    //     const { name, value } = event.target
    //     const file = event.target.files[0]
    //     setFormState({
    //         ...formState,
    //         [name]: value
    //     });
    //     setFileState(
    //         file
    //     )
    //     // const { data } = await uploadFile({
    //     //     variables: {
    //     //         file
    //     //     }
    //     // })
    //     // console.log(data)
    // }

    const handleFormSubmit = async () => {
        try {
            // var { data } = await uploadFile({
            //     variables: {
            //         filename: fileState.name
            //     }
            // })
            // console.log(data)

            await createProduct({
                variables: {
                    ...formState
                }
            })
            toast({
                title: `Product created!`,
                description: `${formState.name} has been created.`,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            window.location.assign('/store')
        } catch (err) {
            console.log(err)
            toast({
                title: `There was an error in creating your product`,
                description: `Please check all fields`,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }

    return (
        <Box>
            {userIsAdmin ? (
                <>
                <Center><Button ref={btnRef} onClick={onOpen} border={'0'} w='55%' boxShadow={'lg'} mt='5' bgColor={'green.300'} color={'white'} textShadow={'1px 1px black'} _hover={{ bgColor: 'green.400' }}>Add New Product</Button></Center>
                <Modal
                    onClose={onClose}
                    finalFocusRef={btnRef}
                    isOpen={isOpen}
                    scrollBehavior={"inside"}
                    size={'lg'}
                >
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader><Center>Add New Product</Center></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form>
                                {/* <FormControl mb={2}>
                                    <FormLabel>Product Image</FormLabel>
                                    <input type='file' name='image' value={formState.image} onChange={handleFileChange} id="image" />
                                </FormControl> */}
                                <FormControl isInvalid={(formState.name === '')} isRequired>
                                    <FormLabel>Product Name</FormLabel>
                                    <Input name='name' value={formState.name} onChange={handleChange} />
                                    <FormErrorMessage>Name required</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={(formState.description === '')} isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea name='description' value={formState.description} onChange={handleChange}/>
                                    <FormErrorMessage>Description required</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={(formState.price === '')} isRequired>
                                    <FormLabel>Price</FormLabel>
                                    <Input type='number' name='price' value={formState.price} onChange={(e) => handlePriceChange(Number(e.target.value))}/>
                                    <FormHelperText>Please enter a whole number.</FormHelperText>
                                    <FormErrorMessage>Price required</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Category</FormLabel>
                                    <Select name='category' value={formState.category} onChange={handleChange}>
                                        <option value='apparel'>Apparel</option>
                                        <option value='action-figures'>Action Figures</option>
                                        <option value='trading-cards'>Trading Cards</option>
                                        <option value='art'>Art</option>
                                        <option value='other'>Other</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Multiple Sizes? If no, leave blank.</FormLabel>
                                    <Input name='sizes' value={formState.sizes} onChange={handleChange} />
                                    <FormHelperText>Please seperate sizes by commas.</FormHelperText>
                                    <FormHelperText>Example: Men's Large,Men's Medium,Men's Small</FormHelperText>
                                </FormControl>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleFormSubmit} mr='3' bgColor={'green.300'} color={'white'} _hover={{ bgColor: 'green.400' }}>Submit</Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        ) :
            <></>
        }
            <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={"space-around"} mt='5' mx='auto' w={{ "sm": "95%", "md": "760px", "xl": '1200px'}}>
                {products &&
                    products.length > 0 ?
                    (products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))) : (
                        <>
                            <Text>Nothing Here Yet...</Text>
                        </>
                    )  
                }
            </Flex>
        </Box>
    )
}

export default Store
