import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import ProfilePhotos from "./ProfilePhotos";
import { useParams } from "react-router";
import ProfileAbout from "./ProfileAbout";
import ImageDropzone from "./ImageDropzone";
import ProfileFollowings from "./ProfileFollowings";

export default function ProfileContent() {
    const [value, setValue] = useState(0);
    const { id } = useParams();

    const handleChange = (_: SyntheticEvent, newValue: number) => { setValue(newValue) }

    const tabContent = [
        { label: 'About', content: <div><ProfileAbout /></div> },
        { label: 'Photos', content: <ProfilePhotos id={id!}/> },
        { label: 'Events', content: <div><ImageDropzone /></div> },
        { label: 'Followers', content: <div><ProfileFollowings activeTab={value}/></div> },
        { label: 'Following', content: <div><ProfileFollowings activeTab={value}/></div> },
    ]
    return (
        <Box component={Paper} sx={{
            mt: 2, p: 3, elevation: 3, height: 500,
            display: 'flex', alignItems: 'flex-start', borderRadius: 3
        }}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, height: 450, minWidth: 200 }}
            >
                {tabContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} sx={{ mr: 3 }} />
                ))}
            </Tabs>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {tabContent[value].content}
            </Box>
        </Box>
    )
}
