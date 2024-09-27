import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import "@fontsource/space-grotesk";
import "@fontsource/space-mono";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Space Grotesk, sans-serif",
    body: "Space Mono, sans-serif",
  },
  styles: {
    global: {
      fontFamily: "Roboto, sans-serif",
      body: {
        bg: "#101828",
      },
    },
    layerStyles: {
      base: {
        color: "#FFFFFF",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        letterSpacing: "0.2em",
      },
    },
    Input: {
      baseStyle: {
        field: {
          letterSpacing: "0.15em",
        },
      },
    },
    Button: {
      baseStyle: {
        letterSpacing: "0.1em",
      },
    },
  },
});

export default theme;
