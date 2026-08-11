import { Box, Button, ButtonGroup, List, ListItemText, Paper, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore"
import { observer } from "mobx-react-lite";

const Counter = observer(function Counter () {
    const {counterStore} = useStore();
  
    return (
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Box sx={{width:'60%'}}>
                <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
                <Typography variant="h6">The count is: {counterStore.count}</Typography>
                        
                
                <ButtonGroup sx={{mt:3, pl:3}} >
                    <Button onClick={() => counterStore.decrement()} color="error" variant="contained">Decrement</Button>
                    <Button onClick={() => counterStore.increment()} color="success" variant="contained">Increment</Button>
                    <Button onClick={() => counterStore.increment(5)} color="primary" variant="contained">Increment Five</Button>
                </ButtonGroup>
            </Box>
            <Box component={Paper} sx={{width:'40%', p:4}}>
                <Typography variant="h5">Counter Events ({counterStore.eventCount})</Typography>
                <List>
                    {counterStore.events.map((event, index) => (
                        <ListItemText key={index}>{event}</ListItemText>
                    ))}
                </List>
            </Box>
            
        </Box>
        
        
  )
})

export default Counter;
