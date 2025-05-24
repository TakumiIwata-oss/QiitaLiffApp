import liff from "@line/liff";

export default function Complete() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-3xl font-medium p-12">
        カタログをご請求いただき
        <br />
        ありがとうございます！
      </h1>

      <p>カタログのご到着までしばしお待ちください</p>
      <p>何かご不明点あれば、お気軽にお問い合わせください！</p>
      <div className="py-12">
        <a className="underline" onClick={() => liff.closeWindow()}>
          閉じる
        </a>
      </div>
    </div>
  );
}
