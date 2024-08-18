import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();
  console.log(studentId);
  const { data: studentData, isFetching } = useGetSingleStudentQuery(studentId);
  console.log(studentData);
  return <div>Student Details {studentId} </div>;
};

export default StudentDetails;
