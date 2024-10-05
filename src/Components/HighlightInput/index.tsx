import { Box, InputProps } from "@chakra-ui/react";
import classNames from "classnames";
import { FC } from "react";
import { BaseInput } from "../BaseInput";
import { HighlightProps, HighlightText } from "../HighlightText";
import styles from "./styles.module.scss";

type InnerInputProps = Pick<
  InputProps,
  "placeholder" | "onChange" | "isInvalid" | "onKeyDown"
> & {
  value?: string;
  isValidated?: boolean;
};

type Props = HighlightProps & InnerInputProps;

export const HighlightInput: FC<Props> = ({
  value = "",
  isValidated = false,
  isInvalid,
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
      <BaseInput
        {...rest}
        className={classNames(styles.input, {
          [styles.isSuccess]: isValidated && !isInvalid,
        })}
        value={value}
        isInvalid={isInvalid}
      />
    </Box>
  );
};
