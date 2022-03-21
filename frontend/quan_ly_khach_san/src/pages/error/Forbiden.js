import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Forbiden() {

  const navigate = useNavigate();

  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Error 403
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Forbiden
      </AlertDescription>
      <a href="#" onClick={() => navigate(-2)} style={{color: 'blue'}}>Go Back</a>
    </Alert>
  );
}

export default Forbiden