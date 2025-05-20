import React from 'react';
import Form from "./Form.jsx";
import Layout from '../Layout.jsx';

const SignUpComponent = () => {
    return (
        <Layout>
            <div className="register-container mt-12 px-[150px] bg-customWhite min-h-screen flex items-center justify-center ">
                <div className=" flex justify-around gap-x-[50px] bg-white min-h-[80vh] w-4/5 rounded-[10px] shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] overflow-hidden ">
                    <Form />
                </div>
            </div>
        </Layout>
    );
};

export default SignUpComponent;