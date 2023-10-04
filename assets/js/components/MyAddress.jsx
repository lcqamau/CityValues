import React, { useState, useEffect } from 'react';
import axios from "axios";

async function searchAddress(address)
{
	const apiUrl = "https://api-adresse.data.gouv.fr/search/?q="+address;
	try
	{
		const response = await axios.get(apiUrl);
		return response.data;
	}
	
	catch (error)
	{
		throw error;
	}
}

function AddressSearch()
{
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => 
	{
		const delayDebounceFn = setTimeout(() => {
			if(searchTerm)
			{
				handleSearch();
			}
			else
			{
				setSearchResults([]);
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	const handleSearch = async () => 
	{
		try
		{
			const data = await searchAddress(searchTerm);
			setSearchResults(data.features);
		}

		catch (error)
		{
			console.error("Erreur lors de la recherche d\'adresse:", error);
		}
	};

	return (
        <div>
            <input
                type="text"
                placeholder="Entrez une adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {searchResults.map((result) => (
                    <li key={result.properties.id}>{result.properties.label}</li>
                ))}
            </ul>
        </div>
    );
}

export default AddressSearch;
