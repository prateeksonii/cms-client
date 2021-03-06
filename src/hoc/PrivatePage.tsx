import { useAtom } from "jotai";
import { useRouter } from "next/router";
import userAtom from "../atoms/userAtom";

const PrivatePage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user] = useAtom(userAtom);

  if (!user) {
    router.replace("/signin");
  }

  console.log(user);

  if (user.role === "SUPER_ADMIN") {
    router.replace("/super-admin");
  }

  return <>{children}</>;
};

export default PrivatePage;
