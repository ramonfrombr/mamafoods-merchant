import React from "react";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { Button, Flex } from "@chakra-ui/react";
import { Modal, ModalCloseButton, ModalOverlay } from '@chakra-ui/react';
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react';

export const CalendarModal = (props) => {
  const [calendarUrl, setCalendarUrl] = useState("");

  useEffect(() => {
    if (typeof props.url === 'string' && props.url.includes("https://airtable.com/")) {
      const pathname = props.url.split("/").pop();
      setCalendarUrl(`https://airtable.com/embed/${pathname}?backgroundColor=green&viewControls=on`);
    }
  }, [props.url]);

  const bgText = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%"><text fill="%23FF0000" x="50%" y="50%" font-family="\'Lucida Grande\', sans-serif" font-size="24" text-anchor="middle">PLACEHOLDER</text></svg>';
  const iframeStyle = {
    background: `url(${bgText}) 0px 0px no-repeat`,
    border: '1px solid #ccc'
  };

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")} w="full"
      alignItems="center" justifyContent="center"
    >
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Calendar view</ModalHeader>
          <ModalBody>
            {calendarUrl && (
              <iframe className="airtable-embed" src={calendarUrl} frameBorder="0" width="100%" height="533" style={iframeStyle}>
              </iframe>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
