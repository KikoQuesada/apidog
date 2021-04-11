import sheltersService from '../../../services/shelter-service';
import { useState, useEffect } from 'react';
import './SheltersList.css';
import ShelterItem from './../shelter-item/ShelterItem';


function SheltersList() {
    
    const [data, setData] = useState({
        loading: true, 
        shelters: []
    })

    useEffect(() =>{

        setTimeout(() => {
            sheltersService.list()
                .then(shelters=> setData({
                    shelters,
                    loading: false
                }))
                .catch(error => console.error(error))
        }, 2000)

    }, [])

    
    

    
    const { shelters} = data;

    if(data.loading === true) {
        return <img className="shelter-bounce-icon" src="https://res.cloudinary.com/getapet/image/upload/v1617961423/loading_shelters_as4to9.png" alt="shelter"/>
                
    }

    return (
        <div className="row row-cols-2">
            {shelters.map(shelter => (
                <div key={shelter.id}><ShelterItem shelter={shelter}/></div>
            ))}
        </div>
    );
}







export default SheltersList;