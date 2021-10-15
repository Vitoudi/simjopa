import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import type { AppProps } from "next/app";
import Header from "../sheredComponents/header/Header";
import AuthContextProvider, { AuthContext } from "../globalContext/auth/AuthContext";
import PostCreationContextProvider from "../globalContext/PostCreationContext";
import SearchContextProvider from "../globalContext/search/SearchContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <AuthContextProvider>
        <Header />
        <PostCreationContextProvider>
          <Component {...pageProps} />
        </PostCreationContextProvider>
      </AuthContextProvider>
    </SearchContextProvider>
  );
}
export default MyApp;
