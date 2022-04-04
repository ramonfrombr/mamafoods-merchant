import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from './Container'

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={3}
  >
    <ChakraLink isExternal href="mailto:support@mamafoods.com" flexGrow={1} mx={2}>
      <Button width="100%" variant="outline" colorScheme="green">
        Send us a message
      </Button>
    </ChakraLink>

    {/* <ChakraLink
      isExternal
      href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui-typescript"
      flexGrow={3}
      mx={2}
    >
      <Button width="100%" variant="solid" colorScheme="green">
        Send us a message
      </Button>
    </ChakraLink> */}
  </Container>
)
