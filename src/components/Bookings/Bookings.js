import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Conten-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    }, [])
    return (
        <div>
            <h3>You have: {bookings.length} Bookings</h3>
            {
                bookings.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} To: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))} </li>)
            }
        </div>
    );
};

export default Bookings;