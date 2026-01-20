export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:"Stay conscious of costs",
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:"Keep cost on the average side",
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about cost",
        icon:'💎',
    },
]

export const SelectTravelList=[
    {
        id:1,
        title:'Just Me',
        desc:"A sole travelers",
        icon:'🙋🏾‍♀️',
        people:'1',
    },
    {
        id:2,
        title:'A couple',
        desc:"Two travelers",
        icon:'👫🏾',
        people:'2',
    },
    {
        id:3,
        title:'Family',
        desc:"A group of fun loving adv",
        icon:'🏡',
        people:'3 to 5 people',
    },
    {
        id:4,
        title:'Friends',
        desc:"A bunch of thrill-seekers",
        icon:'👩‍👩‍👦‍👦',
        people:'5 to 12 people',
    },
]


export const AI_PROMPT = `
Generate a PURE JSON travel plan for Location: {location}
for {totalDays} days for {traveler} with a {budget} budget.

Return ONLY valid JSON. No markdown. No explanations.

JSON structure:
{
  "hotelOptions": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "price": "",
      "hotelImageUrl": "",
      "geoCoordinates": "",
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "plan": [
        {
          "placeName": "",
          "placeDetails": "",
          "placeImageUrl": "",
          "geoCoordinates": "",
          "ticketPricing": "",
          "rating": "",
          "time": ""
        }
      ]
    }
  ]
}
`;
