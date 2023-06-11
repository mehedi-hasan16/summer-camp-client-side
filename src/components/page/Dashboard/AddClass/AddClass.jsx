import { useForm } from "react-hook-form";
import SectionName from "../../../SectionName/SectionName";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const img_hosting_token = import.meta.env.VITE_IMAEGE_UPLOAD_TOKEN;
console.log(img_hosting_token);
const AddClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        console.log(data);
        const formData = new FormData()
        formData.append('image', data.photo[0])
        fetch(img_hosting_url, {
            method: 'post',
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                if (imageResponse.success) {
                    const igmURL = imageResponse.data.display_url;
                    const { className, instructor, email, seats, price } = data;
                    const addItem = { className, instructor, email, seats: parseInt(seats), price: parseInt(price), image: igmURL, status: 'pending', enrolled: parseInt(0) }
                    console.log(addItem);
                    axiosSecure.post('/classes',  addItem)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class added successfully!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                    // fetch('http://localhost:5000/classes',{
                    //     method:'post',
                    //     headers:{
                    //         'content-type': 'application/json'
                    //     },
                    //     body:JSON.stringify(addItem)
                    // })
                    // .then(res=>res.json())
                    // .then(data=>{
                    //     if(data.insertedId){
                    //         Swal.fire({
                    //             position: 'top-end',
                    //             icon: 'success',
                    //             title: 'Class added successfully!',
                    //             showConfirmButton: false,
                    //             timer: 1500
                    //           })
                    //     }
                    // })

                }
            })
    }
    return (
        <div className="w-full">
            <SectionName title='add class'></SectionName>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-2 gap-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input type="text" {...register("className", { required: true })} placeholder="Class Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Photo</span>
                        </label>
                        <input type="file" {...register("photo", { required: true })} placeholder="" className="file-input file-input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Instructor Name</span>
                        </label>
                        <input type="text" {...register("instructor", { required: true })} placeholder="Instructor Name" className="input input-bordered" defaultValue={user?.displayName} readOnly />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Instructor Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: true
                        })} placeholder="Instructor Email" className="input input-bordered" defaultValue={user?.email} readOnly />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Available seats</span>
                        </label>
                        <input type="number" {...register("seats", {
                            required: true, minLength: 0, maxLength: 50
                        })}
                            placeholder="Seats" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" {...register("price", {
                            required: true
                        })} placeholder="Price" className="input input-bordered" />

                    </div>
                    <div className="form-control mt-4 col-span-2">
                        <input className="btn btn-primary" type="submit" value="Add Class" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;