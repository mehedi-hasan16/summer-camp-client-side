import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const {signIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const formPage = location.state?.form?.pathname|| '/'
    const [showPass, setShowPass] = useState(true)
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result=>{
                console.log(result.user);
            //    sweetalert 
                Swal.fire(
                    'Success',
                    'Login successfully',
                    'success'
                  )
                  navigate(formPage, {replace: true})
            })

    };
   
    return (
        <div className='min-h-screen'>
            <div className='border-2 border-solid md:w-1/4 mx-auto p-4'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* email  */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="Email" className="input input-bordered w-full" {...register("email", { required: true, maxLength: 80 })} />
                    </div>

                    {/* password  */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className='relative'>
                            <input type={showPass ? 'password' : 'text'} placeholder="Password" className="input input-bordered w-full" {...register("password", { required: true, maxLength: 100 })} />
                            <span type="button" className='absolute btn btn-secondary btn-xs right-2 top-3' onClick={() => setShowPass(!showPass)}>{showPass ? 'show' : 'hide'}</span>
                        </div>

                    </div>
                    <div className="form-control mt-5">
                        <input className='btn btn-primary' type="submit" value='Login' />
                    </div>

                </form>
                <div className='text-center mt-3'>New in website? <Link to='/signup'>Register</Link></div>
            </div>
        </div>
    );
};

export default Login;