import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import {
  validateExpression,
  ValidationError,
} from "../../Utils/validateExpression";
import { Console } from "../Console";
import { HighlightInput } from "../HighlightInput";

export const ExpressionValidator = () => {
  const [isInitialState, setIsInitialState] = useState(true);

  const [expression, setExpression] = useState("");

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleValidate = () => {
    const validationErrors = validateExpression(expression);
    setErrors(validationErrors);
    setIsInitialState(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setIsInitialState(true);
    setErrors([]);
    setExpression(value);
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

        <HighlightInput
          placeholder="Insert or write the expression"
          value={expression}
          onChange={handleInputChange}
          isInvalid={errors && errors?.length > 0}
          highlightColor="blue"
          highlightIndex={errors?.[0]?.position}
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
