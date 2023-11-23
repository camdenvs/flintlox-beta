import React, { useState, useEffect } from 'react'
import { Box, Heading, Image, Link, Text } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

const Home = () => {


    const useCountdown = (targetDate) => {
        const countDownDate = new Date(targetDate).getTime();

        const [countDown, setCountDown] = useState(
            countDownDate - new Date().getTime()
        );

        useEffect(() => {
            const interval = setInterval(() => {
                setCountDown(countDownDate - new Date().getTime());
            }, 1000);

            return () => clearInterval(interval);
        }, [countDownDate]);

        return getReturnValues(countDown);
    };

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        return [days, hours, minutes, seconds];
    };

    const CountdownTimer = ({ targetDate }) => {
        const [days, hours, minutes, seconds] = useCountdown(targetDate);

        if (days + hours + minutes + seconds <= 0) {
            return 'RIGHT NOW!';
        } else {
            return <Text display={'inline'} textTransform={'uppercase'}><Text display={'inline'} fontWeight={'700'}>{days}</Text> days <Text display={'inline'} fontWeight={'700'}>{hours}</Text> hours <Text display={'inline'} fontWeight={'700'}>{minutes}</Text> minutes <Text display={'inline'} fontWeight={'700'}>{seconds}</Text> seconds</Text>
        }
      };

const countdownDate = CountdownTimer({ targetDate: '2023-12-01T00:00:00-07:00'})

return (
    <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        position={'relative'}
        zIndex={'1'}
        isolation={'isolate'}
    >
        <Image width={{ "base": "100%", "md": "95%" }} height={'90vh'} objectFit={'cover'} src='/images/flintlox_drop.jpg' />
        <Box
            margin={'25px 0px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
        >
            <Heading textTransform={'uppercase'} textAlign={'center'}>New things to come</Heading>
            <Text display={{'base': 'none', 'md': 'inline'}}>Next product drop:</Text> {countdownDate}
        </Box>
        <Box
            flexDirection={{ 'base': 'column', 'md': 'row' }}
            width={'100%'}
            padding={'10px'}
            display={'flex'}
            justifyContent={'space-evenly'}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                margin={{ 'base': '10px' }}
            >
                <Link as={ReactLink} to='/store/wallets'><Image src={'https://placehold.co/240x160'} /></Link>
                <Text width={{ "base": '80%', "md": '200px' }} textAlign={'center'}>Shop our currently available wallets</Text>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                margin={{ 'base': '10px' }}
            >
                <Link as={ReactLink} to='/store/bags'><Image src='https://placehold.co/240x160' /></Link>
                <Text width={{ "base": '80%', "md": '200px' }} textAlign={'center'}>Shop our currently available bags</Text>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                margin={{ 'base': '10px' }}
            >
                <Link as={ReactLink} to='/store'><Image src='https://placehold.co/240x160' /></Link>
                <Text width={{ "base": '80%', "md": '200px' }} textAlign={'center'}>Shop our currently available keychains, trays, notebooks, and more.</Text>
            </Box>
        </Box>
    </Box>
)
}

export default Home