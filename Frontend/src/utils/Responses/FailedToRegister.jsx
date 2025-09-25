import React from 'react';
import {ArrowLongLeftIcon} from "@heroicons/react/24/solid";

import Layout from "../../components/Layout.jsx";
import {Link} from "react-router-dom";

function FailedToRegister() {
    return (
        <Layout>
            <div className=" grid place-content-center h-screen text-center font-dmsans p-4">
                <div
                    className=" bg-contain bg-no-repeat bg-center
                               w-full max-w-[700px] aspect-square mx-auto" style={{ backgroundImage: "url('/images/error.png')" }}>
                </div>

                <h3 className="text-red-500 font-bold text-3xl md:text-4xl mt-6">
                    Form submission failed
                </h3>
                <p className="text-gray-600 my-3">
                    Oops! Looks like we’re not fully plugged in. Please try again.
                </p>

                <Link to={'/sign-up'}>
                    <button className="relative left-1/2 transform -translate-x-1/2 flex items-center gap-x-2 py-2 px-3.5 w-[130px] border  border-customTealBlue rounded text-customTealBlue
                ">
                        <ArrowLongLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        Go back
                    </button>
                </Link>
            </div>
        </Layout>
    );
}

export default FailedToRegister;
