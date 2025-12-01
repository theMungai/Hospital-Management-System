import React from 'react';
import { ChevronRight, TrendingUp, Users, Calendar, CreditCard, Stethoscope } from "lucide-react"
import {Link} from "react-router-dom";

function MetricCard({icon: Icon, title, count, percentStatus, to}){
    const isPositive = percentStatus.startsWith('+');
    const statusColor = isPositive ? 'text-customGreen' : 'text-red-600';

    return (
        <div className="bg-white flex flex-col justify-between rounded-[6px] px-4 py-2 border-[0.1px] border-[#4F4F4F]/[0.1]">
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

    const dashboardMetrics = [
        {
            to: "/appointments",
            icon: Calendar,
            title: "Appointments",
            count: 34,
            percentStatus: "+8.1%"
        },
        {
            to: "/doctors",
            icon: Stethoscope,
            title: "Doctors",
            count: 5,
            percentStatus: "-2.0%"
        },
        {
            to: "/patients",
            icon: Users,
            title: "Patients",
            count: 128,
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
    return (
        <div className="my-8 ">
            <div className="w-full grid grid-cols-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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