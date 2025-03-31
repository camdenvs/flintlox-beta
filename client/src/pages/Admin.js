import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Heading
} from '@chakra-ui/react'

const Admin = () => {
    const [formState, setFormState] = useState({
        name: '',
        price: 0,
        stripeProductId: '',
        subcategory: '',
        thumbnail: '',
        description: '',
        variantName: '',
        variantImages: '',
        variantAvailableCount: 1
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // class Variant {
    //     constructor(name, image, stripeProductId, availableCount) {
    //         this.name = name;
    //         this.image = image;
    //         this.stripeProductId = stripeProductId;
    //         this.availableCount = availableCount;
    //     }
    // }

    // const variants = []

    return (<>
        <form>
            <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input value={formState.name} name='name' onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input value={formState.description} name='description' onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Subcategory</FormLabel>
                <Input value={formState.subcategory} name='subcategory' onChange={handleChange} />
                <FormHelperText>i.e. "wallets" or "bags"</FormHelperText>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input value={formState.price} type='number' name='price' onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Thumbnail</FormLabel>
                <Input value={formState.thumbnail} name='thumbnail' onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Stripe Product ID</FormLabel>
                <Input value={formState.stripeProductId} name='stripeProductId' onChange={handleChange} />
            </FormControl>
            <form>
                <Heading>Variants</Heading>
                <FormControl isRequired>
                    <FormLabel>Variant Name</FormLabel>
                    <Input value={formState.variantName} name='variantName' onChange={handleChange} />
                    <FormHelperText>Variant color or material</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Variant Images</FormLabel>
                    <Input value={formState.variantImages} name='variantImages' onChange={handleChange} />
                    <FormHelperText>Image URLs</FormHelperText>
                </FormControl>
            </form>
        </form>
    </>)
}

export default Admin