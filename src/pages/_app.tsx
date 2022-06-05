import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { privateApi } from "../services/api";
import { useAtom } from "jotai";
import userAtom from "../atoms/userAtom";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await privateApi.get("/api/v1/auth/me");
        setUser(res.data.result.user);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <ToastContainer theme="dark" />
    </>
  );
}

export default MyApp;
