import type { NextPage } from "next";
import Image from "next/image";

const SignupPage: NextPage = () => {
  return (
    <div className="md:grid md:grid-cols-[2fr_3fr]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Let&#39;s get started</h1>

        <form></form>
      </div>
      <div className="relative h-screen w-full">
        <Image
          src="/assets/images/signup.webp"
          alt="signup background"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default SignupPage;
