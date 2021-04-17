import { useState } from 'react';
import './PetFilter.css';


function PetFilter({ className, onSearch, loading }) {

    const [filter, setFilter] = useState('');

    const handleChange = (event) => {
        const { value } = event.target
        setFilter(value);
        onSearch(value);
    }


    return (
        <div className="p-1 bg-white rounded rounded-pill shadow mb-4 pet-search-bar">
            <div className="input-group">
                <input type="search" name="race" placeholder="Search by Race..." aria-describedby="button-addon1" className="form-control border-0 bg-white" 
                    value={filter} onChange={handleChange}/>
                <div className="input-group-append">
                    <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className={`fa fa-${loading ? 'refresh fa-spin': 'search'}`}></i></button>
                </div>
            </div>
        </div>

    );
}


PetFilter.defaultProps = {
    loading: false,
    className: '',
    onSearch: () => {}
}



export default PetFilter;

