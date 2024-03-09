import { Button, Card, CardHeader, CardMedia, Grid, styled, Typography } from '@mui/material';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { Link } from 'react-router-dom';
import { apiURL } from '../../../constants.ts';
import React from 'react';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../app/usersSlice.ts';

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
    objectFit: 'cover',
});

interface Props {
    id: string,
    name: string,
    image: string | null,
    isPublished: boolean,
}

const ArtistItem: React.FC<Props> = ({name, image, id, isPublished}) => {
  const user = useAppSelector(selectUser);
  let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/' + image;
    }

    return (
        <Grid
          item sm md={6} lg={4}
          component={Link} to={'/albums/' + id}
          sx={{textDecoration: 'none', margin: '20px auto'}}
        >
            <Card sx={{height: '100%', border: '1px solid grey', borderBottom: 'none'}}>
              <Grid item sx={{display: 'flex', alignItems: 'center', padding: '0 30px'}}>
                {user?.role === 'admin' ?
                  <Grid>
                    <Button variant="outlined" color="error">Delete</Button>
                  </Grid>
                  : null
                }
                {user?.role === 'admin' && !isPublished ?
                  <Grid>
                    <Button variant="contained" color="success">Publish</Button>
                  </Grid>
                  : null
                }
                <CardHeader sx={{marginLeft: 'auto'}} title={name}/>
                <Typography sx={{marginLeft: 'auto', color: 'red'}}>{!isPublished ? 'unpublished' : null}</Typography>
              </Grid>
                <ImageCardMedia sx={{borderTop: '1px solid grey'}} image={cardImage} title={name}/>
            </Card>
        </Grid>
    );
};

export default ArtistItem;