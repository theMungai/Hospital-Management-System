import React from 'react';
import Layout from "../../components/Layout.jsx";

function FailedToRegister() {
    return (
        <Layout>
            <div className="grid place-content-center h-screen text-center font-dmsans p-4">
                <div
                    className="bg-[url('/images/error.png')] bg-contain bg-no-repeat bg-center
                               w-full max-w-[600px] aspect-square mx-auto">
                </div>

                <h3 className="text-red-500 font-bold text-3xl md:text-4xl mt-6">
                    Form submission failed
                </h3>
                <p className="text-gray-600 mt-2">
                    Oops! Looks like we’re not fully plugged in. Please try again.
                </p>
            </div>
        </Layout>
    );
}

export default FailedToRegister;
