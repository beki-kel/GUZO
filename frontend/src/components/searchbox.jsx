import React, { useEffect, useState } from 'react';
import { AutoComplete } from "primereact/autocomplete";

const cities = [
    { name: 'Addis Ababa' },
    { name: 'Dire Dawa' },
    { name: 'Mekelle' },
    { name: 'Gondar' },
    { name: 'Bahir Dar' },
    { name: 'Adama' },
    { name: 'Hawassa' },
    { name: 'Harar' },
    { name: 'Jimma' },
    { name: 'Debre Markos' },
    // Add more cities as needed
];

export default function SearchBox() {
    const [filteredCities, setFilteredCities] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const search = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredCities;
            if (!event.query.trim().length) {
                _filteredCities = [...cities];
            }
            else {
                _filteredCities = cities.filter((city) => {
                    return city.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredCities(_filteredCities);
        }, 250);
    }

    return (
        <div className="card flex justify-content-center">
            <AutoComplete field="name" value={selectedCity} suggestions={filteredCities} completeMethod={search} onChange={(e) => setSelectedCity(e.value)} />
        </div>
    )
}