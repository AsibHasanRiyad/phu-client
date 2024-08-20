import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../redux/features/admin/userManagement.api";

const AdminDetails = () => {
  const { adminId } = useParams();
  console.log(adminId);
  const { data: adminData, isFetching } = useGetSingleAdminQuery(adminId);
  console.log(adminData);
  return <div>Admin Details {adminId} </div>;
};

export default AdminDetails;
