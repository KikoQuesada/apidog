import { useParams, useHistory } from 'react-router';
import { useState, useEffect } from 'react';

import { detail } from '../../../services/users-service';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';

function UserDetail() {

    const history = useHistory();
    const params = useParams();

    const [user, setUser] = useState();

    useEffect(() => {
        const { id } = params;

            detail(id)
            .then(user => setUser(user))
            .catch(error => console.error(error));

            return () => {
                //Will Unmount???
            }



    }, [params, history])

    if(!user) {
        return null
    }



    const { rol, name, lastName, email, avatar, adoption } = user;

    const StyledPaper = withStyles({
        root: {
            backgroundColor: '#fafafa',

        }
    })(Paper);

    return (
        <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div>
                    <img alt={name} src={avatar}/>
                    <h2>{name}</h2>
                </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">

            </div>
        </div>
    );
}

export default UserDetail;