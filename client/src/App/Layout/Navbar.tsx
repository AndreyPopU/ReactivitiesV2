import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Button, Container, LinearProgress } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { store } from "../../lib/stores/store";
import { Observer } from "mobx-react-lite";

export default function Navbar() {
    const {uiStore} = store;

        return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundImage: 
        'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)', position:'relative' }}>
        
        <Container maxWidth="xl">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Button component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                        <Group fontSize="large" />
                        <Typography variant="h4"> Reactivities</Typography>
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <MenuItemLink  to={'/activities'}>Activities</MenuItemLink>
                    <MenuItemLink to={'/createActivity'} >Create Activity</MenuItemLink>
                    <MenuItemLink to={'/counter'} >Counter</MenuItemLink>
                </Box>
                <Button>
                    User Menu
                </Button>
            </Toolbar>
        </Container>
        
        <Observer>
            {() => uiStore.isLoading ? (<LinearProgress color="secondary" 
            sx={{position:"absolute", bottom:0, left:0, right:0, height:4}}/>) : null}
        </Observer>

      </AppBar>
    </Box>
  );
}