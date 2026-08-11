import { Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/menuItemLink";

export default function Navbar() {
        return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundImage: 
        'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}>
        
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
                </Box>
                <Button>
                    User Menu
                </Button>
            </Toolbar>
        </Container>
        
      </AppBar>
    </Box>
  );
}