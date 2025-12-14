import { useState, useEffect } from "react";


/**
 * Custom hook to fetch appointment data.
 * @param {boolean} fetchAll 
 * @returns {{appointments: Array, loading: boolean, error: string | null}}
 */


export function useAppointments(fetchAll = true){
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function fetchAppointments(){
            try {
                const response = await fetch('/appointments');
                const data = await response.json()

                if (!response.ok){
                    throw new Error(data?.detail || "Failed to fetch appontments")
                }

                setAppointments(data)
            } catch (err) {
                console.log("Error fetching appointments:", err.message)
                setError("Failed to load appointments data.")
            } finally {
                setLoading(false)
            }
        }

        fetchAppointments()
    }, [fetchAll])

    return { appointments, loading, error}
}
