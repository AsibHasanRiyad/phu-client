import CreateAdmin from "../pages/admin/CreateAdmin";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Student Management",
    children: [
      {
        name: "Student Profile",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];
