import { useAtom } from "jotai";
import { useRouter } from "next/router";
import userAtom from "../atoms/userAtom";

const SuperAdminPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user] = useAtom(userAtom);

  if (!user) {
    router.replace("/signin");
  }

  if (user.role !== "SUPER_ADMIN") {
    router.replace("/dashboard");
  }

  return <>{children}</>;
};

export default SuperAdminPage;
