import type { NextPage } from "next";
import Link from "next/link";
import PublicPage from "../hoc/PublicPage";

const IndexPage: NextPage = () => {
  return (
    <PublicPage>
      <div
        className="flex h-screen w-screen flex-col items-center justify-center bg-cover text-white"
        style={{ backgroundImage: "url(/assets/images/hero.webp)" }}
      >
        <h1 className="text-7xl font-black">Write blogs with ease.</h1>
        <Link href="/signup" passHref>
          <a className="my-16 rounded-lg bg-blue-500 px-6 py-3 text-xl">
            Get started
          </a>
        </Link>
      </div>
    </PublicPage>
  );
};

export default IndexPage;
