import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function Subscribe() {
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        console.log("the token id: ", token)
        try {
            if (token) {
              const decodedToken = jwtDecode("token");
              if (decodedToken && decodedToken.id) {
                setUserId(decodedToken.id);
              }
            }
          } catch (err) {
            console.log("Can not decode the token: ", err)
          }
          
    }, []);
    console.log("user id is: ", userId)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post(`https://guzo-backend.vercel.app/subscribe/${userId}`, {
            email: email
        })
        console.log("Subscirbed succesfully with email", result)
        setEmail('');
    };

    return (
        <div>
            <h2>Subscribe to Our Newsletter</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    );
}

export default Subscribe;
