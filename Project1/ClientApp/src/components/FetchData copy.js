import React, { useState, useCallback } from "react";
import axios from 'axios';

const accessToken = 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiZXhwIjoxNjQ1MDEzMjc1LCJpc3MiOiJQcm9qZWN0MSIsImF1ZCI6IlByb2plY3QxIn0.sQG8ybsyrOJaOXtNxU8IyuOLF4mzsxGcqcaeC0YSVx7k1K6BS0YF-1id5YlEbUaJJQMrhFzpCSpYSargo0JRvg';

const apiUrl = 'https://localhost:7237/api';

axios.interceptors.request.use(
    config => {
        config.headers.authoriation =`Bearer ${accessToken}`;
        return config;
    },
)
export function FetchData() {
    const [users, setUsers] = useState([]);
    const [requestError, setRequestError] = useState();
    
    const fetchData = useCallback(async () =>{
        try{
            //fetch and set users
            const result = await axios.get(`${apiUrl}/weatherforecast`);
            setUsers = (result.data);
        } catch (err){
            //set request error message
            setRequestError(err.message);
        }
    });

    return (
        <div>
            <button onClick={()=> fetchData()}>Get Data</button>
            {users.map(user => {
                return <p key={user.id}>{user.name}</p>;
            })}
            {requestError && <p>{requestError}</p>}
        </div>
    )
}