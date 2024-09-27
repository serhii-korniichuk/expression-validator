import { CheckIcon, InfoOutlineIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { ErrorsMessageProps } from "../Types";
import { MessageRow } from "./MessageRow";

const ErrorMessages = ({ errors }: Pick<ErrorsMessageProps, "errors">) => {
  return (
    <>
      {errors.map((error, index) => (
        <MessageRow
          key={index}
          icon={WarningTwoIcon}
          iconColor="red.500"
          firstMessage={`Position: ${error.position}`}
          secondMessage={error.message}
        />
      ))}
    </>
  );
};

export const Logs = ({ errors, isInitialState }: ErrorsMessageProps) => {
  if (isInitialState) {
    return (
      <MessageRow
        icon={InfoOutlineIcon}
        iconColor="grey.500"
        firstMessage="Expression is missing"
      />
    );
  }

  if (errors.length) {
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
