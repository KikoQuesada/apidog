import sheltersService from '../../services/shelter-service';
import { useState, useEffect } from 'react';

function SheltersList() {

    const [state, setState] = useState({
        shelters: [],
        loading: false
    });

    useEffect(() => {

        async function fetchShelters() {
            console.log('Fetching the Shelters!!')
            setState(state => ({
                ...state,
                loading: true
            }))
            const shelters = await sheltersService.list();
            if (!isUnmounted) {
                setState({
                    shelters: shelters,
                    loading: false
                })
            }
        }
        
        let isUnmounted = false;
        fetchShelters();

        return () => {
            isUnmounted = false;
        }
    });

    const { shelters } = state;

    return (
        <div className="row row-cols-4">
            {shelters.map(shelter => (
                <div key={shelter.id}>{shelter}</div>
            ))}
        </div>
    )




    
}

export default SheltersList;