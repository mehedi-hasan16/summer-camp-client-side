import { useForm } from "react-hook-form";
import SectionName from "../../../SectionName/SectionName";
import useAuth from "../../../../hooks/useAuth";

const AddClass = () => {
    const {user} = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data =>{
        console.log(data);
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
                    <input type="text" {...register("instructorName", { required: true })} placeholder="Instructor Name" className="input input-bordered" defaultValue={user.displayName} readOnly/>
                   
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Instructor Email</span>
                    </label>
                    <input type="email" {...register("instructorEmail", {
                        required: true})} placeholder="Instructor Email" className="input input-bordered" defaultValue={user.email} readOnly />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Available seats</span>
                    </label>
                    <input type="number" {...register("availableSeats", {
                        required: true, minLength: 0, maxLength: 50 })} 
                        placeholder="Seats" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="number" {...register("price", {
                        required: true})} placeholder="Price" className="input input-bordered" />

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