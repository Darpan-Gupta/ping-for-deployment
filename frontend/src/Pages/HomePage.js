import {
    Box,
    Container,
    Image,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import React, { useEffect } from 'react'

import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import { useHistory } from "react-router-dom";

function HomePage() {

    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) history.push("/chats");
    }, [history]);


    return (
        <Box
            display={"flex"}
            justifyContent={"center"}
            backgroundColor={"#23262f"}
            maxH={"100vh"}
            height={"100vh"}
        // alignContent={"center"}
        >
            <Box
                bg={"#3b3e46"}
                display={{ base: "none", md: "flex" }}
                minH={"90vh"}
                minW={"50%"}
                my={6}
                borderRadius={25}
                alignContent={"center"}
            // maxW={"50vh"}
            >
                <Box boxSize='xs' m={"auto"}>
                    <Image src='/ping_logo.png' alt='PING_LOGO' />
                </Box>
            </Box>
            <Container maxW="sm" centerContent mx={0} mt={"10"} >

                <Box
                    display="flex"
                    justifyContent="center"
                    // p={3}
                    bg={"#23262f"}
                    w="100%"
                    m="20px 0 15px 0"
                    borderRadius="lg"
                >
                    <Text fontSize="5xl">
                        PING
                    </Text>

                </Box>

                <Box bg={"#23262f"} w="100%" p={4} borderRadius="lg" overflowY='auto' color={"#e1e4e3"}>
                    <Tabs isFitted variant="soft-rounded" size={"sm"}>
                        <TabList mb="1em" >
                            <Tab >Login</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>

                        <TabPanels >
                            <TabPanel >
                                <Login />
                            </TabPanel>
                            <TabPanel >
                                <Signup />
                            </TabPanel>
                        </TabPanels>


                    </Tabs>
                </Box>

            </Container >
        </Box>

    )
}

export default HomePage