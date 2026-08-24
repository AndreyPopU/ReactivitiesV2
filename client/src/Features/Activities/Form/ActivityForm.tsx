import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from "../../../App/shared/components/TextInput";
import SelectInput from "../../../App/shared/components/SelectInput";
import { CategoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../App/shared/components/DateTimeInput";

export default function ActivityForm() {
    const { control, reset, handleSubmit} = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const navigate = useNavigate();
    const {id} = useParams();
    const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);

    useEffect(() => {
        if (activity) reset({
            ...activity,
            city: activity.city,
            venue: activity.venue
        }) // If we have an activity, reset the form to that activity
    }, [activity, reset])

    const onSubmit = (data: ActivitySchema) => {
        try
        {
            if (activity)
            {
                updateActivity.mutate({...activity, ...data}, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                });
            }
            else
            {
                createActivity.mutate({...data }, 
                {
                    onSuccess: (id) => navigate(`/activities/${id}`),
                    onError: (error) => { console.error("Create activity failed:", error);}
                })
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }

    if (isLoadingActivity) return <Typography>Loading...</Typography>

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary">
            {activity ? 'Edit Activity' : 'Create Activity'}
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextInput label='Title' control={control} name='title' />
            <TextInput label='Description' control={control} name='description' multiline rows={3} />
            
            <Box sx={{display:'flex', gap:3}}>
                <SelectInput items={CategoryOptions} label='Category' control={control} name='category' />
                <DateTimeInput label='Date' control={control} name='date' />
            </Box>
            
            <TextInput label='City' control={control} name='city' />
            <TextInput label='Venue' control={control} name='venue' />

            
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                <Button color="inherit">Cancel</Button>
                <Button type="submit" color="success" variant="contained"
                disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
            </Box>
        </Box>
    </Paper>
)
}
