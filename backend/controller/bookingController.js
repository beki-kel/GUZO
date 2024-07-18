const Booking = require('../models/BookingModel');
const EventBooking = require('../models/EventBooking');
const FlightBooking = require('../models/FlightBooking');
const HotelBooking = require('../models/HotelBookingModel');
const TransportationBooking = require('../models/TransportationBooking');
const PackageBooking = require('../models/PackageBooking');

// Create a new booking
const AddBooking = async (req, res) => {
    try {
        const { userId, type, details } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'Invalid user' });
        }

        let bookingDetails;
        let typeDetails;
        
        switch (type) {
                case 'hotel':
                        bookingDetails = new HotelBooking(details);
                        typeDetails = 'HotelBooking';
                        break;
                case 'flight':
                        bookingDetails = new FlightBooking(details);
                        typeDetails = 'FlightBooking';
                        break;
                case 'transportation':
                        bookingDetails = new TransportationBooking(details);
                        typeDetails = 'TransportationBooking';
                        break;
                case 'event':
                        bookingDetails = new EventBooking(details);
                        typeDetails = 'EventBooking';
                        break;
                case 'package':
                        bookingDetails = new PackageBooking(details);
                        typeDetails = 'PackageBooking';
                        break;
                default:
                        return res.status(400).json({ message: 'Invalid booking type' });
        }

        await bookingDetails.save();

        const booking = new Booking({
                user: userId,
                type,
                status: 'pending',
                details: bookingDetails._id,
                typeDetails
        });

        await booking.save();

        // Update the specific booking detail with the booking reference
        bookingDetails.booking = booking._id;
        await bookingDetails.save();

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all bookings
const GetAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('details');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get booking by ID
const GetBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('details');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get bookings specific to a user
const GetUserBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ user: userId }).populate('details');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update booking status
const UpdateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete booking
const DeleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Delete the associated booking details
        switch (booking.typeDetails) {
            case 'HotelBooking':
                await HotelBooking.findByIdAndDelete(booking.details);
                break;
            case 'FlightBooking':
                await FlightBooking.findByIdAndDelete(booking.details);
                break;
            case 'TransportationBooking':
                await TransportationBooking.findByIdAndDelete(booking.details);
                break;
            case 'EventBooking':
                await EventBooking.findByIdAndDelete(booking.details);
                break;
            case 'PackageBooking':
                await PackageBooking.findByIdAndDelete(booking.details);
                break;
        }

        res.status(200).json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    AddBooking,
    GetAllBookings,
    GetBookingById,
    UpdateBookingStatus,
    DeleteBooking,
    GetUserBookings,
}


