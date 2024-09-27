import { ComponentWithAs, Icon, IconProps, Td, Tr } from "@chakra-ui/react";

type Props = {
  icon: ComponentWithAs<"svg", IconProps>;
  iconColor?: string;
  firstMessage?: string;
  secondMessage?: string;
};

export const MessageRow = ({
  icon,
  iconColor,
  firstMessage = "",
  secondMessage = "",
}: Props) => (
  <Tr display="flex" alignItems="center">
    <Td pr="0" display="flex" alignItems="center">
      <Icon as={icon} color={iconColor} />
    </Td>
    <Td pr="0" display="flex" alignItems="center">
      {firstMessage}
    </Td>
    <Td display="flex" alignItems="center">
      {secondMessage}
    </Td>
  </Tr>
);
