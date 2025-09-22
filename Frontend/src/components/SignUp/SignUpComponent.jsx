import React from 'react';
import Form from "./Form.jsx";
import Layout from '../Layout.jsx';

const SignUpComponent = () => {
    return (
        <Layout>

            <div
                className="register-container py-8  mt-[140px] xs:mt-20 sm:mt-20 md:mt-20 lg:mt-20 sm:p-6 md:p-10 lg:p-[50px] bg-customWhite min-h-screen flex items-center justify-center">
                <div
                    className="md:w-[90%] flex justify-around gap-x-[50px] bg-white min-h-[80vh] w-4/5 xs:w-[95%] sm:w-[90%] rounded-[10px] shadow-[0_10px_25px_rgba(0,_0,_0,_0.1)] overflow-hidden">
                    <Form/>
                </div>
            </div>
        </Layout>


    );
};

export default SignUpComponent;