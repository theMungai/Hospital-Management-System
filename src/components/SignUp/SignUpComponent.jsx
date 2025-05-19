import React from 'react';
import Form from "./Form.jsx";
import Layout from '../Layout.jsx';

// function SignUpLeftSection() {
//     return (
//         <div className="bg-customTealBlue basis-[40%] min-h-full w-full rounded-tl-[10px] rounded-bl-[10px] relative">
//             <h1 className="text-white text-[24px] font-bold logo flex items-center">
//                 Health<span className="text-customGreen">care</span>
//             </h1>
//             <img src="https://www.pngmart.com/files/21/Hospital-Vector-PNG-HD.png" alt=""
//                 className="w-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
//             />
//         </div>
//     )
// }

const SignUpComponent = () => {
    return (
        <Layout>
            <div className="register-container px-[150px] bg-customWhite min-h-screen flex items-center justify-center ">
                <div className="flex justify-around gap-x-[50px] bg-white min-h-[80vh] w-4/5 rounded-[10px] shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] overflow-hidden ">
                    <Form />
                </div>
            </div>
        </Layout>
    );
};

export default SignUpComponent;