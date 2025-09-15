import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCard from './components/UserTripCard';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    fetchUserTrips();
  }, []);

  const fetchUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }

    try {
      const q = query(
        collection(db, 'AiTrips'),
        where('userEmail', '==', user.email)
      );
      const querySnapshot = await getDocs(q);

      // Collect trips from Firebase
      const trips = querySnapshot.docs.map(doc => ({
        id: doc.id,   // Use doc.id for uniqueness
        ...doc.data()
      }));

      // Remove duplicates using Map
      const uniqueTrips = Array.from(new Map(trips.map(t => [t.id, t])).values());

      setUserTrips(uniqueTrips);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  return (
    <div className='px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72'>
      <h2 className='font-bold text-3xl mb-10'>My Trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 my-3'>
        {userTrips.length > 0 ? (
          userTrips.map(trip => (
            <UserTripCard trip={trip} key={trip.id} />
          ))
        ) : (
          [1,2,3,4,5,6].map((item, index) => (
            <div key={index} className='h-[200px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyTrips;
