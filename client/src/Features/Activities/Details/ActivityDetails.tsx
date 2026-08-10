import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import type { Activity } from "../../../lib/types";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = { selectedActivity: Activity; cancelSelectActivity: () => void; openForm: (id: string) => void };

export default function ActivityDetails({ selectedActivity, cancelSelectActivity, openForm }: Props) {
const {activities} = useActivities();
  const activity = activities?.find(x => x.id === selectedActivity?.id);

  if (!activity) return <Typography>Activity not found</Typography>;

  return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia component="img" image={`/images/categoryImages/${activity.category}.jpg`} />
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography variant="subtitle1">{activity.date}</Typography>
            <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => openForm(activity.id)} color="primary">Edit</Button>
            <Button onClick={cancelSelectActivity} color="inherit">Cancel</Button>
        </CardActions>
    </Card>
  )
}
