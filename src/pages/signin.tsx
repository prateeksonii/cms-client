import { useAtom } from "jotai";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import userAtom from "../atoms/userAtom";
import PublicPage from "../hoc/PublicPage";
import { publicApi } from "../services/api";

type SigninFormValues = {
  email: string;
  password: string;
};

const SigninPage: NextPage = () => {
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SigninFormValues> = async (values) => {
    try {
      const res = await publicApi.post("/api/v1/auth/signin", {
        email: values.email,
        password: values.password,
      });

      toast.success("Logging in...");

      setUser(res.data.result.user);
      localStorage.setItem("cmsToken", res.data.result.accessToken);

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      // toast.error(err.response.)
    }
  };

  return (
    <PublicPage>
      <div className="md:grid md:grid-cols-[2fr_3fr]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Let&#39;s get started</h1>

          <form
            className="my-8 w-3/5 space-y-4 text-lg"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label htmlFor="email" className="flex flex-col gap-1">
                Email address
                <input
                  type="email"
                  className="rounded-md bg-slate-600 p-2"
                  placeholder="yourid@email.com"
                  {...register("email", {
                    required: "Email cannot be empty",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <div className="mt-1 text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="flex flex-col gap-1">
                Password
                <input
                  type="password"
                  className="rounded-md bg-slate-600 p-2"
                  placeholder="A strong password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password should contain more than 4 characters",
                    },
                  })}
                />
              </label>
              {errors.password && (
                <div className="mt-1 text-red-500">
                  {errors.password.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="!my-8 w-full rounded-md bg-blue-500 py-3 px-6"
            >
              Continue
            </button>

            <Link href="/signin" passHref>
              <a>
                Already registered?{" "}
                <span className="underline underline-offset-4">Signin</span>
              </a>
            </Link>
          </form>
        </div>
        <div className="relative h-screen w-full">
          <Image
            src="/assets/images/signup.webp"
            alt="signup background"
            layout="fill"
          />
        </div>
      </div>
    </PublicPage>
  );
};

export default SigninPage;
