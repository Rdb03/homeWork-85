import { Button, Card, CardHeader, CardMedia, Grid, styled, Typography } from '@mui/material';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants.ts';
import { Link } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../app/usersSlice.ts';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  name: string,
  date: number,
  image: string | null,
  id: string,
  isPublished: boolean,
}


const AlbumItem: React.FC<Props> = ({id, image, name, date, isPublished}) => {
  const user = useAppSelector(selectUser);
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid
      item sm md={6} lg={4}
      component={Link} to={'/tracks/' + id}
      sx={{textDecoration: 'none', margin: '20px auto'}}
    >
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
      <Card sx={{height: '100%'}}>
        <CardHeader sx={{marginLeft: 'auto'}} title={name}/>
        <Typography sx={{marginLeft: 'auto', color: 'red'}}>{!isPublished ? 'unpublished' : null}</Typography>
        <p>{date} г.</p>
        <ImageCardMedia image={cardImage} title={name}/>
      </Card>
    </Grid>
  );
};

export default AlbumItem;