import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import TripPlace from '../components/TripPlace';
import Footer from '../components/Footer';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);

    const GetTripData = async () => {
        try {
            const docRef = doc(db, "AiTrips", tripId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();

                // Convert Firestore timestamp to JS date
                if (data.createdAt) {
                    data.createdAtFormatted = data.createdAt.toDate().toLocaleString(); 
                } else {
                    data.createdAtFormatted = "N/A";
                }

                setTrip(data);
            } else {
                toast('No trip found!');
            }
        } catch (err) {
            console.error(err);
            toast('Error fetching trip!');
        }
    };

    useEffect(() => {
        if (tripId) GetTripData();
    }, [tripId]);

    if (!trip) return <div className="p-12 text-center">Loading...</div>;

    return (
        <div className="p-12 md:px-25 lg:px-44 xl:px-56">
            <div className="mb-4 text-gray-500">
                Trip Created: {trip.createdAtFormatted}
            </div>
            <InfoSection trip={trip} />
            <Hotels trip={trip} />
            <TripPlace trip={trip} />
            <Footer trip={trip} />
        </div>
    );
}

export default ViewTrip;
