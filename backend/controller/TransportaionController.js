const Hotel = require('../models/AccommodationModel');
const Car = require('../models/transportationModel');
const Flight = require('../models/flightModel');
const getRidePrices = require('./externalTransportController');
const distanceController = require('./mapBoxDistance');


// Search flights based on departure, arrival, and dates
const searchFlights = async (req, res) => {
    try {
        const { flightDepLocation, flightArrLocation, flightDepdates, flightArrDates } = req.body;

        // Validate input
        if (!flightDepLocation || !flightArrLocation || !flightDepdates) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let query = {
            'departure.airport': flightDepLocation,
            'arrival.airport': flightArrLocation,
        };

        let query2 = {
            'departure.airport': flightArrLocation,
            'arrival.airport': flightDepLocation,
        };

        // Handle empty dates
        if (flightDepdates) {
            query['flightDate'] = flightDepdates;
        }

        if (flightArrDates) {
            query2['flightDate'] = flightArrDates;
        }

        // Execute queries
        const flights = await Flight.find(query);
        const returnFlights = await Flight.find(query2);
        
        // Return flights
        res.json({ outboundFlights: flights, returnFlights: returnFlights });
    } catch (err) {
        console.error('Error searching flights:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Add a new flight
const addFlight = async (req, res) => {
  const { airline, flightNumber, departure, arrival, price, seatsAvailable } = req.body;

  const newFlight = new Flight({
    airline,
    flightNumber,
    departure,
    arrival,
    price,
    seatsAvailable,
  });

  try {
    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing flight
const updateFlight = async (req, res) => {
  const { id } = req.params;
  const { airline, flightNumber, departure, arrival, price, seatsAvailable } = req.body;

  try {
    const flight = await Flight.findById(id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    flight.airline = airline;
    flight.flightNumber = flightNumber;
    flight.departure = departure;
    flight.arrival = arrival;
    flight.price = price;
    flight.seatsAvailable = seatsAvailable;

    const updatedFlight = await flight.save();
    res.json(updatedFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a flight
const deleteFlight = async (req, res) => {
  const { id } = req.params;

  try {
    const flight = await Flight.findById(id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    await flight.remove();
    res.json({ message: 'Flight deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchRide = async (req, res) => {
    try {
        const currentLocation =req.body.rideDepLocation;
        const destination = req.body.rideArrLocation;

        const filterParams={Passengers : req.body.Ridetravllers
                            ,minPrice: req.body.minPrice
                            ,maxPrice:req.body.maxPrice
                            ,minRating:req.body.minRating}
        console.log({currentLocation,destination})
        
        const cars = await Car.find({
            $and: [
                { pickUp: currentLocation }
            ]
        });
        console.log(cars)
        
        cars.forEach(async (car) => {
            car.pickUp = currentLocation;
            car.dropOff = destination;
            await car.save();
        });


        // Ensure cars is an array
        if (!Array.isArray(cars)) {
            throw new Error('Cars is not an array');
        }
        

        if (!currentLocation || !destination) {
            throw new Error('Please provide both currentLocation and destination.');
        }

        const response = await distanceController(currentLocation, destination);
        const distance = response.roadDistance;

        const pricingInfo = await getRidePrices(cars, distance);

        // Filter the pricingInfo based on the request criteria
        const filteredResults = searchFilter(filterParams, pricingInfo);

        res.json(filteredResults);
    } catch (error) {
        console.error('Error searching ride:', error.message);
        res.status(500).json({ error: 'Failed to search ride' });
    }
};

const searchFilter = (filterParams, cars) => {
    const { Passengers, minPrice, maxPrice,minRating} = filterParams;
    let filteredResults = [...cars]; // Create a copy of the array

    if (Passengers) {
        filteredResults = filteredResults.filter(car => car.capacity >= Passengers);
    }
    if(minRating !== undefined){
        filteredResults = filteredResults.filter(car => car.driverrating >= minRating);
    }

    if (minPrice !== undefined) {
        filteredResults = filteredResults.filter(car => car.finalPrice >= minPrice);
    }

    if (maxPrice !== undefined) {
        filteredResults = filteredResults.filter(car => car.finalPrice <= maxPrice);
    }

    return filteredResults;
};

const addTransportation= async (req, res,next) =>{
    try{
        const newTransportaion= new Car({
            externalId : req.body.externalId ,
            brand: req.body.brand, 
            owner: req.body.owner,
            plateNo: req.body.plateNo,
            color:req.body.color,
            capacity: req.body.capacity,
            numberOfPassengers:req.body.numberOfPassengers,
            driverID:req.body.driverID,
            drivername:req.body.drivername,
        })
    
        await newTransportaion.save()
        res.status(201).json({ message: 'transportaion added successfully', transportaion:newTransportaion })
    }catch(error){
        next(error)
    }

};

const updateDriverRating = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        const oldRatingSum = car.driverrating * car.totalratings;
        const userRating = req.body.userRating;
        
        // Update total ratings and rating sum
        car.totalratings += 1;
        car.driverrating = (oldRatingSum + userRating) / car.totalratings;
        
        await car.save();
        
        res.status(200).json({ message: 'Driver rating updated successfully', car });
    } catch (error) {
        next(error);
    }
}

const updateTransportation= async (req,res,next) => {
try{
    const car =await Car.findByIdAndUpdate(
        req.params.id,
        { $set: req.body},
        { new: true })

        res.status(200).json({message:'Transoprtation Updated Successfully', car})
}catch(error) {
    next(error)
}
}

const deleteTransportation=async (req, res, next) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'transportaion deleted successfully'})
    } catch (error) {
        next(error);
    }
}



module.exports = {
    searchRide,
    addTransportation,
    updateDriverRating,
    updateTransportation,
    deleteTransportation,
    searchFlights,
    addFlight,
    updateFlight,
    deleteFlight,
}
