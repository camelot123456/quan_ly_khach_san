import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
} from "@chakra-ui/react";

function ModalServiceCustom() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" colorScheme="blue" onClick={onOpen}>
        Thêm
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dịch vụ</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Ảnh</Th>
                  <Th>Tên</Th>
                  <Th>Số lượng</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Image
                      boxSize="50px"
                      objectFit="cover"
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                    />
                  </Td>
                  <Td>sssssssssss</Td>
                  <Td>
                    <NumberInput size="xs" maxW={16} defaultValue={0} min={0}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Tổng</Th>
                  <Th></Th>
                  <Th>2</Th>
                </Tr>
              </Tfoot>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button colorScheme="blue">Cập nhập</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalServiceCustom;
