import "../styles/globals.css";
import { useState, useEffect } from "react";
import liff from "@line/liff";
import useSWRMutation from "swr/mutation";

async function sendData<T>(url: string, { arg }: { arg: T }) {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

function MyApp({ Component, pageProps }) {
  const { trigger } = useSWRMutation("/api/customer", sendData);
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    console.log("start liff.init()...");
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      .then(() => {
        console.log("liff.init() done");
        setLiffObject(liff);

        //プロフィール情報を取得して送信
        liff.getProfile().then((profile) => {
          trigger({ userId: profile.userId, name: profile.displayName });
        });
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.liffId) {
          console.info(
            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.",
          );
        }
        setLiffError(error.toString());
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
