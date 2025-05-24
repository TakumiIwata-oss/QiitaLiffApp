import Head from "next/head";
import { useState } from "react";
import liff from "@line/liff";
import { Modal } from "@mui/material";
import Button from "../components/ui/Button/Button";
import Coupon from "../components/ui/Coupon/Coupon";

export default function Home() {
  const [text, setText] = useState("ここにテキストが表示されます");
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID }).then(() => {
      liff
        .scanCodeV2()
        .then((result) => {
          if (result.value === "HONOLULU_COOKIES") {
            setText("クーポンを取得しました");
            setOpen(true);
          } else {
            setText("クーポンが取得できませんでした");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  };

  return (
    <div>
      <Head>
        <title>岩田拓巳のミニアプリ</title>
      </Head>
      <div className="home">
        <h1 className="home_title">岩田拓巳のミニアプリ</h1>
      </div>
      <div className="text-center">
        <Button
          label="二次元コードリーダー"
          onClick={() => handleClick()}
          width="w-1/2"
        />
        <h1 className="text-3xl font-medium text-center p-12">{text}</h1>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          className="flex items-center"
        >
          <div className="flex justify-center">
            <Coupon onClose={setOpen} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
