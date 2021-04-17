import petService from '../../../services/pet-service';
import { useState, useEffect, useRef } from 'react';
import './PetsList.css'
import PetItem from './../pet-item/Petitem';
import PetFilter from '../pet-filter/PetFilter';

function PetsList() {

    const [data, setData] = useState({
        data: [],
        loading: true
    });

    const [search, setSearch] = useState('');

    const timeOutRef = useRef(null);

    useEffect(() => {
        window.clearTimeout(timeOutRef.current)

        timeOutRef.current =  window.setTimeout(() => {
            petService.list(search)
                .then(pets => setData({
                    pets, 
                    loading: false
                }))
                .catch(error => console.error(error))
        }, 2000)

    }, [search])


    const handleSearch = search => setSearch(search);

    const { pets, loading } = data;

    if(data.loading) {
        return <img className="pet-bounce-icon" src="https://res.cloudinary.com/getapet/image/upload/v1618592512/loading_paw_bp3h3s.png" alt="shelter"/>
    }


    return(
        <div className="container">
            <div className="pet-search-container">
                <PetFilter onSearch={handleSearch} loading={loading}/>
            </div>
            <div className="row">
                {pets.map(pet => (
                    <div className="card col-md-6 col-lg-3 col-sm-12" key={pet.id}><PetItem pet={pet}/></div>
                )).sort(pets.createdAt)}
            
            </div>
        </div>
        
    );
}

export default PetsList;