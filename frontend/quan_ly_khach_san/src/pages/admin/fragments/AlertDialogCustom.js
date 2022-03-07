import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

function AlertDialogCustom(props) {
  const {
    nameBtnCall,
    colorBtnCall,
    title,
    content,
    nameBtnNegative,
    nameBtnPositive,
    onBtnNegative,
    onBtnPositive,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const handleBtnNegative = () => {
    if (onBtnNegative) {
      onBtnNegative()
      onClose();
    }
  }

  return (
    <>
      <Button size="sm" colorScheme={colorBtnCall} onClick={() => setIsOpen(true)}>
        {nameBtnCall}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {content}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={handleBtnNegative}>
                {nameBtnNegative}
              </Button>
              <Button ref={cancelRef} onClick={onClose} ml={3}>
                {nameBtnPositive}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertDialogCustom;
