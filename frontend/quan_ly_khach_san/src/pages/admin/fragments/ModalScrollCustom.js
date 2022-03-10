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
  const { style, icon, className, contentPayment, onBtnClick, data} = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handlerFindReservationForTransaction = (idReservation) => {
    onOpen();
    if (onBtnClick) {
      onBtnClick(idReservation);
    }
  }
  return (
    <>
      <Box
        mt={3}
        ref={btnRef}
        onClick={() => handlerFindReservationForTransaction(data)}
        className={className}
      >
        {icon}
      </Box>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside" // outside
        >
        <ModalOverlay />
        <ModalContent>
          
          <ModalHeader>Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            {contentPayment}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalScrollCustom;
