import React, { useState } from 'react';
import axios from 'axios';

const AccommodationForm = () => {
    const [addFormData, setAddFormData] = useState({
        externalId: '',
        name: '',
        city: '',
        location: '',
        accommodationType: '',
        description:'',
        image:'',
        rating:'',
    });

    const [updateFormData, setUpdateFormData] = useState({
        id: '',
        externalId: '',
        name: '',
        city: '',
        location: '',
        accommodationType: '',
        description:'',
        image:'',
        rating:'',
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
            const response = await axios.post('/add/accommodation', addFormData);
            console.log(response.data);
            resetAddFormData();
        } catch (error) {
            console.error('Error adding accommodation:', error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/update/accommodation/${updateFormData.id}`, updateFormData);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating accommodation:', error);
        }
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`/delete/accommodation/${deleteFormData.id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting accommodation:', error);
        }
    };

    const resetAddFormData = () => {
        setAddFormData({
            externalId: '',
            name: '',
            city: '',
            location: '',
            accommodationType: '',
            description:'',
            image:'',
            rating:'',
        });
    };

    return (
        <div>
            <h2>Add Accommodation</h2>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="externalId" value={addFormData.externalId} onChange={(e) => handleChange(e, setAddFormData)} placeholder="External ID" />
                <input type="text" name="name" value={addFormData.name} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Name" />
                <input type="text" name="city" value={addFormData.city} onChange={(e) => handleChange(e, setAddFormData)} placeholder="City" />
                <input type="text" name="location" value={addFormData.location} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Location" />
                <input type="text" name="accommodationType" value={addFormData.accommodationType} onChange={(e) => handleChange(e, setAddFormData)} placeholder="AccommodationType" />
                <input type="text" name="description" value={addFormData.description} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Description" />
                <input type="text" name="image" value={addFormData.image} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Image" />
                <input type="text" name="rating" value={addFormData.rating} onChange={(e) => handleChange(e, setAddFormData)} placeholder="Ratings" />
                <button type="submit">Add Accommodation</button>
            </form>

            <h2>Update Accommodation</h2>
            <form onSubmit={handleUpdateSubmit}>
                <input type="text" name="id" value={updateFormData.id} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Accommodation ID" />
                <input type="text" name="externalId" value={updateFormData.externalId} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="External ID" />
                <input type="text" name="name" value={updateFormData.name} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Name" />
                <input type="text" name="city" value={updateFormData.city} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="City" />
                <input type="text" name="location" value={updateFormData.location} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Location" />
                <input type="text" name="accommodationType" value={updateFormData.accommodationType} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="AccommodationType" />
                <input type="text" name="description" value={updateFormData.description} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Description" />
                <input type="text" name="image" value={updateFormData.image} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Image" />
                <input type="text" name="rating" value={updateFormData.rating} onChange={(e) => handleChange(e, setUpdateFormData)} placeholder="Ratings" />
                <button type="submit">Update Accommodation</button>
            </form>

            <div>
                <h2>Delete Accommodation</h2>
                <form onSubmit={handleDeleteSubmit}>
                    <input type="text" name="id" value={deleteFormData.id} onChange={(e) => handleChange(e, setDeleteFormData)} placeholder="Accommodation ID" />
                    <button type="submit">Delete Accommodation</button>
                </form>
            </div>
        </div>
    );
};

export default AccommodationForm;
