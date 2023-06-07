import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {
    const item =
        <>
            <Link to='/dashboard/allusers'><li><a>All User</a></li></Link>
            <li><a>Sidebar Item 2</a></li>
            <li><a>Sidebar Item 2</a></li>
            <li><a>Sidebar Item 2</a></li>
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