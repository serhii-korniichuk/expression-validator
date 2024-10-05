import { Input, InputProps } from "@chakra-ui/react";
import { FC } from "react";

export const BaseInput: FC<InputProps> = (props) => {
  return (
    <Input
      py={8}
      px={4}
      fontSize="xl"
      textAlign="center"
      variant="filled"
      {...props}
    />
  );
};
