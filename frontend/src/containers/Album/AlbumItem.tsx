import { Card, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants.ts';
import { Link } from 'react-router-dom';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  name: string,
  date: number,
  image: string | null,
  id: string,
}


const AlbumItem: React.FC<Props> = ({id, image, name, date}) => {

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
      <Card sx={{height: '100%'}}>
        <CardHeader title={name}/>
        <p>{date} г.</p>
        <ImageCardMedia image={cardImage} title={name}/>
      </Card>
    </Grid>
  );
};

export default AlbumItem;