import type { NextPage } from "next";
import PrivatePage from "../hoc/PrivatePage";

const DashboardPage: NextPage = () => {
  return (
    <PrivatePage>
      <div>Dashboard</div>
    </PrivatePage>
  );
};

export default DashboardPage;
