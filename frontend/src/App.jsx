import { Text, Container, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/userGrid";
import { useState, useEffect } from "react";

export const BASE_URL = "http://127.0.0.1:5000/api";

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(BASE_URL + "/friends");
        const data = await res.json();
        console.log('Fetched Users:', data); // Debugging log
        setUsers(data); // Update the state with fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the function to fetch users on mount
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  

  return (
    <Stack minH={"100vh"}>
      <Navbar setUsers={setUsers} />
      <Container maxW={"1200px"} my={4}>
        <Text 
          fontSize={{ base: "3xl", md: "50px" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
            My Friends
          </Text>
          🚀
        </Text>

        <UserGrid users={users} setUsers={setUsers} />
      </Container>
    </Stack>
  );
}

export default App;
