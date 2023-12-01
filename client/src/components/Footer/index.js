import React, { useState } from 'react'
import { useMutation } from "@apollo/client"
import { Box, Button, Input, Text, } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { ADD_TO_NEWSLETTER } from '../../utils/mutations'

const Footer = () => {
    const [email, setEmail] = useState()
    const [addToNewsletter] = useMutation(ADD_TO_NEWSLETTER)

    const handleChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addToNewsletter({
                variables: { email: email },
            });
            setEmail('success');
        } catch (e) {
            console.log(e);
            setEmail('whoops, something went wrong...')
        }
    }

    return (
        <footer>
            <Box display='flex' width={'100%'} justifyContent={'center'} padding={'25px'}>
                <Text marginRight={'15px'} fontSize={'20px'} fontWeight={'600'}>Join our email newsletter!</Text>
                <form>
                    <Box display='grid' gridTemplateColumns={'7fr 3fr'}>
                        <Input height='35px' borderColor={'black'} type="email" value={email} onChange={handleChange} _hover={'none'} borderRightRadius={'none'}></Input>
                        <Button type='submit' height='35px' backgroundColor={'black'} color={'white'} _hover={'none'} _active={'none'} borderLeftRadius={'none'} onClick={handleFormSubmit}><FaArrowRight /></Button>
                    </Box>
                </form>
            </Box>
        </footer>
    )
}

export default Footer