import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/page/Home/Home";
import Login from "../components/page/Login/Login";
import Signup from "../components/page/Signup/Signup";
import InstructorsPage from "../components/page/InstructorsPage/InstructorsPage";
import Dashboard from "../components/page/Dashboard/Dashboard";
import AllUser from "../components/page/Dashboard/AllUser/AllUser";
import ClassesPage from "../components/page/ClassesPage/ClassesPage";
import PrivateRoute from "./PrivateRoute";
import SelectedClasses from "../components/page/Dashboard/SelectedClasses/SelectedClasses";
import AddClass from "../components/page/Dashboard/AddClass/AddClass";
import InstructorClass from "../components/page/Dashboard/InstructorClass/InstructorClass";
import ManageClass from "../components/page/Dashboard/ManageClass/ManageClass";
import EnrolledClasses from "../components/page/Dashboard/EnrolledClasses/EnrolledClasses";
import Payment from "../components/page/Dashboard/Payment/Payment";
import PaymentHistory from "../components/page/Dashboard/PaymentHistory/PaymentHistory";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import UserInfo from "../components/page/UserInfo/UserInfo";
import NotFound from "../components/page/NotFound/NotFound";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/classes',
                element:<ClassesPage></ClassesPage>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/instructors',
                element: <InstructorsPage></InstructorsPage>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: '',
                        element: <PrivateRoute><UserInfo></UserInfo></PrivateRoute>
                    },
                    {
                        path: 'allusers',
                        element: <AdminRoute><AllUser></AllUser></AdminRoute>
                    },
                    {
                        path: 'selectedClass',
                        element: <PrivateRoute><SelectedClasses></SelectedClasses></PrivateRoute>
                    },
                    {
                        path: 'addclass',
                        element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
                    },
                    {
                        path: 'instructorClass',
                        element: <InstructorRoute><InstructorClass></InstructorClass></InstructorRoute>
                    },
                    {
                        path: 'manageClass',
                        element: <AdminRoute><ManageClass></ManageClass></AdminRoute>
                    },
                    {
                        path: 'enrolledClasses',
                        element: <PrivateRoute><EnrolledClasses></EnrolledClasses></PrivateRoute>
                    },
                    {
                        path: 'payment',
                        element: <PrivateRoute><Payment></Payment></PrivateRoute>
                    },
                    {
                        path: 'paymentHistory',
                        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
                    }
                ]
            }
        ]



    },
    {
        path:'*',
        element:<NotFound></NotFound>
    }
]);

export default router;