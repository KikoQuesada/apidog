import petService from '../../../services/pet-service';
import { useState, useEffect} from 'react';
import './PetsList.css'
import PetItem from './../pet-item/Petitem';

function PetsList() {

    const [data, setData] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {

        setTimeout(() => {
            petService.list()
                .then(pets => setData({
                    pets, 
                    loading: false
                }))
                .catch(error => console.error(error))
        }, 2000)

    }, [])

    const { pets } = data;

    if(data.loading) {
        return <img className="pet-bounce-icon" src="https://res.cloudinary.com/getapet/image/upload/v1617958203/dog_paw_auipy7.jpg" alt="shelter"/>
    }


    return(
        <div className="container">
            <div className="row">
                {pets.map(pet => (
                    <div className="card col-md-6 col-lg-3 col-sm-12" key={pet.id}><PetItem pet={pet}/></div>
                )).sort(pets.createdAt)}
            
            </div>
        </div>
        
    );
}

export default PetsList;