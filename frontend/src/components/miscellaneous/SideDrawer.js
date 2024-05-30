import { Avatar, Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge'
import { Effect } from 'react-notification-badge'
import ChatLoading from '../ChatLoading';
import axios from 'axios';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import { AddIcon } from '@chakra-ui/icons';

function SideDrawer() {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);


    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const history = useHistory();

    const { isOpen, onOpen, onClose } = useDisclosure();


    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    }

    const toast = useToast();

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter something in search",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        }
        catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the seach results",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.post("/api/chat", { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        }
        catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };



    return (
        <div style={{ paddingTop: "5px" }}>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bg={"#23262f"}
                w={"100%"}
                // p={"5px 10px 5px 10px"}
                h={"8vh"}
                color={"white"}
                borderRadius={20}
            >
                {/* search user */}
                <Tooltip
                    label="Search Users to chat"
                    hasArrow
                    placement='bottom-end'
                >
                    <Button
                        variant={"ghost"}
                        onClick={onOpen}
                        color={"white"}
                        // ba={"black"}
                        backgroundColor={"#3b3e46"}
                        _hover={{ bg: '#3b3e46' }}
                        size={"xs"}
                        marginLeft={"2vh"}
                    >
                        <AddIcon />
                        <Text display={{ base: "none", md: "flex" }} paddingLeft={"1vh"} >New Chat</Text>
                    </Button>
                </Tooltip>

                <Text fontSize={"2xl"} >
                    PING
                </Text>

                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                            <i className="fa-solid fa-bell"></i>

                        </MenuButton>
                        <MenuList pl={2} backgroundColor={"#23262f"}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <MenuItem key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n !== notif));
                                    }}
                                    backgroundColor={"#23262f"}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New message in ${notif.chat.chatName}`
                                        : `New message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<i className="fa-solid fa-caret-down"></i>}
                            colorScheme='#3b3e46'
                        >
                            <Avatar
                                size={"xs"}
                                cursor={"pointer"}
                                name={user.name}
                                src={user.pic}
                            >
                            </Avatar>

                        </MenuButton>
                        <MenuList
                            backgroundColor={"#3b3e46"}
                        // maxHeight={"5vh"}
                        >
                            <ProfileModal user={user}
                            >
                                <MenuItem backgroundColor={"#3b3e46"} _hover={{ bg: '#2f80ed' }}  >My Profile</MenuItem>

                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler} backgroundColor={"#3b3e46"} _hover={{ bg: '#2f80ed' }} >Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent color={"white"} backgroundColor={"#23262f"}>
                    <DrawerHeader borderBottomWidth={"1px"} >Search Users</DrawerHeader>

                    <DrawerBody fontSize={"md"}>
                        <Box display={"flex"} pb={2} >
                            <Input
                                placeholder='Search by name or email'
                                mr={2}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    handleSearch();
                                }}
                            >
                            </Input>
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />

                        ) : (
                            searchResult.length > 0 ? (
                                searchResult.map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                ))
                            ) : (
                                <div>No users found.</div> // You can replace this with any message or component you want to show when searchResult is empty
                            )
                        )}
                        {/* ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )} */}
                        {loadingChat && <Spinner ml="auto" display="flex" />}
                    </DrawerBody>
                </DrawerContent>

            </Drawer>
        </div >
    )
}

export default SideDrawer