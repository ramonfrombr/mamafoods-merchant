import { Stack, StackProps } from '@chakra-ui/react'

export const Main = (props: StackProps) => (
  <Stack
    spacing="1rem"
    width="100%"
    maxWidth="48rem"
    // mt="-45vh"
    pt="2rem"
    px="1rem"
    {...props}
  />
)
