import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function TripPlace({ trip }) {
  return (
    <div className='my-4'>
      <h2 className='font-bold text-xl'>Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, i) => (
          <div key={`day-${i}`}>   {/* ✅ unique key for each day */}
            <h2 className='font-medium text-l'>Day {item?.day}</h2>
            <div className='grid md:grid-cols-2 gap-4'>
              {item.plan?.map((place, index) => (
                <PlaceCardItem 
                  key={`place-${i}-${index}`}  // ✅ unique key for each place
                  place={place} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TripPlace
