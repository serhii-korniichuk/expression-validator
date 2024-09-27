import { Box, Button, Divider, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import {
  validateExpression,
  ValidationError,
} from "../Utils/validateExpression";
import { Console } from "./Console";

export const ExpressionValidator = () => {
  const [isInitialState, setIsInitialState] = useState(true);

  const [expression, setExpression] = useState("");

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleValidate = () => {
    const validationErrors = validateExpression(expression);
    setErrors(validationErrors);
    setIsInitialState(false);
  };

  return (
    <Box
      px="10%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        minW={300}
        maxW={800}
        w="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading fontSize="2xl" textAlign="center" mb={4}>
          {"Expression validator".toUpperCase()}
        </Heading>

        <Input
          py={8}
          px={4}
          my={8}
          fontSize="xl"
          textAlign="center"
          variant="filled"
          placeholder="Insert or write the expression"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          isInvalid={errors.length > 0}
        />

        <Button size="lg" onClick={handleValidate} isDisabled={!expression}>
          {"Check".toUpperCase()}
        </Button>

        <Divider mt={12} mb={6} />

        <Console errors={errors} isInitialState={isInitialState} />
      </Box>
    </Box>
  );
};
