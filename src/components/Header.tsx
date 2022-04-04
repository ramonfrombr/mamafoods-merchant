import React from "react";
import {
	Box,
	// Stack,
	// Heading,
	Image,
	Flex,
	Link,
	Text,
	// Button,
	useDisclosure,
} from "@chakra-ui/react";
// import { HamburgerIcon } from "@chakra-ui/icons";




import logoPic from "../mama-logo140x@2x.png";

// Note: This code could be better,
// so I'd recommend you to understand how I solved and you could write yours better :)
// Good luck! 🍀

// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers
export const Header = (props) => {
	// console.log(logoPic);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleToggle = () => (isOpen ? onClose() : onOpen());

	

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			width="100%"
			wrap="wrap"
			padding={4}
			color="black"
			borderBottom="1px"
			borderColor="gray.200"
			{...props}
		>
			<Flex align="center" mr={5}>
				<Link href="/">
					<Image
						src={logoPic.src}
						// src="https://cdn.shopify.com/s/files/1/0571/3788/9442/files/Mama_Logo_Transparent_140x@2x.png"
						alt="logo mamafoods"
						width="160px"
					/>
				</Link>
				{/* <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Chakra UI
        </Heading> */}
			</Flex>

			<Flex
                style={{
                    alignItems: 'center'
                }}
            >
				<Text letterSpacing={"tighter"}>{props.vendor}</Text>

			</Flex>
		

			{/* <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Docs</Text>
        <Text>Examples</Text>
        <Text>Blog</Text>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          variant="outline"
          _hover={{ bg: "teal.700", borderColor: "teal.700" }}
        >
          Create account
        </Button>
      </Box> */}
		</Flex>
	);
};
