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
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: 'allusers',
                        element: <AllUser></AllUser>
                    },
                    {
                        path: 'selectedClass',
                        element: <SelectedClasses></SelectedClasses>
                    },
                    {
                        path: 'addclass',
                        element: <AddClass></AddClass>
                    }
                ]
            }
        ]


    },
]);

export default router;