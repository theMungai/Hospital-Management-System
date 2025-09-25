import React from 'react';
import { CheckCircle } from "react-feather";

import Layout from "../../components/Layout.jsx";

function RegisteredSuccessfully() {
    return (
        <Layout>
            <div className="grid place-content-center h-screen text-center font-dmsans p-4">
                <CheckCircle
                    className="text-customGreen mx-auto mb-4"
                    size={64}
                    aria-hidden="true"
                />

                <h3 className="text-customGreen font-bold text-3xl md:text-4xl">
                    Application Submitted Successfully
                </h3>

                <p className="text-gray-600 mt-3 text-base md:text-lg">
                    Thank you for applying! Your details have been successfully received.
                </p>
            </div>
        </Layout>
    );
}

export default RegisteredSuccessfully;
