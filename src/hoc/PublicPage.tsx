import { useAtom } from "jotai";
import { useRouter } from "next/router";
import userAtom from "../atoms/userAtom";

const PublicPage = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user] = useAtom(userAtom);

  if (user) {
    router.replace("/dashboard");
  }

  return <>{children}</>;
};

export default PublicPage;
