import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { Box, VStack, Input, Button, Flex, Text, Heading } from '@chakra-ui/react';

const socket = io.connect("http://localhost:5000");

const ChatPage = () => {
    const { otherUserId } = useParams();
    const { user: currentUser } = useContext(AuthContext);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const chatEndRef = useRef(null);

    const room = currentUser ? [currentUser.userId, otherUserId].sort().join('_') : null;

    useEffect(() => {
        if (room) {
            socket.emit("join_room", room);
        }
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };
        socket.on("receive_message", handleReceiveMessage);
        return () => socket.off("receive_message", handleReceiveMessage);
    }, [room]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (currentMessage.trim() !== "" && currentUser) {
            const messageData = {
                room: room,
                author: currentUser.username,
                message: currentMessage,
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    return (
        <Flex direction="column" h="calc(100vh - 200px)" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
            <Heading size="md" p={4} borderBottomWidth="1px" bg="gray.100">Chat</Heading>
            <VStack flex={1} p={4} overflowY="auto" align="stretch" spacing={4}>
                {messageList.map((msg, index) => {
                    const isCurrentUser = msg.author === currentUser.username;
                    return (
                        <Flex key={index} justify={isCurrentUser ? 'flex-end' : 'flex-start'}>
                            <Box bg={isCurrentUser ? 'brand.800' : 'gray.100'} color={isCurrentUser ? 'white' : 'black'} px={4} py={2} borderRadius="lg" maxW="80%">
                                <Text fontWeight="bold">{msg.author}</Text>
                                <Text>{msg.message}</Text>
                            </Box>
                        </Flex>
                    );
                })}
                <div ref={chatEndRef} />
            </VStack>
            <Flex p={4} borderTopWidth="1px" as="form" onSubmit={sendMessage}>
                <Input
                    value={currentMessage}
                    placeholder="Type a message..."
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <Button type="submit" ml={4} bg="brand.500" color="white" _hover={{ bg: '#C52A73' }}>Send</Button>
            </Flex>
        </Flex>
    );
};

export default ChatPage;