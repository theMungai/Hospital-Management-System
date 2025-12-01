import React, { useState, useEffect} from 'react';

const API_BASE_URL = 'http://localhost:8000';
const userId = localStorage.getItem("user_id");

function getGreetingByTime(hour) {
    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    }
    else if (hour >= 12 && hour < 16) {
        return "Good Afternoon";
    }
    else {
        return "Good Evening";
    }
}

function Welcome() {
    const [user, setUser] = useState({ first_name: "", last_name: ""});
    const [greeting, setGreeting] = useState("")
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        if(userId){
            fetch(`${API_BASE_URL}/users/${userId}`)
                .then(res => {
                    if (!res.ok) throw new Error("Network response was not ok");
                    return res.json();
                })
                .then(data => setUser(data))
                .catch(err => {
                    console.error(err);
                    setUser({ first_name: "Error", last_name: "User"});
                })
        }
    }, []);

    useEffect(() => {
        const updateTimeAndGreeting = () => {
            const now = new Date();
            setCurrentTime(now);
            const currentHour = now.getHours();
            setGreeting(getGreetingByTime(currentHour));
        };

        updateTimeAndGreeting();

        const intervalId = setInterval(updateTimeAndGreeting, 60000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="bg-[#007E85]/[0.8] w-full rounded-[10px] px-10 py-7">
            <section className="flex justify-between items-center">
                <div className="text-white">
                    <h1 className="text-2xl font-extrabold mb-3 md:text-4xl">
                        {greeting}, {user.first_name} {user.last_name}!
                    </h1>

                    <p className="font-extralight">Welcome back! Here’s a quick summary of today’s hospital operations.</p>
                </div>

                <button className="px-6 py-4 bg-white rounded-xl text-customTealBlue">
                    View Reports & Analytics
                </button>
            </section>
        </div>
    );
}

export default Welcome;