import React, { useState } from 'react';
import axios from 'axios';

const HotelForm = () => {
    const [addFormData, setAddFormData] = useState({
        externalId: '',
        name: '',
        cuisine: '',
        address: '',
        openingHours: ''
    });

    const [updateFormData, setUpdateFormData] = useState({
        id: '',
        externalId: '',
        name: '',
        cuisine: '',
        address: '',
        openingHours: ''
    });

    const [deleteFormData, setDeleteFormData] = useState({
        id: ''
    });

    const handleChange = (e, formDataSetter) => {
        const { name, value } = e.target;
        formDataSetter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/add/restaurant', addFormData);
            console.log(response.data);
            resetAddFormData();
        } catch (error) {
            console.error('Error adding restaurant:', error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/update/restaurant/${updateFormData.id}`, updateFormData);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating restaurant:', error);
        }
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`/delete/restaurant/${deleteFormData.id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    const resetAddFormData = () => {
        setAddFormData({
            externalId: '',
            name: '',
            cuisine: '',
            address: '',
            openingHours: ''
        });
    };

    return (
        <div>
            <h2>Add Restaurant</h2>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="externalId" value={addFormData.externalId} onChange={(e) => handleChange(e, setAddFormData)} placeholder="External ID" />
                <input type="text" name="name" value={addFormData.name} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Name" />
                <input type="text" name="cuisine" value={addFormData.cuisine} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Cuisine" />
                <input type="text" name="address" value={addFormData.address} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Address" />
                <input type="text" name="openingHours" value={addFormData.openingHours} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Opening Hours" />
                <button type="submit">Add Restaurant</button>
            </form>

            <h2>Update Restaurant</h2>
            <form onSubmit={handleUpdateSubmit}>
                <input type="text" name="id" value={updateFormData.id} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Restaurant ID" />
                <input type="text" name="externalId" value={updateFormData.externalId} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="External ID" />
                <input type="text" name="name" value={updateFormData.name} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Name" />
                <input type="text" name="cuisine" value={updateFormData.cuisine} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Cuisine" />
                <input type="text" name="address" value={updateFormData.address} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Address" />
                <input type="text" name="openingHours" value={updateFormData.openingHours} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Opening Hours" />
                <button type="submit">Update Restaurant</button>
            </form>

            <h2>Delete Restaurant</h2>
            <form onSubmit={handleDeleteSubmit}>
                <input type="text" name="id" value={deleteFormData.id} onChange={(e) => handleChange(e, setDeleteFormData)} placeholder="Restaurant ID" />
                <button type="submit">Delete Restaurant</button>
            </form>
        </div>
    );
};

export default HotelForm;
