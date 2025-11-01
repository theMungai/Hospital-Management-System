import React from 'react';
import {Link} from "react-router-dom";
import { CheckCircle } from 'react-feather';
import {ArrowLongRightIcon} from "@heroicons/react/24/solid";

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

                <p className="text-gray-600 my-3 text-base md:text-lg">
                    Thank you for applying! Your details have been successfully received.
                </p>

                <Link to={'/log-in'}>
                    <button className="relative left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-x-2 py-2 px-3.5 w-[130px] bg-customTealBlue rounded text-white">
                       Login
                       <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true"/>
                    </button>
                </Link>
            </div>
        </Layout>
    );
}

export default RegisteredSuccessfully;
