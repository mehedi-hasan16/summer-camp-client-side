import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
const NavBar = () => {
    const { user, LogOut } = useAuth();
    console.log(user);
    const [cart] = useCart();
    console.log(cart);
    const navItem =
        <>
            <Link to='/'><li><a>Home</a></li></Link>
            <Link to='/instructors'><li><a>Instructors</a></li></Link>
            <Link to='/classes'><li><a>Classes</a></li></Link>
            {
                user
                    ?
                    <>
                        <Link to='/dashboard'><li><a>Dashboard</a></li></Link>
                        <img src={user?.photoURL} alt="" className='w-8' />
                    </>
                    : ''
            }
            <li><a>{cart.length || 0}</a></li>
        </>


    const handleSignOut = () => {
        LogOut()
        .then(() => { })
        .catch(error => console.log(error.message))

    }

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
                    {
                        user
                            ? <button onClick={handleSignOut} className='btn'>Logout</button>
                            : <Link to='/login' className='btn'>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;