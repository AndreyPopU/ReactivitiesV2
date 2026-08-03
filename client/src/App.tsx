import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import type { Activity } from './lib/types';
import axios from "axios";

function App() {
const [activities, SetActivities] = useState<Activity[]>([]);

useEffect(() => {
  axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(response => SetActivities(response.data))
  return () => {}
}, [])

  return(
    <>
      <Typography variant='h3'>Reactivities</Typography>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText>{activity.title}</ListItemText>
            </ListItem>
          ))}
        </List>
    </>
    
  )
}

export default App
