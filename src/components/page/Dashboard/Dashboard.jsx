import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {
    const item =
        <>
            <Link to='/dashboard/allusers'><li><a>All User</a></li></Link>
            <Link to='/dashboard/selectedClass'><li><a>Selected class</a></li></Link>
            <Link to='/dashboard/addclass'><li><a>Add class</a></li></Link>
            <Link to='/dashboard/instructorClass'><li><a>Instructor my Class</a></li></Link>
            <Link to='/dashboard/manageClass'><li><a>admin Manage Class</a></li></Link>
          
        </>
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
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