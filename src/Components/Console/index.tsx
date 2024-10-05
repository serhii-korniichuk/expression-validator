import { Box, Table, TableContainer, Tbody, Text } from "@chakra-ui/react";
import { ErrorsMessageProps } from "../../Types";
import { StatusLogs } from "../StatusLogs";

export const Console = ({ errors, isInitialState }: ErrorsMessageProps) => {
  return (
    <Box w="full" h={340}>
      <Text fontSize="xl" mb={4} px={6} pt={4} borderBottom="1px solid body">
        Console
      </Text>

      <TableContainer
        h="auto"
        maxH={290}
        borderStyle="solid"
        borderWidth="1px"
        borderRadius="md"
        overflowY="auto"
      >
        <Table variant="unstyled">
          <Tbody>
            <StatusLogs errors={errors} isInitialState={isInitialState} />
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
