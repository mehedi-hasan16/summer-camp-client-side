import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import useAuth from '../../../hooks/useAuth';
const NavBar = () => {
    const { user, LogOut } = useAuth(); 
    const navItem =
        <>
            <li><a>Home</a></li>
            <Link to='/instructors'><li><a>Instructors</a></li></Link>
            <li><a>Classes</a></li>
            <Link to='/dashboard'><li><a>Dashboard</a></li></Link>
            <Link to='/login'><li><a>Login</a></li></Link>
        </>

    return (
        <div>
            <div className="navbar bg-base-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <img src={logo} alt="" className='w-16' />
                    <a className="text-3xl font-semibold">Language Quest Camp</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;