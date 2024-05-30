import { Box } from "@chakra-ui/layout";
// import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();

    return (
        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            pt={2}
            bg="#23262f"
            w={{ base: "100%", md: "68%" }}
            borderRadius={15}
            // borderWidth="1px"
            h={"100%"}
        // h={"100vh"}
        // // overflow={"hidden"}
        // overflowY={"hidden"}
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};

export default Chatbox;