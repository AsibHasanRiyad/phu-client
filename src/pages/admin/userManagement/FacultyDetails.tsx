import { useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../redux/features/admin/userManagement.api";

export const FacultyDetails = () => {
  const { facultyId } = useParams();
  console.log(facultyId);
  const { data: facultyData, isFetching } = useGetSingleFacultyQuery(facultyId);
  console.log(facultyData);
  return <div>Faculty Details {facultyId} </div>;
};
