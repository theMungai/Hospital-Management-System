import { usePatients } from "../../../../hooks/usePatients";
import { useNavigate } from "react-router-dom";


function getInitials (firstName, lastName){
    if (!firstName || !lastName) return "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

function PatientRow({ patient, index }){
    const {

    }
}

function RecentPatients() {
    const { patients, loading, error} = usePatients(true)
    const navigate = useNavigate()


    if (loading){
        return <div></div>
    }


    if (error){
        return <div>{error}</div>
    }


    const limitedPatients = patients.slice(0, 5)


    if (limitedPatients.length === 0){
        return (
             <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-gray-500">
                No upcoming patients found.
            </div>
        );
    }



    return (
        <div className="bg-white rounded-[6px] px-4 py-2 border-[0.1px] border-[#4F4F4F]/[0.1]">
            RecentPatients
        </div>
    );
}

export default RecentPatients;