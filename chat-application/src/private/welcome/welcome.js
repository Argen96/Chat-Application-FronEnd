import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react';


function Welcome() {
    const navigate = useNavigate()
    const [welcome, setWelcome] = useState(null)
    useEffect(() => {
        async function welcomeHome() {
            const token = localStorage.getItem('access_token');
            const headers = {
                authorization: `Bearer ${token}`,
            };

            try {
                const response = await fetch('http://localhost:80/api/welcome', {
                    method: 'GET',
                   headers: headers,
                });
             if (!response.ok){
                localStorage.removeItem('access_token');
                navigate('/log-in')
             } 
            } catch (error) {
                console.error('Error occurred while fetching trips:', error);
            }
        }
       welcomeHome();
    }, []);

    return (
        <div>
            <h6>Welcome Man</h6>
            <span>Welcome Man</span>
            <div>Welcome Man</div>
            <h6>Welcome Man</h6>
            <h6>Welcome Man</h6>
         
        </div>
    )
}

export default Welcome