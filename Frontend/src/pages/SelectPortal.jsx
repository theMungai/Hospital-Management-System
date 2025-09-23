import React from 'react';
import { UserIcon } from "@heroicons/react/24/outline";

import Layout from "../components/Layout.jsx";

function SelectPortal() {
    return (
        <Layout>
            <section className="bg-[#f3f3f3] relative flex justify-center items-center h-full min-h-screen xs:w-full xs:mx-auto font-dmsans text-center">

                <div className="absolute inset-0 bg-[url('../../public/images/grid-background.png')] opacity-90"></div>

                <section className="relative z-10 border border-[#e9e9e9] bg-white rounded-[8px] shadow-2xl w-full max-w-[40%] p-10 ">
                    <h1 className="text-customTealBlue text-2xl font-bold mb-5">Doctor Appointment - Sign Up</h1>
                    <p className="text-gray-500">Connect patients with trusted doctors for appointments and care.</p>
                    <p className="text-gray-500 mb-8">Choose your role to get started:</p>

                    <div className="w-full rounded-lg bg-customTealBlue p-5 text-white cursor-pointer flex items-center gap-x-5">
                        <UserIcon className="w-6 h-6" />
                        <div className="text-left">
                            <h3 className="font-semibold mb-1.5">I’m a Patient</h3>
                            <p className="font-extralight text-sm">Book appointments, consult with doctors, and manage your health records.</p>
                        </div>
                    </div>

                    <section className="relative mt-[6.72%] mb-[2.895%] h-[15px] border-t border-[#CBD2D6] text-center text-[83.34%]">
                        <span className="relative bg-white px-[0.5em] text-[#6c7378] font-extralight -top-[0.7em]">OR</span>

                    </section>

                    <div className="w-full rounded-lg bg-customTealBlue p-5 text-white cursor-pointer flex items-center gap-x-5">
                        <img src="../../public/images/stethoscope.png" className="w-6 h-6"/>
                        <div className="text-left">
                            <h3 className="font-semibold mb-1.5">I’m a Doctor</h3>
                            <p className="font-extralight text-sm">Provide medical care, manage appointments, and connect with patients.</p>
                        </div>
                    </div>

                    <p className="my-5 text-gray-500 font-light ">Already have an account? <span className="text-customTealBlue font-semibold cursor-pointer"><a>Log in here</a></span></p>
                    <p className="text-gray-500 font-light">By signing up, you agree to our <span className="underline cursor-pointer"> Patient & Doctor Terms & Conditions</span>.</p>

                </section>

            </section>
        </Layout>
    );
}

export default SelectPortal;