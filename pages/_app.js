import axios from "axios";
import Head from "next/head";
import NextApp from "next/app";
import nookies from "nookies";
import Router from "next/router";
import { ThemeProvider } from "@material-ui/core";
import { SWRConfig } from "swr";
import { useEffect, useRef } from "react";

import { AppBar } from "@/components/AppBar";
import { FeedbackProvider } from "@/components/Feedback";
import theme from "@/utils/theme";
import { verify } from "@/utils/jwt";
import "@/css/global.css";

const fetcher = (url, params) =>
  axios.get(url, { params }).then((res) => res.data.data);

function MyApp({ Component, pageProps }) {
  const feedback = useRef();
  // Handle axios errors globally
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const { data, status } = error.response;
        if (status === 401) return Router.replace("/login");
        if (data.errors) return Promise.reject(error);
        if (data.message || error.message)
          feedback.current.showSnackbar(data.message || err.message);
        return Promise.reject(error);
      },
    );
  }, []);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Next Meals</title>
      </Head>
      <SWRConfig
        value={{
          fetcher,
          errorRetryInterval: 1000 * 60,
          revalidateOnFocus: false,
          revalidateOnMount: true,
        }}
      >
        <ThemeProvider theme={theme}>
          <FeedbackProvider ref={feedback}>
            <AppBar />
            <Component {...pageProps} />
          </FeedbackProvider>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

const RolePaths = {
  regular: ["/", "/settings"],
  admin: ["/", "/settings", "/report", "/users"],
  public: ["/login", "/register"],
};
const ValidPages = new Set([
  ...RolePaths.regular,
  ...RolePaths.admin,
  ...RolePaths.public,
]);

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const appProps = await NextApp.getInitialProps(appContext);
  const { req, res } = ctx;

  // Redirect, if required, while requesting a page
  if (req && res && ValidPages.has(req.url)) {
    const cookies = nookies.get({ req });
    const cookieUser = await verify(cookies.token).catch(() => ({}));
    const role = cookieUser.role || "public";
    const paths = RolePaths[role];
    const shouldRedirect = !paths.includes(req.url);
    if (shouldRedirect) {
      if (role === "public") res.writeHead(302, { Location: "/login" });
      else res.writeHead(302, { Location: "/" });
      res.end();
    }
  }

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: {},
  };
};

export default MyApp;
