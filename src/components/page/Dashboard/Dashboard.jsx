import { Link, Outlet } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";
import { FaBook, FaBookMedical, FaBookReader, FaFileInvoiceDollar, FaPlusSquare, FaShoppingCart, FaUserAlt, FaUsers } from "react-icons/fa";




const Dashboard = () => {
    const[role] = useUserRole();
    console.log(role);
    const item =
        <>
        {
            role === 'admin'
                ? (<>
                    <li><Link to='/dashboard'><FaUserAlt></FaUserAlt> User info</Link></li>
                    <li><Link to='/dashboard/allusers'><FaUsers></FaUsers> All User</Link></li>
                    <li><Link to='/dashboard/manageClass'><FaBookMedical></FaBookMedical> Manage Class</Link></li>
                </>)
                : role === 'instructor'
                    ? (<>
                        <li><Link to='/dashboard'><FaUserAlt></FaUserAlt> User info</Link></li>
                        <li><Link to='/dashboard/addclass'><FaPlusSquare></FaPlusSquare> Add class</Link></li>
                        <li><Link to='/dashboard/instructorClass'><FaBookReader></FaBookReader> My Class</Link></li>
                    </>)
                    :
                    (<>
                        <li><Link to='/dashboard'><FaUserAlt></FaUserAlt> User info</Link></li>
                        <li><Link to='/dashboard/selectedClass'><FaShoppingCart/> Selected class</Link></li>
                        <li><Link to='/dashboard/enrolledClasses'><FaBook/> Enrolled Classes</Link></li>
                        <li><Link to='/dashboard/paymentHistory'><FaFileInvoiceDollar></FaFileInvoiceDollar> Payment History</Link></li>
                    </>)
        }
            {/* <Link to='/dashboard/allusers'> admin All User</Link>
            <Link to='/dashboard/manageClass'>admin Manage Class</Link>
            <Link to='/dashboard/selectedClass'>student Selected class</Link>
            <Link to='/dashboard/enrolledClasses'>student Enrolled Classes</Link>
            <Link to='/dashboard/addclass'>instructor Add class</Link>
            <Link to='/dashboard/instructorClass'>Instructor my Class</Link> */}
        </>
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {item}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;