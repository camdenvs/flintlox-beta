import React from "react";
import {
    Card,
    Link,
    CardBody,
    Text,
    CardHeader,
    Image,
    Center
} from "@chakra-ui/react";

const ProductCard = ({ product }) => {

    return (
        <Card border={'1px'} borderColor={'blackAlpha.300'} w={{ "sm": "100%", "md": "360px"}} mb='5' _hover={{ boxShadow: '2xl', width: '385px'}} transition={'0.3s'}>
            <Link href={`/product/${product._id}`} _hover={'none'}>
                <Center><CardHeader fontSize={'32px'} pb='0'>{product.name}</CardHeader></Center>
                <CardBody>
                    <Image src={`/assets/images/products/${product.image}`} w='300px' h='300px' mx='auto'></Image>
                    <Center><Text fontSize={'18px'} mt='3'>${product.price}.00</Text></Center>
                </CardBody>
            </Link>
        </Card>
    )
}

export default ProductCard