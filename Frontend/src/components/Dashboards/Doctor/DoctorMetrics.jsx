import React, { useRef, useEffect, useState} from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronRight, Users, Calendar } from "lucide-react"
import metricsSkeleton from '../../../utils/loadingSkeletons/metricsLoadingSkeleton';
import { Link } from 'react-router-dom';

function MetricCard({icon: Icon, title, count, percentStatus, to, index}){
    const isPositive = percentStatus.startsWith('+');
    const statusColor = isPositive ? 'text-customGreen' : 'text-red-600';

    const iconRef = useRef(null)
    const titleRef = useRef(null)
    const countRef = useRef(null)
    const statusRef = useRef(null)
    const subtitleRef = useRef(null)

    useGSAP(() => {
        const elements = [
            { ref: iconRef, delay: 0 + (index * 0.1) },
            { ref: titleRef, delay: 0.1 + (index * 0.1) },
            { ref: countRef, delay: 0.2 + (index * 0.1) },
            { ref: statusRef, delay: 0.3 + (index * 0.1) },
            { ref: subtitleRef, delay: 0.4 + (index * 0.1) }
        ];

        elements.forEach(({ ref, delay }) => {
            if (ref.current) {
                gsap.fromTo(ref.current,
                    {
                        x: -20,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        delay: delay,
                        ease: "power2.out"
                    }
                );
            }
        });

    }, [index]);

    useEffect(() => {
        if (countRef.current && typeof count === 'number') {
            const target = count;
            let current = 0;
            const duration = 1500;
            const increment = target / (duration / 16); 
            
            const timer = setInterval(() => {
                if (current < target) {
                    current = Math.min(current + Math.ceil(increment), target);
                    countRef.current.textContent = current;
                } else {
                    clearInterval(timer);
                }
            }, 16);
            
            return () => clearInterval(timer);
        }
    }, [count]);

    return (
        <div className="min-w-[300px] bg-white rounded-[6px] px-4 py-4 duration-300">
            <section className="flex gap-x-3">
                <div ref={iconRef}>
                    <Icon className="w-5 h-5 text-customTealBlue"/>
                </div>
                <Link to={to}>
                    <div ref={titleRef} className="text-[#4F4F4F]/[0.4] mb-5 font-light flex items-center gap-1 group">
                        {title}
                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"/>
                    </div>
                </Link>
            </section>

            <h2 ref={countRef} className="text-5xl font-extrabold text-gray-800 mb-10">
                {typeof count === 'number' ? '0' : count}
            </h2>

            <div className="flex items-center text-sm font-semibold">
                <span 
                    ref={statusRef}
                    className={`px-2 py-0.5 rounded-full ${statusColor} bg-opacity-10 ${isPositive ? 'bg-customGreen' : 'bg-red-600'}`}
                >
                    {percentStatus}
                </span>
                <span ref={subtitleRef} className="text-gray-400 ml-2 font-light">
                    From last month
                </span>
            </div>
        </div>
    )
}





function DoctorMetrics() {
    const [appointmentsCount, setAppointmentsCount] = useState(0)
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
                    const [appts, pats] = await Promise.all([
                        fetchData("appointments"),
                        fetchData("patients")
                    ])
                    setAppointmentsCount(appts)
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
            to: "/patients",
            icon: Users,
            title: "Patients",
            count: patientsCount,
            percentStatus: "+1.5%"
        }
    ]

    if (loading) {
            return metricsSkeleton()
        }
    
        if (error) return (
            <div className="my-8">
                <div className="bg-white rounded-[6px] px-4 py-8 border-[0.1px] border-red-300 text-center text-red-600 font-poppins">
                    {error}
                </div>
            </div>
        );

  return (
    <div className="">
            <div className="w-full flex flex-col gap-6">
                {dashboardMetrics.map((metric, index) => (
                    <MetricCard
                        key={index}
                        icon={metric.icon}
                        title={metric.title}
                        count={metric.count}
                        percentStatus={metric.percentStatus}
                        to={metric.to}
                        index={index}
                    />
                ))}
            </div>
        </div>
  )
}

export default DoctorMetrics