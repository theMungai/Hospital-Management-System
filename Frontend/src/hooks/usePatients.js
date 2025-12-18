import { useEffect, useState } from "react";


/**
 * Custom hook to fetch appointment data.
 * @param {boolean} fetchAll 
 * @returns {{patients: Array, loading: boolean, error: string | null}}
 */


export function usePatients(fetchAll = true){
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function fetchPatients() {
            try{
                const response = await fetch("/patients")
                const data = response.json()

                if(!response.ok){
                    throw new Error(data?.detail || "Failed to fetch patients")
                }

                setPatients(data)

            } catch(err){
                console.log("Error fetching patients:", err.message)
                setError("Failed to load patients data")
            } finally {
                setLoading(false)
            }
        }

        fetchPatients()

    }, [fetchAll])

    return { patients, loading, error}
}