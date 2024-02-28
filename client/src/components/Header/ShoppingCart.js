import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Text,
    CardHeader,
    Card,
    CardBody,
    useToast,
    Link,
    Image
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { CHECKOUT } from '../../utils/queries'
import { useLazyQuery } from '@apollo/client'
import Auth from '../../utils/auth'
import { loadStripe } from "@stripe/stripe-js"


const ShoppingCart = ({ cart, setCart }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const [checkout, { data }] = useLazyQuery(CHECKOUT)

    const stripePromise = loadStripe(
        "pk_live_51O4QcTGBA1AtrZ4wFBOkpHqaa4WlRyR9f8mWfPba4K20J6P5tNkFqTPxbWgvC5gvGsDYIcUDqnqv0Ybe5fxpeU7a00565rG0pu"
    );

    useEffect(() => {
        if (data) {
            console.log(data)
            localStorage.setItem('sessionId', data.checkout.session)
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data, stripePromise]);

    const handleRemoveItem = async (event) => {
        const name = event.target.value
        const items = cart.items
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === name) {
                try {
                    const removedItem = items.splice(i, 1)
                    console.log(removedItem)
                    await setCart({items: items, total: cart.total - Number(removedItem[0].price)})
                }
                catch {
                    toast({
                        title: `There was an error removing that item.`,
                        description: `Reload and try again`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                    })
                }
                return
            }
        }


    }

    const handleClearCart = async () => {
        await await setCart({items: [], total: 0})
    }

    const handleCheckout = async (event) => {
        event.preventDefault()
        let stripeIds = []
        for (var i = 0; i < cart.items.length; i++) {
            stripeIds.push(cart.items[i].stripeProductId)
        }
        try {
            checkout({
                variables: {
                    items: stripeIds
                }
            })
        } catch (err) {
            console.log("Error:", err)
        }
    }

    return (
        <>
            <Link _hover='none' bg='none' _focus={{ 'bg': 'none' }} onClick={onOpen} ref={btnRef} fontWeight={'700'} textColor={'#0F0F0F'} height={'auto'} textAlign={'center'}>
                <Text>CART</Text>
            </Link>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Shopping Cart</DrawerHeader>
                    {cart.items && cart.items.length > 0 ? (
                        <>
                            <DrawerBody>
                                {cart.items &&
                                    cart.items.map((item) => (
                                        <Card key={item.name} m='3'>
                                            <CardHeader pb='1' fontSize={'20px'} fontWeight={600} display={'flex'} justifyContent={'space-between'}>
                                                <Text>{item.name}</Text>
                                                <Button fontSize={'12px'} colorScheme='red' value={item.name} onClick={handleRemoveItem}><FaTrash /></Button>
                                            </CardHeader>
                                            <CardBody pt='1'>
                                                <Image src={`/images/product/${item.image}`} />
                                                <Text fontWeight={300}>${item.price}</Text>
                                            </CardBody>
                                        </Card>
                                    ))
                                }
                                Subtotal: ${cart.total}
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                {Auth.loggedIn() ? (
                                    <Button colorScheme='blue' mr={3} onClick={handleCheckout}>
                                        Checkout
                                    </Button>
                                ) : (
                                    <Button fontSize={'12px'} colorScheme='blue' mr={3} onClick={handleCheckout}>
                                        Checkout as Guest
                                    </Button>
                                )}
                                <Button colorScheme='red' onClick={handleClearCart}>Clear</Button>
                            </DrawerFooter>
                        </>
                    ) : (
                        <DrawerBody>Your cart is empty. Head to the store!</DrawerBody>
                    )}


                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ShoppingCart
