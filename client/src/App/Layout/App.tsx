import { Box, Container, CssBaseline, Typography } from "@mui/material";
import {  useState } from "react"
import type { Activity } from '../../lib/types';

import Navbar from "./Navbar";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
const [selectedActivity, SetSelectedActivity] = useState<Activity | undefined>(undefined);
const [editMode, SetEditMode] = useState(false);
const {activities, isPending} = useActivities();

  const handleSelectActivity = (id: string) => {
    SetSelectedActivity(activities!.find(x => x.id === id) || undefined);
  }

  const handleCancelSelectActivity = () => {
    SetSelectedActivity(undefined);
  }

  const handleOpenForm = (id? : string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    SetEditMode(true);
  }

  const handleCloseForm = () =>
  {
    SetEditMode(false);
  }

  return(
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
    <CssBaseline />
    <Navbar openForm={handleOpenForm} />
    <Container maxWidth='xl' sx={{ mt: 3 }}>
      { !activities || isPending ? (
        <Typography>Loading...</Typography>
      ) : (
        <ActivityDashboard 
        activities={activities} 
        selectActivity = {handleSelectActivity}
        cancelSelectActivity = {handleCancelSelectActivity}
        selectedActivity={selectedActivity} 
        editMode={editMode}
        openForm={handleOpenForm}
        closeForm={handleCloseForm}
        />
      )}
      
    </Container>
    </Box>
    
  )
}

export default App