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
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [blurTimer, setBlurTimer] = useState(null);

	useEffect(() => 
	{
		const delayDebounceFn = setTimeout(() =>
		{
			if(searchTerm)
			{
				handleSearch();
			}
			else
			{
				setSearchResults([]);
			}
		}, 300);

		return () => 
		{
			clearTimeout(delayDebounceFn);

			if (blurTimer)
			{
				clearTimeout(blurTimer);
			}
		};
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

	const handleAddressClick = (address) =>
	{
		setSelectedAddress(address);
		setSearchTerm(address);
		setIsOpen(false);
	};

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
		setIsOpen(true);
	}

	const handleBlur = () => 
	{
		const timer = setTimeout(() => {
			setIsOpen(false);
		}, 200); setBlurTimer(timer);
	};

	return (
        <div className="form-group">
            <input
				className="form-control"
                type="text"
                placeholder="Entrez une adresse"
                value={searchTerm}
                onChange={handleInputChange}
				onBlur = {handleBlur}
            />

			{isOpen && (<ul>
                {searchResults.map((result) => (<li key={result.properties.id} onClick={() =>
				handleAddressClick(result.properties.label)}
				style = {{cursor:"pointer"}}
					>{result.properties.label}</li>
                ))}
            </ul>)}
        </div>
    );
}

export default AddressSearch;
