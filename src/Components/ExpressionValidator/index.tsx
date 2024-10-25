import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { showTree } from "../../Utils/buildTree.ts";
import {
  validateExpression,
  ValidationError,
} from "../../Utils/validateExpression";
import { Console } from "../Console";
import { HighlightInput } from "../HighlightInput";

export const ExpressionValidator = () => {
  const [isValidated, setIsValidated] = useState(false);

  const [expression, setExpression] = useState("");

  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    if (isValidated && errors.length === 0) {
      showTree(expression);
    }
  }, [errors.length, expression, isValidated]);

  const handleValidate = () => {
    const validationErrors = validateExpression(expression);
    setErrors(validationErrors);
    setIsValidated(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setIsValidated(false);
    setErrors([]);
    setExpression(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleValidate();
    }
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
          onKeyDown={handleKeyDown}
          isValidated={isValidated}
          isInvalid={errors && errors?.length > 0}
          highlightIndex={errors?.[0]?.position}
        />

        <Button
          size="lg"
          onClick={handleValidate}
          isDisabled={!expression || isValidated}
        >
          {"Check".toUpperCase()}
        </Button>

        <Divider mt={12} mb={6} />

        <Console errors={errors} isValidated={isValidated} />
      </Box>
    </Box>
  );
};
