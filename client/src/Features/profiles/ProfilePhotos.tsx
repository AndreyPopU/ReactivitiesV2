import { Box, Button, CardMedia, Grid } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { Delete, Edit } from "@mui/icons-material";
import ImageDropzone from "./ImageDropzone";

type ProfilePhotosProps = {
    id: string
}

export default function ProfilePhotos({ id }: ProfilePhotosProps) {
    const { photosQuery, deletePhoto } = useProfile(id);

    return (
        <Grid container spacing={2}>
            <Grid size={3} sx={{alignContent:"center", alignItems:"center", textAlign:"center"}}>
                <ImageDropzone />
            </Grid>

            <Grid size={6}>
                <Box sx={{ position: 'relative', flexDirection: 'row', display: "flex" }}>
                    {photosQuery.data?.map(photo => (
                        <Box key={photo.id} sx={{ position: 'relative', width: 256, height: 256 }}>
                            <CardMedia component="img" key={photo?.id} src={photo?.url} alt="My image"
                                sx={{ width: 256, height: 256, objectFit: 'cover', p: 1 }} />

                            <Box sx={{
                                position: 'absolute', top: 10, right: 10, left: 10,
                                justifyContent: "space-between", display: 'flex'
                            }}>
                                <Button variant="contained" sx={{
                                    width: 40, height: 40, minWidth: 40, padding: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Edit /> </Button>
                                <Button variant="contained" color="error"
                                    sx={{ width: 40, height: 40, minWidth: 40, padding: 0 }}
                                    disabled={deletePhoto.isPending}
                                    onClick={() => deletePhoto.mutate(photo)}>
                                    <Delete /> </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Grid>

            <Grid size={3}>

            </Grid>
        </Grid>
    )
}
