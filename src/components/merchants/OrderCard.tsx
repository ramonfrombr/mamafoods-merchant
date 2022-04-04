import React from "react";

import { chakra, useColorModeValue } from "@chakra-ui/react";

import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Tag,
	Text,
} from "@chakra-ui/react";

import { Modal, ModalCloseButton, ModalOverlay } from "@chakra-ui/react";

import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/hooks";


export const OrderCard = (props) => {

    {/*
    ##### #####  ###  ##### ##### 
    #       #   ## ##   #   #     
    #####   #   #   #   #   ##### 
        #   #   #####   #   #     
    #####   #   #   #   #   ##### 
    */}

	const { isOpen, onOpen, onClose } = useDisclosure();
	const order = props.order;
	const status = order["Fulfillment Status"];


	let statusBg = "yellow.200";
	let statusColor = "yellow.800";

	if (status === "fulfilled") {
		statusBg = "green.200";
		statusColor = "green.800";
	}


    const updateOrderItemStatus = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        alert(order['Fulfillment Status']);
    }


    {/* 
    ##### ##### #   # ####  ##### ##### 
    #   # #     ##  # #   # #     #   # 
    ##### ##### # # # #   # ##### ##### 
    #  #  #     #  ## #   # #     #  #  
    #   # ##### #   # ####  ##### #   # 
    */}

	return (
		<Flex
			/*bg={useColorModeValue("#F9FAFB", "gray.600")}*/
			w="full"
            mb="5"
            mt="3"
			alignItems="center"
			justifyContent="center"
		>
            {/*
            #   # ##### ####   ###  #     
            ## ## #   # #   # ## ## #     
            # # # #   # #   # #   # #     
            #   # #   # #   # ##### #     
            #   # ##### ####  #   # ##### 
            */}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />

				<ModalContent>
					<ModalCloseButton />

					<ModalHeader>Item details</ModalHeader>

					<ModalBody>

						<Heading as="h5" size="md" mt={2}>
							Order {order["Order #"]}
						</Heading>

						<Box my="2" justifyContent="center">
							<Box
								mt="1"
								as="h4"
								lineHeight="tight"
								color="gray.500"
								fontSize="sm"
							>
								Item name
							</Box>
							<Box as="span" color="gray.900">
								{order["Name"]}
							</Box>
						</Box>

						<Divider />

						<Box my="2" justifyContent="center">
							<Box
								mt="1"
								as="h4"
								lineHeight="tight"
								color="gray.500"
								fontSize="sm"
							>
								Pickup
							</Box>
							<Box as="span" color="gray.900">
								{props.deliveryDate && (
									<>
										{props.deliveryDate}&nbsp;{props.deliveryTime}
									</>
								)}
							</Box>
						</Box>

						<Divider />

						<Box my="2" justifyContent="center">
							<Box
								mt="1"
								as="h4"
								lineHeight="tight"
								color="gray.500"
								fontSize="sm"
							>
								Item quantity
							</Box>
							<Box as="span" color="gray.900">
								{order["Quantity"]}
							</Box>
						</Box>

						<Divider />

						<Box my="2" justifyContent="center">
							<Box
								mt="1"
								as="h4"
								lineHeight="tight"
								color="gray.500"
								fontSize="sm"
							>
								Item price
							</Box>
							<Box as="span" color="gray.900">
								$ {order["Price"]}
							</Box>
						</Box>

						<Divider />

						<Box my="2" justifyContent="center">
							<Box
								mt="1"
								as="h4"
								lineHeight="tight"
								color="gray.500"
								fontSize="sm"
							>
								{"Item fulfillment status"}
							</Box>
							<Box as="span" color="gray.900">
								<Tag mt={1}>{order["Fulfillment Status (from Order)"][0]}</Tag>
							</Box>
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

            {/*
            #####  ###  ##### ####  
            #     ## ## #   # #   # 
            #     #   # ##### #   # 
            #     ##### #  #  #   # 
            ##### #   # #   # ####  
            */}
			<Box
				mx="auto"
				ml={0}
				mr={0}
				px={4}
				py={4}
				w={"100%"}
				rounded="lg"
				shadow="md"
				onClick={onOpen}
				bg={useColorModeValue("white", "gray.800")}
                cursor='pointer'
				_hover={{ shadow: "xl" }}
			>


                {/*
                #   #  ###  #   # ##### 
                ##  # ## ## ## ## #     
                # # # #   # # # # ##### 
                #  ## ##### #   # #     
                #   # #   # #   # ##### 
                */}
				<Box mt={2}>
					<chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
                        <chakra.span
                            bg={useColorModeValue("#887662", "gray.800")}
                            pl={2}
                            pr={2}
                            pt={1}
                            pb={1}
                            color='white'
                            fontWeight='bold'
                            borderRadius='10px'
                            mr='2'
                        >
                            {order["Quantity"]} &#215;
                        </chakra.span>

                        <chakra.span
                            color='black'
                            fontSize='18px'
                        >
                            {order["Name"]}
                        </chakra.span>
					
					</chakra.p>
				</Box>

                {/*
                ##### #   # ##### ##### 
                  #   ##  # #     #   # 
                  #   # # # ##### #   # 
                  #   #  ## #     #   # 
                ##### #   # #     ##### 
                */}
				<Flex justifyContent="space-between" alignItems="center" mt={4}>

					<chakra.span
						color={useColorModeValue("brand.600", "brand.400")}
					>
						{order["Quantity"]} units &bull;{" "} ${order["Price"]} ( = ${(order['Price']*order["Quantity"]).toFixed(2)})
					</chakra.span>

					<Flex alignItems="center">
						<chakra.span
							px={3}
							py={1}
							bg={statusBg}
							color={statusColor}
							fontSize="sm"
							fontWeight="700"
							rounded="md"
							_hover={{ bg: "gray.500" }}
                            onClick={updateOrderItemStatus}
						>
							{order["Fulfillment Status"]}
						</chakra.span>
					</Flex>
				</Flex>
			</Box>
		</Flex>
	);
};
