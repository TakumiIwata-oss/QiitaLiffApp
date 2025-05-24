import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="">
      <Head>
        <title>Mahalo Living</title>
      </Head>
      <main>{children}</main>
    </div>
  );
}
