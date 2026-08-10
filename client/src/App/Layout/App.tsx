import { Box, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react"
import type { Activity } from '../../lib/types';

import axios from "axios";
import Navbar from "./Navbar";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";

function App() {
const [activities, SetActivities] = useState<Activity[]>([]);
const [selectedActivity, SetSelectedActivity] = useState<Activity | undefined>(undefined);
const [editMode, SetEditMode] = useState(false);

useEffect(() => {
  axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(response => SetActivities(response.data))
  return () => {}
}, [])

  const handleSelectActivity = (id: string) => {
    SetSelectedActivity(activities.find(x => x.id === id) || undefined);
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) // If activity exists, update it
    {
      // If the id of the activity matches an existing activity, update that activity
      SetActivities(activities.map(x => x.id === activity.id ? activity : x));
    }
    else // If activity does not exist, create it
    {
      const newActivity = {...activity, id: crypto.randomUUID()};
      SetSelectedActivity(newActivity);
      SetActivities([...activities, newActivity]);
    }

    SetEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    // Filters all activities that don't match the id of the activity to be deleted and sets the activities state to the filtered list
    SetActivities(activities.filter(x => x.id !== id)); 
  }

  return(
    <Box sx={{bgcolor: '#eeeeee'}}>
    <CssBaseline />
    <Navbar openForm={handleOpenForm} />
    <Container maxWidth='xl' sx={{ mt: 3 }}>
      <ActivityDashboard 
      activities={activities} 
      selectActivity = {handleSelectActivity}
      cancelSelectActivity = {handleCancelSelectActivity}
      selectedActivity={selectedActivity} 
      editMode={editMode}
      openForm={handleOpenForm}
      closeForm={handleCloseForm}
      submitForm={handleSubmitForm}
      deleteActivity={handleDeleteActivity}
      />
    </Container>
    </Box>
    
  )
}

export default App
