import {
    Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import '../../../App.css'

function ModalScrollCustom(props) {
  const { icon, className, content, onBtnClick, data, title, closeOnOverlayClick} = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleClick = (arg) => {
    onOpen();
    if (onBtnClick) {
      onBtnClick(arg);
    }
  }
  return (
    <>
      <Box
        ref={btnRef}
        onClick={() => handleClick(data)}
        className={className}
      >
        {icon}
      </Box>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside" // outside
        closeOnOverlayClick={closeOnOverlayClick}
      >
        <ModalOverlay />
        <ModalContent minWidth="500px">
          
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {content}
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={onClose}>Đóng</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalScrollCustom;
