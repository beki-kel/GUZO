import React, { useState } from 'react';
import axios from 'axios';

const ThingsToDoForm = () => {
    const [addFormData, setAddFormData] = useState({
        name: '',
        description: '',
        location: '',
        category: '',
        price: '',
        duration: '',
        rating: '',
        reviews: '',
        image: ''
    });

    const [updateFormData, setUpdateFormData] = useState({
        id: '',
        name: '',
        description: '',
        location: '',
        category: '',
        price: '',
        duration: '',
        rating: '',
        reviews: '',
        image: ''
    });

    const [deleteId, setDeleteId] = useState('');

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
            const response = await axios.post('/addThingsToDo', addFormData);
            console.log(response.data);
            setAddFormData({
                name: '',
                description: '',
                location: '',
                category: '',
                price: '',
                duration: '',
                rating: '',
                reviews: '',
                image: ''
            });
        } catch (error) {
            console.error('Error adding thing to do:', error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/updateThingsToDo/${updateFormData.id}`, updateFormData);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating thing to do:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/deleteThingsToDo/${deleteId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting thing to do:', error);
        }
    };

    return (
        <div>
            <h2>Add Things to Do</h2>
            <form onSubmit={handleAddSubmit}>
                {/* Input fields for adding things to do */}
                <input type="text" name="name" value={addFormData.name} onChange={handleAddChange} placeholder="Name" />
                <input type="text" name="description" value={addFormData.description} onChange={handleAddChange} placeholder="Description" />
                <input type="text" name="location" value={addFormData.location} onChange={handleAddChange} placeholder="Location" />
                <input type="text" name="category" value={addFormData.category} onChange={handleAddChange} placeholder="Category" />
                <input type="number" name="price" value={addFormData.price} onChange={handleAddChange} placeholder="Price" />
                <input type="text" name="duration" value={addFormData.duration} onChange={handleAddChange} placeholder="Duration" />
                <input type="number" name="rating" value={addFormData.rating} onChange={handleAddChange} placeholder="Rating" />
                <input type="number" name="reviews" value={addFormData.reviews} onChange={handleAddChange} placeholder="Reviews" />
                <input type="text" name="image" value={addFormData.image} onChange={handleAddChange} placeholder="Image URL" />
                <button type="submit">Add Things to Do</button>
            </form>

            <h2>Update Things to Do</h2>
            <form onSubmit={handleUpdateSubmit}>
                <input type="text" name="id" value={updateFormData.id} onChange={handleUpdateChange} placeholder="ID" />
                {/* Input fields for updating things to do */}
                <input type="text" name="name" value={updateFormData.name} onChange={handleUpdateChange} placeholder="Name" />
                <input type="text" name="description" value={updateFormData.description} onChange={handleUpdateChange} placeholder="Description" />
                <input type="text" name="location" value={updateFormData.location} onChange={handleUpdateChange} placeholder="Location" />
                <input type="text" name="category" value={updateFormData.category} onChange={handleUpdateChange} placeholder="Category" />
                <input type="number" name="price" value={updateFormData.price} onChange={handleUpdateChange} placeholder="Price" />
                <input type="text" name="duration" value={updateFormData.duration} onChange={handleUpdateChange} placeholder="Duration" />
                <input type="number" name="rating" value={updateFormData.rating} onChange={handleUpdateChange} placeholder="Rating" />
                <input type="number" name="reviews" value={updateFormData.reviews} onChange={handleUpdateChange} placeholder="Reviews" />
                <input type="text" name="image" value={updateFormData.image} onChange={handleUpdateChange} placeholder="Image URL" />
                <button type="submit">Update Things to Do</button>
            </form>

            <div>
                <h2>Delete Things to Do</h2>
                <input type="text" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder="ID" />
                <button onClick={handleDelete}>Delete Things to Do</button>
            </div>
        </div>
    );
};

export default ThingsToDoForm;
