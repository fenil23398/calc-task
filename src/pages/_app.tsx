import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { getCustomTheme } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={getCustomTheme()}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
