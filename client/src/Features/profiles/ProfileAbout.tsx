import { Done, Edit } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";

export default function ProfileAbout() {
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    const { profile, changeBio } = useProfile(id);
    const [bioText, setBioText] = useState("");

    useEffect(() => {
        setBioText(profile?.bio ?? "");
    }, [profile?.bio]);

    return (
        <>
            <Typography variant="h5" >Profile Bio</Typography>

            <Box sx={{ position: 'relative', mt: 3 }}>
                {isEditing ? (
                    <TextField fullWidth onChange={e => setBioText(e.target.value)} value={bioText} />
                ) : (
                    <Typography sx={{ textAlign: 'left' }}>{profile?.bio}</Typography>
                )}

                <Button sx={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={() => {
                        if (isEditing) changeBio.mutate(bioText);

                        setIsEditing(!isEditing)
                    }

                    }>
                    {isEditing ? (<Done />) : (<Edit />)}
                </Button>
            </Box>
        </>
    )
}
