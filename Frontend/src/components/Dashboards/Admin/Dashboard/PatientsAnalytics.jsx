import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    { month: "January", male: 600, female: 480 },
    { month: "February", male: 680, female: 720 },
    { month: "March", male: 720, female: 640 },
    { month: "April", male: 690, female: 610 },
    { month: "May", male: 750, female: 700 },
    { month: "June", male: 550, female: 630 },
    { month: "July", male: 780, female: 660 },
    { month: "August", male: 380, female: 410 },
    { month: "September", male: 180, female: 270 },
    { month: "October", male: 680, female: 740 },
    { month: "November", male: 90, female: 600 },
    { month: "December", male: 700, female: 690 },
];


function PatientsAnalytics(props) {
    return (
        <div className="w-[60%] h-[450px] bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Patients Visits</h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

                    <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#888", fontSize: 12 }} />

                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            padding: "15px",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            border: "1px solid #eee",
                            backdropFilter: "blur(5px)",
                            WebkitBackdropFilter: "blur(5px)",
                        }}
                        labelStyle={{ fontWeight: "bold", color: "#444" }}
                        formatter={(value, name) => [
                            value,
                            name === "male" ? "Male" : "Female",
                        ]}
                    />


                    <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        formatter={(value) =>
                            value === "male" ? "Male" : "Female"
                        }
                    />

                    {/* Male Line */}
                    <Line
                        type="monotone"
                        dataKey="male"
                        stroke="#007E85"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />

                    {/* Female Line */}
                    <Line
                        type="monotone"
                        dataKey="female"
                        stroke="#6EAB36"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PatientsAnalytics;