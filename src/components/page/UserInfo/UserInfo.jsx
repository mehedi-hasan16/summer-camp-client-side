import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import SectionName from "../../SectionName/SectionName";


const UserInfo = () => {
    const { user } = useAuth();
    const [role] = useUserRole();
    return (
        <div>
            <SectionName title='User info'></SectionName>
            <div className="avatar online">
                <div className="w-32 rounded-full">
                    <img src={user.photoURL} />
                </div>
            </div>
            <p className="text-xl font-semibold">Name: {user?.displayName}</p>
            <p className="text-xl font-semibold">Email: {user?.email}</p>
            <p className="text-xl font-semibold">Status: {role ? role : ''}</p>
        </div>
    );
};

export default UserInfo;