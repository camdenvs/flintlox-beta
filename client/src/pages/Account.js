import React from "react";
import { Box, Image, Text } from "@chakra-ui/react"
import { QUERY_ORDERS, QUERY_ME } from "../utils/queries";
import { useQuery } from "@chakra-ui/react";
import Auth from "../utils/auth";

const Account = () => {
    const userQuery = useQuery(QUERY_ME, {
        variables: { userId: Auth.getProfile().data._id }
    })

    const user = userQuery.data?.me

    const orderQuery = useQuery(QUERY_ORDERS, {
        variables: { userId: userQuery.data?._id }
    })

    const orders = orderQuery.data?.orders
    
    return (
        <>
            <Text>Hello, {user.username} </Text>
            <Box>
                <Box>
                    <Text>Order History</Text>
                    {!orderQuery.loading && !orderQuery.error ? (
                        orders.map((order) => (
                            <>
                                {order.items.map((item) => (
                                    <>
                                        <Text>{item.name}</Text>
                                        <Image src={item.image}/>
                                    </>
                                ))}
                                <Text>Date Ordered: {order.date_added}</Text>
                                <Text>Status: {order.shipping_status}</Text>
                            </>
                        ))
                    ) : <Text>No Orders Yet</Text>}
                </Box>
                <Box>
                    <Text>Browsing History</Text>
                </Box>
            </Box>
        </>
    )
}

export default Account;