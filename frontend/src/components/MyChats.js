import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Avatar, Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState(" ");

    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        // console.log(user._id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            // console.log(data);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            backgroundColor={"#23262f"}
            minW={{ base: "100%", md: "31%" }}
            borderRadius={15}
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "20px", md: "30px" }}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"

            // overflowY="auto"
            >
                My Chats
                <GroupChatModal>
                    <Button
                        display="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                        size={"xs"}
                    >
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                w="100%"
                // h="100%"
                // borderRadius="lg"
                // overflowY="hidden"
                overflowY="auto"
            >
                {chats ? (
                    <Stack w={"100%"}>
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "#3b3e46" : "#23262f"}
                                color={"white"}
                                px={3}
                                py={2}
                                minW={"100%"}
                                borderRadius="lg"
                                key={chat._id}
                                display={"flex"}
                            >
                                <Avatar
                                    mt={"7px"}
                                    mr={1}
                                    size={"sm"}
                                    // name={m.sender.name}
                                    src={chat.isGroupChat ? "/group_avatar_image.png" : chat.users[0]._id === user._id ? chat.users[1].pic : chat.users[0].pic}
                                />
                                <Box
                                    paddingLeft={"10px"}
                                    w="100%"
                                >

                                    <Text
                                        fontSize={"20px"}
                                    >
                                        {!chat.isGroupChat
                                            ? getSender(loggedUser, chat.users)
                                            : chat.chatName}
                                    </Text>
                                    {chat.latestMessage && (
                                        <Text fontSize="xs">
                                            <b>{chat.latestMessage.sender.name} : </b>
                                            {chat.latestMessage.content.length > 50
                                                ? chat.latestMessage.content.substring(0, 51) + "..."
                                                : chat.latestMessage.content}
                                        </Text>
                                    )}
                                </Box>

                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    );
};

export default MyChats;