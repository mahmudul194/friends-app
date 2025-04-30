import {Input, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Button, Radio, RadioGroup,ModalFooter, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {BiAddToQueue} from "react-icons/bi"
import { BASE_URL } from '../App';

const CreateUserModal = ({setUsers}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name:"",
    role:"",
    description:"",
    gender:"",
  });
  const toast = useToast()
  const handleCreateUser = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
  
      toast({
        status: "success",
        title: "yeyy!!",
        description: "Friend created successfully",
        duration: 2000,
        position: "top-center",
      });
  
      onClose();
      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "",
      });
     
      const updatedRes = await fetch(BASE_URL + "/friends");
      const updatedData = await updatedRes.json();
      setUsers(updatedData);
      
    } catch (error) {
      toast({
        status: "error",
        title: "An error occurred",
        description: error.message,
        duration: 3000,
        position:"top-center",
      });
    } finally {
      setIsLoading(false);
     
    }
  };
  
  return (
    <>
        <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
    </Button>
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay/>
      <form onSubmit={handleCreateUser}>
      <ModalContent>
        <ModalHeader>My new friend😍</ModalHeader>
        <ModalCloseButton/>

        <ModalBody pb={6}>
          <Flex alignItems={"center"} gap={4}>
            {/* Left */}
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder='name..' 
            value={inputs.name}
            onChange={(e)=>setInputs({...inputs, name: e.target.value})}
            />
          </FormControl>
          {/* Right */}
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Input placeholder='role..' 
            value={inputs.role}
            onChange={(e) => setInputs({...inputs, role:e.target.value})}
            />
          </FormControl>
          </Flex>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              resize="none"
              overflowY="hidden"
              placeholder="describe your friend"
              value={inputs.description}
              onChange={(e)=> setInputs({...inputs, description:e.target.value})}
            />
          </FormControl>
          <RadioGroup
                  mt={4}
                  value={inputs.gender}
                  onChange={(val) => setInputs({ ...inputs, gender: val })}
                >
                  <Flex gap={5}>
                    <Radio value='male'>Male</Radio>
                    <Radio value='female'>Female</Radio>
                  </Flex>
                </RadioGroup>

        </ModalBody>
        <ModalFooter>
						<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
      </ModalContent>
      </form>
    </Modal>
    </>

  );
};

export default CreateUserModal