import React from "react";
import { Box, Image, Text } from "@chakra-ui/react"
import { QUERY_ORDERS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

const Account = () => {
    const userData = Auth.getProfile().data
    
    const { loading, error, data } = useQuery(QUERY_ORDERS, {
        variables: { userId: userData._id }
    })

    const orders = data?.orders || []

    return (
        <>
            <Text>Hello, {userData.username} </Text>
            <Box>
                <Box>
                    <Text>Order History</Text>
                    {loading || error ?
                        <Text>Loading...</Text> : (
                            <>
                                {orders &&
                                    orders.length > 0 ?
                                    (orders.map((order) => (
                                        <>
                                            {order.items.map((item) => (
                                                <>
                                                    <Text>{item.name}</Text>
                                                    <Image src={item.image} />
                                                </>
                                            ))}
                                            <Text>Date Ordered: {order.date_added}</Text>
                                            <Text>Status: {order.shipping_status}</Text>
                                        </>
                                    ))) : (
                                        <Text>Nothing Here Yet...</Text>
                                    )}
                            </>
                        )}
                </Box>
                <Box>
                    <Text>Browsing History</Text>
                </Box>
            </Box>
        </>)
}

export default Account;