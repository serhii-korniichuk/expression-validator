import { CheckIcon, InfoOutlineIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { ErrorsMessageProps } from "../Types";
import { MessageRow } from "./MessageRow";

const ErrorMessages = ({ errors }: Pick<ErrorsMessageProps, "errors">) => {
  return (
    <>
      {errors?.map((error, index) => {
        const firstMessage =
          typeof error.position === "number"
            ? `Position: ${error.position + 1}`
            : "";
        return (
          <MessageRow
            key={index}
            icon={WarningTwoIcon}
            iconColor="red.500"
            firstMessage={firstMessage}
            secondMessage={error.message}
          />
        );
      })}
    </>
  );
};

export const Logs = ({ errors, isInitialState }: ErrorsMessageProps) => {
  if (isInitialState) {
    return (
      <MessageRow
        icon={InfoOutlineIcon}
        iconColor="grey.500"
        firstMessage="Expression is not validated"
      />
    );
  }

  if (errors?.length) {
    return <ErrorMessages errors={errors} />;
  }

  return (
    <MessageRow
      icon={CheckIcon}
      iconColor="green.500"
      firstMessage="Expression is correct"
    />
  );
};
