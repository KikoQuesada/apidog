import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import PetForm from '../components/pets/pet-form/PetForm'


function EditPet() {
    return (
        <PetForm />
    );
}

export default EditPet;