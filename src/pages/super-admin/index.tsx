import { NextPage } from "next";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { privateApi } from "../../services/api";

const SuperAdminDashboard: NextPage = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("get-readers", async () => {
    const res = await privateApi.get("/api/v1/users");
    return res.data.result.users;
  });

  if (isLoading) return <div>Loading users...</div>;

  const onClickAdmin = async (userId: number) => {
    try {
      await privateApi.post(`/api/v1/users/admin/${userId}`);
      toast.success("User is now an admin");
      refetch();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8 py-8">
      <div></div>
      <div>
        <h2 className="text-2xl">Users</h2>
        <div className="p-4"></div>
        {users.map((user: any) => {
          return (
            <div key={user.id} className="grid w-3/5 grid-cols-2 gap-2">
              <div>{user.email}</div>
              <button
                className="rounded-md bg-blue-500 py-2 px-4 disabled:bg-gray-600"
                disabled={user.role === "ADMIN" || user.role === "SUPER_ADMIN"}
                onClick={() => onClickAdmin(user.id)}
              >
                Make admin
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
