import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchArtist } from '../../app/artistThunk';
import { Grid, Typography } from '@mui/material';
import ArtistItem from './ArtistItem';
import { selectArtists } from '../../app/artistSlice.ts';

const Artist = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);

    useEffect(() => {
        dispatch(fetchArtist());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item sx={{width: "100%"}}>
                    <Typography sx={{margin: '0 auto', fontWeight: 'bold'}} variant="h4">Artists</Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={2}>
                {artists.map(artist => (
                    <ArtistItem
                      key={artist._id}
                      id={artist._id}
                      name={artist.name}
                      image={artist.image}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default Artist;