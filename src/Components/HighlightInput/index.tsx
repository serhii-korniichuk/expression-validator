import { Box, InputProps } from "@chakra-ui/react";
import { FC } from "react";
import { BaseInput } from "../BaseInput";
import { HighlightProps, HighlightText } from "../HighlightText";
import styles from "./styles.module.scss";

type InnerInputProps = Pick<
  InputProps,
  "placeholder" | "onChange" | "isInvalid"
> & {
  value?: string;
};

type Props = HighlightProps & InnerInputProps;

export const HighlightInput: FC<Props> = ({
  value = "",
  highlightIndex,
  ...rest
}) => {
  return (
    <Box className={styles.container}>
      <HighlightText
        className={styles.highlight}
        highlightIndex={highlightIndex}
      >
        {value}
      </HighlightText>
      <BaseInput {...rest} value={value} />
    </Box>
  );
};
