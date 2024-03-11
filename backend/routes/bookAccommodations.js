//this also handles the searching of accommodations

const express = require('express');
const router = express.Router();

//dummy data that is going to be fetched from api
let accommodations = [
    { id: 1, place: '4 Kilo', floor: 4, availableRooms: 10 },
    { id: 2, place: '5 kilo', floor: 6, availableRooms: 7 },
    { id: 3, place: '6 kilo', floor: 1, availableRooms: 15 }
  ];

//assume we fetched data from api like the above
//we have to implement autocomplete form api
router.get('/search/accommodations', async (req, res) => {
    const { place, floor } = req.body;

    const placeLowerCase = place.toLowerCase().trim();

    // Check if the place exists with the user-specified place and floor input
    const accommodation = accommodations.find((accommodation) => {
        const placefromFile = accommodation.place.toLowerCase().trim();
        
        return placefromFile === placeLowerCase && accommodation.floor === floor;
    });

    if(!accommodation){
        res.status(404).json({message: 'Place not found', Place: `${accommodation}`})
    }else{
        res.status(200).json({message:`Place is found: ${accommodation.place} floorNo: ${accommodation.floor}`})
    }

});

  //the posting or booking comes after the user searched the place using the above get request
router.post('/book/accommodations', async (req, res) => {
  const { placeId, numRoom } = req.body;

  // Find the place
  const accommodation = accommodations.find(accommodation => accommodation.id === placeId);

  if (!accommodation) {
    return res.status(404).json({ error: 'Place not found' });
  }

  if (accommodation.availableRooms < numRoom) {
    return res.status(400).json({ error: 'Not enough room available' });
  }

  //in here we have to book litrally i don't know how to do it now
  accommodation.availableRooms -= numRoom;


  res.status(200).json({ message: 'Booking successful', accommodation });
});


module.exports = router