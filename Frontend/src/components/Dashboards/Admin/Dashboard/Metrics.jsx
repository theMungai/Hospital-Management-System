import React, {useEffect, useState} from 'react';
import { ChevronRight, TrendingUp, Users, Calendar, CreditCard, Stethoscope } from "lucide-react"
import {Link} from "react-router-dom";

function MetricCard({icon: Icon, title, count, percentStatus, to}){
    const isPositive = percentStatus.startsWith('+');
    const statusColor = isPositive ? 'text-customGreen' : 'text-red-600';

    return (
        <div className="bg-white flex flex-col justify-between rounded-[6px] px-4 py-2">
            <section className="flex  gap-x-3">
                <Icon className="w-5 h-5 text-customTealBlue"/>
                <Link to={to}>
                    <div className="text-[#4F4F4F]/[0.4] mb-5 font-light flex items-center gap-1">
                        {title}
                        <ChevronRight className="w-5 h-5"/>
                    </div>
                </Link>
            </section>

            <h2 className="text-5xl font-extrabold text-gray-800 mb-10">
                {count}
            </h2>

            <div className="flex items-center text-sm font-semibold">
                <span className={`px-2 py-0.5 rounded-full ${statusColor}`}>
                    {percentStatus}
                </span>
                <span className="text-gray-400 ml-2 font-light">
                    From last month
                </span>
            </div>
        </div>
    )
}

function Metrics() {
    const [appointmentsCount, setAppointmentsCount] = useState(0)
    const [doctorsCount, setDoctorsCount] = useState(0)
    const [patientsCount, setPatientsCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(`http://localhost:8000/${endpoint}`)
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()

            return data.length
        } catch (err){
            console.error(`Error fetching ${endpoint}:`, err)
            return 0
        }
    }

    useEffect(() => {
        const loadCounts = async () => {
            setLoading(true);
            setError(null)
            try {
                const [appts, docs, pats] = await Promise.all([
                    fetchData("appointments"),
                    fetchData("doctors"),
                    fetchData("patients")
                ])
                setAppointmentsCount(appts)
                setDoctorsCount(docs)
                setPatientsCount(pats)
            }catch (e){
                setError("Failed to fetch dashboard data.")
            }finally {
                setLoading(false)
            }
        }

        loadCounts()
    }, []);


    const dashboardMetrics = [
        {
            to: "/appointments",
            icon: Calendar,
            title: "Appointments",
            count: appointmentsCount,
            percentStatus: "+8.1%"
        },
        {
            to: "/doctors",
            icon: Stethoscope,
            title: "Doctors",
            count: doctorsCount,
            percentStatus: "-2.0%"
        },
        {
            to: "/patients",
            icon: Users,
            title: "Patients",
            count: patientsCount,
            percentStatus: "+1.5%"
        },
        {
            to: "/payments",
            icon: CreditCard,
            title: "Revenue",
            count: "$15.4k",
            percentStatus: "+15.9%"
        }
    ]

    if (loading) {
        return (
            <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-darkGray">
                Loading metrics... 
            </div>
        );
    }

    if (error) return <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-[#4F4F4F]/[0.1] text-center text-red-600 font-poppins">{error}</div>;

    return (
        <div className="my-8 ">
            <div className="w-full grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-2 ">
                {dashboardMetrics.map((metric, index) => (
                    <MetricCard
                        key={index}
                        icon={metric.icon}
                        title={metric.title}
                        count={metric.count}
                        percentStatus={metric.percentStatus}
                        to={metric.to}
                    />
                ))}
            </div>
        </div>
    );
}

export default Metrics;