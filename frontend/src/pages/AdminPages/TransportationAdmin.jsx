import React, { useState } from 'react';
import axios from 'axios';

const TransportationForm = () => {
    const [addFormData, setAddFormData] = useState({
        externalId: '',
        brand: '',
        owner: '',
        plateNo: '',
        color: '',
        capacity: '',
        numberOfPassengers: '',
        driverID: '',
        drivername: ''
    });

    const [updateFormData, setUpdateFormData] = useState({
        id: '',
        externalId: '',
        brand: '',
        owner: '',
        plateNo: '',
        color: '',
        capacity: '',
        numberOfPassengers: '',
        driverID: '',
        drivername: ''
    });

    const [deleteFormData, setDeleteFormData] = useState({
        id: ''
    });

    const handleDeleteChange = (e) => {
        const { name, value } = e.target;
        setDeleteFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`/delete/Transportation/${deleteFormData.id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting transportation:', error);
        }
    };
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/add/transportation', addFormData);
            console.log(response.data);
            setAddFormData({
                externalId: '',
                brand: '',
                owner: '',
                plateNo: '',
                color: '',
                capacity: '',
                numberOfPassengers: '',
                driverID: '',
                drivername: ''
            });
        } catch (error) {
            console.error('Error adding transportation:', error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/update/transportation/${updateFormData.id}`, updateFormData);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating transportation:', error);
        }
    };

    return (
        <div>
            <h2>Add Transportation</h2>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="externalId" value={addFormData.externalId} onChange={handleAddChange} placeholder="External ID" />
                <input type="text" name="brand" value={addFormData.brand} onChange={handleAddChange} placeholder="Brand" />
                <input type="text" name="owner" value={addFormData.owner} onChange={handleAddChange} placeholder="Owner" />
                <input type="text" name="plateNo" value={addFormData.plateNo} onChange={handleAddChange} placeholder="Plate Number" />
                <input type="text" name="color" value={addFormData.color} onChange={handleAddChange} placeholder="Color" />
                <input type="number" name="capacity" value={addFormData.capacity} onChange={handleAddChange} placeholder="Capacity" />
                <input type="number" name="numberOfPassengers" value={addFormData.numberOfPassengers} onChange={handleAddChange} placeholder="Number of Passengers" />
                <input type="text" name="driverID" value={addFormData.driverID} onChange={handleAddChange} placeholder="Driver ID" />
                <input type="text" name="drivername" value={addFormData.drivername} onChange={handleAddChange} placeholder="Driver Name" />
                <button type="submit">Add Transportation</button>
            </form>

            <h2>Update Transportation</h2>
            <form onSubmit={handleUpdateSubmit}>
                <input type="text" name="id" value={updateFormData.id} onChange={handleUpdateChange} placeholder="Transportation ID" />
                {/* Input fields for updating transportation */}
                <input type="text" name="externalId" value={updateFormData.externalId} onChange={handleUpdateChange} placeholder="External ID" />
                <input type="text" name="brand" value={updateFormData.brand} onChange={handleUpdateChange} placeholder="Brand" />
                <input type="text" name="owner" value={updateFormData.owner} onChange={handleUpdateChange} placeholder="Owner" />
                <input type="text" name="plateNo" value={updateFormData.plateNo} onChange={handleUpdateChange} placeholder="Plate Number" />
                <input type="text" name="color" value={updateFormData.color} onChange={handleUpdateChange} placeholder="Color" />
                <input type="number" name="capacity" value={updateFormData.capacity} onChange={handleUpdateChange} placeholder="Capacity" />
                <input type="number" name="numberOfPassengers" value={updateFormData.numberOfPassengers} onChange={handleUpdateChange} placeholder="Number of Passengers" />
                <input type="text" name="driverID" value={updateFormData.driverID} onChange={handleUpdateChange} placeholder="Driver ID" />
                <input type="text" name="drivername" value={updateFormData.drivername} onChange={handleUpdateChange} placeholder="Driver Name" />
                <button type="submit">Update Transportation</button>
            </form>
            <div>
            <h2>Delete Transportation</h2>
            <form onSubmit={handleDeleteSubmit}>
                <input type="text" name="id" value={deleteFormData.id} onChange={handleDeleteChange} placeholder="Transportation ID" />
                <button type="submit">Delete Transportation</button>
            </form>
        </div>
        </div>
    );
};

export default TransportationForm;
