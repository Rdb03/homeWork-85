import { Button, Card, CardHeader, CardMedia, Grid, styled, Typography } from '@mui/material';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants.ts';
import { Link } from 'react-router-dom';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../app/usersSlice.ts';
import { deleteAlbum, fetchAlbums, patchAlbum } from '../../app/albumThunk.ts';

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
  const dispatch = useAppDispatch();
  const url = window.location.href;
  const idArtist = url.substring(url.lastIndexOf('/') + 1);
  const user = useAppSelector(selectUser);
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  const albumDelete = async () => {
    if(user) {
      const token = user.token;
      await dispatch(deleteAlbum({id, token}));
      await dispatch(fetchAlbums(idArtist));
    }
  };

  const albumPatch = async () => {
    if(user) {
      const token = user.token;
      await dispatch(patchAlbum({id, token}));
      await dispatch(fetchAlbums(idArtist));
    }
  };

  return (
    <Grid
      item sm md={6} lg={4}
      sx={{textDecoration: 'none', margin: '20px auto'}}
    >
      <Grid sx={{display: 'flex'}}>
        <CardHeader sx={{marginLeft: 'auto'}} title={name}/>
        <Typography sx={{marginLeft: 'auto', color: 'red'}}>{!isPublished ? 'unpublished' : null}</Typography>
        <p>{date} г.</p>
        {user?.role === 'admin' ?
          <Grid>
            <Button variant="outlined" color="error" onClick={albumDelete} >Delete</Button>
          </Grid>
          : null
        }
        {user?.role === 'admin' && !isPublished ?
          <Grid>
            <Button variant="contained" color="success" onClick={albumPatch}>Publish</Button>
          </Grid>
          : null
        }
      </Grid>
      <Card component={Link} to={'/tracks/' + id} sx={{height: '100%'}}>
        <ImageCardMedia image={cardImage} title={name}/>
      </Card>
    </Grid>
  );
};

export default AlbumItem;