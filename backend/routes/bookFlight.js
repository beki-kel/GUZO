//this also handles the searching of Flights

const express = require('express');
const router = express.Router();

//dummy data that is going to be fetched from api
let flights = [
    { id: 1, from: 'New York', to: 'Los Angeles', date: '2024-03-15', availableSeats: 100 },
    { id: 2, from: 'Los Angeles', to: 'Chicago', date: '2024-03-16', availableSeats: 50 },
    { id: 3, from: 'Chicago', to: 'New York', date: '2024-03-17', availableSeats: 75 }
  ];

//assume we fetched data from api like the above
//we have to implement autocomplete by ourselves it is simple no need for api
router.get('/search/flights', async (req, res) => {
    const { departure, arrival } = req.body;

    const departureLowerCase = departure.toLowerCase().trim();
    const arrivalLowerCase = arrival.toLowerCase().trim();

    // Check if the flight exists with the user-specified departure and arrival input
    const flight = flights.find((flight) => {
        const flightFromLowerCase = flight.from.toLowerCase().trim();
        const flightToLowerCase = flight.to.toLowerCase().trim();
        
        return flightFromLowerCase === departureLowerCase && flightToLowerCase === arrivalLowerCase;
    });

    if(!flight){
        res.status(404).json({message: 'Flight not found', flight: `${flight}`})
    }else{
        res.status(200).json({message:`Flight is found: ${flight.from} to ${flight.to}`})
    }

});

  //the posting or booking comes after the user searched the flight using the above get request
router.post('/book/flights', async (req, res) => {
  const { flightId, numSeats } = req.body;

  // Find the flight
  const flight = flights.find(flight => flight.id === flightId);

  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }

  if (flight.availableSeats < numSeats) {
    return res.status(400).json({ error: 'Not enough seats available' });
  }

  //in here we have to book litrally i don't know how to do it now
  flight.availableSeats -= numSeats;


  res.status(200).json({ message: 'Booking successful', flight });
});


module.exports = router