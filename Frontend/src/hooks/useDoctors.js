import { useEffect, useState } from "react";

/**
 * Custom hook to fetch doctor data.
 * @param {boolean} fetchAll 
 * @returns {{doctors: Array, loading: boolean, error: string | null}}
 */



export function useDoctors(fetchAll = true){
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function fetchDoctors() {
            try{
                const response = await fetch("/doctors")
                const data = await response.json()

                if(!response.ok){
                    throw new Error(data?.detail || "Failed to fetch doctors.")
                }
                setDoctors(data)

            } catch(err){
                console.log("Error fetching doctors:", err.message)
                setError("Failed to load doctors data.")
            } finally {
                setLoading(false)
            }
        }

        fetchDoctors()

    }, [fetchAll])

    return { doctors, loading, error}
}