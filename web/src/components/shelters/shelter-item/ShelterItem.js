import { Link } from 'react-router-dom';
import './ShelterItem.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

function ShelterItem({ shelter: {id, name, avatar, pets, description}}) {
    

    const useStyles = makeStyles({
        root: {
        maxWidth: 345,
        marginBottom: 50,    
        },
      });

      const classes = useStyles();

    return(
        
        <div>
            <Card className={classes.root}>
            
                <CardActionArea component={Link} to={`/shelters/${id}`}>
                    <CardMedia
                        component="img"
                        alt={name}
                        height="140"
                        image={avatar}
                        title="Contemplative Reptile"
                        />
                    <CardContent>
                        <h5 className="shelter-list-name" variant="h5" component="h2">{name}</h5>
                        <p variant="body2" color="textSecondary" component="p">{description}</p>
                        <div className="d-flex">
                            {pets.map((pet, i) => <Avatar className="me-3" key={i} alt={pet.nickName} src={pet.image} />)}
                        </div>
                    </CardContent>
                </CardActionArea>
                
                <CardContent>
                    {/* <span className="badge rounded-pill bg-success me-2">{city}</span> */}
                    {[...new Set(pets.map(p => p.specie))].map((specie, i) => <span key={i} className="badge rounded-pill bg-danger me-2">{specie}</span>)}
                </CardContent>
            </Card>
        </div>
        
        
    );
}

export default ShelterItem;

