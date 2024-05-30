import React from 'react'
// import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../Context/ChatProvider'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import { Tooltip, Avatar } from '@chakra-ui/react'


const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <div style={{ overflowX: "hidden", height: "100%", overflowY: "auto", }}>
            {
                messages && messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip
                                    label={m.sender.name}
                                    placement="bottom-start"
                                    hasArrow>
                                    <Avatar
                                        // mt={"7px"}
                                        // ml={1}
                                        size={"sm"}
                                        name={m.sender.name}
                                        src='m.sender.pic'
                                    />
                                </Tooltip>
                            )}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? "#0094ff" : "#23262f"}`,
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginRight: "20px",
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 0,
                                marginBottom: "4px",
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                                fontSize: "16px"
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

export default ScrollableChat