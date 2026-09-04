import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import type { Activity } from "../../../lib/types";
import { Link } from "react-router";
import { AccessTime, Place } from "@mui/icons-material";
import { formatDate } from "../../../lib/util/util";
import AvatarPopover from "../../../App/shared/components/AvatarPopover";

type Props = { activity: Activity; };

export default function ActivityCard({ activity }: Props) {
    const label = activity.isHost ? "You are hosting" : "You are going";
    const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default';

return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
        {/* Header */}
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <CardHeader
    avatar={<Avatar sx={{ height: 80, width: 80 }} />}
    title={activity.title}
    titleTypographyProps={{
        fontWeight: 'bold',
        fontSize: '20px'
    }}
    subheader={
        <>
            Hosted By{' '}
            <Link to={`/profiles/${activity.hostId}}`}>
                {activity.hostDisplayName}
            </Link>
        </>
    }
/>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mr: 2
                }}
            >
                {(activity.isHost || activity.isGoing) && (
                    <Chip
                        label={label}
                        color={color}
                        sx={{ borderRadius: 2 }}
                        variant="outlined"
                    />
                )}

                {activity.isCancelled && (
                    <Chip
                        label="Cancelled"
                        color="error"
                        sx={{ borderRadius: 2 }}
                    />
                )}
            </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Date & Venue */}
        <CardContent sx={{ p: 0 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 2,
                    px: 2,
                    pb: 3
                }}
            >
                <Box sx={{display:'flex', flexGrow:0, alignItems:'center'}}>
                    <AccessTime sx={{ mr: 1 }} />

                    <Typography variant="body2" noWrap>
                        {formatDate(activity.date)}
                    </Typography>
                </Box>
                

                <Place sx={{ ml: 3, mr: 1 }} />

                <Typography variant="body2">
                    {activity.venue}
                </Typography>
            </Box>

            <Divider />

            {/* Attendees */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    backgroundColor: 'grey.200',
                    py: 3,
                    pl: 3
                }}
            >
                {activity.attendees.map(att => (
                    <AvatarPopover profile={att} key={att.id}/>
                ))}
            </Box>
        </CardContent>

        {/* Description & View Button */}
        <CardContent sx={{ pb: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 3
                }}
            >
                <Typography variant="body2">
                    {activity.description}
                </Typography>

                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="medium"
                    variant="contained"
                    sx={{ borderRadius: 3 }}
                >
                    View
                </Button>
            </Box>
        </CardContent>
    </Card>
);
}
