const Flight = require('../models/flightModel');

// Search flights based on departure, arrival, and date
const searchFlights = async (req, res) => {
    const departure=req.body.flightDepLocation;
    const arrival=req.body.flightArrLocation
    const date= req.body.flightDepdates;

    try {
        let query = {
            'departure.airport': departure,
            'arrival.airport': arrival,
        };

        if (date) {
            query['flightDate'] = date;
        }

        const flights = await Flight.find(query);

        if (flights.length === 0) {
            return res.status(404).json({ message: 'No flights found' });
        }

        res.json(flights);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
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

module.exports = {
  searchFlights,
  addFlight,
  updateFlight,
  deleteFlight,
};
