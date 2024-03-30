import React, { useState } from 'react';
import axios from 'axios';

const PackageForm = () => {
    const [addFormData, setAddFormData] = useState({
        name: '',
        description: '',
        destinations: '',
        duration: '',
        price: '',
        startDate: '',
        endDate: '',
        includes: '',
        excludes: '',
        activities: '',
        image: '',
        availability: '',
        tags: '',
        promotionalInfo: ''
    });

    const [updateFormData, setUpdateFormData] = useState({
        id: '',
        name: '',
        description: '',
        destinations: '',
        duration: '',
        price: '',
        startDate: '',
        endDate: '',
        includes: '',
        excludes: '',
        activities: '',
        image: '',
        availability: '',
        tags: '',
        promotionalInfo: ''
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
            const response = await axios.delete(`/delete/package/${deleteFormData.id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting package:', error);
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
            const response = await axios.post('/add/package', addFormData);
            console.log(response.data);
            resetAddFormData();
        } catch (error) {
            console.error('Error adding package:', error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/update/package/${updateFormData.id}`, updateFormData);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating package:', error);
        }
    };

    const resetAddFormData = () => {
        setAddFormData({
            name: '',
            description: '',
            destinations: '',
            duration: '',
            price: '',
            startDate: '',
            endDate: '',
            includes: '',
            excludes: '',
            activities: '',
            image: '',
            availability: '',
            tags: '',
            promotionalInfo: ''
        });
    };

    return (
        <div>
            <h2>Add Package</h2>
            <form onSubmit={handleAddSubmit}>
                <input type="text" name="name" value={addFormData.name} onChange={handleAddChange} placeholder="Package Name" />
                <textarea name="description" value={addFormData.description} onChange={handleAddChange} placeholder="Description"></textarea>
                <input type="text" name="destinations" value={addFormData.destinations} onChange={handleAddChange} placeholder="Destinations" />
                <input type="text" name="duration" value={addFormData.duration} onChange={handleAddChange} placeholder="Duration" />
                <input type="text" name="price" value={addFormData.price} onChange={handleAddChange} placeholder="Price" />
                <input type="date" name="startDate" value={addFormData.startDate} onChange={handleAddChange} placeholder="Start Date" />
                <input type="date" name="endDate" value={addFormData.endDate} onChange={handleAddChange} placeholder="End Date" />
                <textarea name="includes" value={addFormData.includes} onChange={handleAddChange} placeholder="Includes"></textarea>
                <textarea name="excludes" value={addFormData.excludes} onChange={handleAddChange} placeholder="Excludes"></textarea>
                <textarea name="activities" value={addFormData.activities} onChange={handleAddChange} placeholder="Activities"></textarea>
                <input type="text" name="image" value={addFormData.image} onChange={handleAddChange} placeholder="Image URL" />
                <input type="text" name="availability" value={addFormData.availability} onChange={handleAddChange} placeholder="Availability" />
                <input type="text" name="tags" value={addFormData.tags} onChange={handleAddChange} placeholder="Tags" />
                <input type="text" name="promotionalInfo" value={addFormData.promotionalInfo} onChange={handleAddChange} placeholder="Promotional Info" />
                <button type="submit">Add Package</button>
            </form>

            <h2>Update Package</h2>
            <form onSubmit={handleUpdateSubmit}>
                <input type="text" name="id" value={updateFormData.id} onChange={handleUpdateChange} placeholder="Package ID" />
                {/* Input fields for updating package */}
                <input type="text" name="name" value={updateFormData.name} onChange={handleUpdateChange} placeholder="Package Name" />
                <textarea name="description" value={updateFormData.description} onChange={handleUpdateChange} placeholder="Description"></textarea>
                <input type="text" name="destinations" value={updateFormData.destinations} onChange={handleUpdateChange} placeholder="Destinations" />
                <input type="text" name="duration" value={updateFormData.duration} onChange={handleUpdateChange} placeholder="Duration" />
                <input type="text" name="price" value={updateFormData.price} onChange={handleUpdateChange} placeholder="Price" />
                <input type="date" name="startDate" value={updateFormData.startDate} onChange={handleUpdateChange} placeholder="Start Date" />
                <input type="date" name="endDate" value={updateFormData.endDate} onChange={handleUpdateChange} placeholder="End Date" />
                <textarea name="includes" value={updateFormData.includes} onChange={handleUpdateChange} placeholder="Includes"></textarea>
                <textarea name="excludes" value={updateFormData.excludes} onChange={handleUpdateChange} placeholder="Excludes"></textarea>
                <textarea name="activities" value={updateFormData.activities} onChange={handleUpdateChange} placeholder="Activities"></textarea>
                <input type="text" name="image" value={updateFormData.image} onChange={handleUpdateChange} placeholder="Image URL" />
                <input type="text" name="availability" value={updateFormData.availability} onChange={handleUpdateChange} placeholder="Availability" />
                <input type="text" name="tags" value={updateFormData.tags} onChange={handleUpdateChange} placeholder="Tags" />
                <input type="text" name="promotionalInfo" value={updateFormData.promotionalInfo} onChange={handleUpdateChange} placeholder="Promotional Info" />
                <button type="submit">Update Package</button>
            </form>

            <div>
                <h2>Delete Package</h2>
                <form onSubmit={handleDeleteSubmit}>
                    <input type="text" name="id" value={deleteFormData.id} onChange={handleDeleteChange} placeholder="Package ID" />
                    <button type="submit">Delete Package</button>
                </form>
            </div>
        </div>
    );
};

export default PackageForm;
