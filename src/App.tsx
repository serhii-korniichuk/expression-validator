import { ChakraProvider } from "@chakra-ui/react";
import { ExpressionValidator } from "./Components/ExpressionValidator";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ExpressionValidator />
    </ChakraProvider>
  );
}

export default App;
