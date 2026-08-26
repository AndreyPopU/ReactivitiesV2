import { Paper, Box, Button, Typography } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../App/shared/components/TextInput";
import { useAccount } from "../../lib/hooks/useAccount";
import { Link, useLocation, useNavigate } from "react-router";

export default function Login() {
const { control, handleSubmit, formState: {isValid, isSubmitting }} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

const onSubmit = async (data: LoginSchema) => {
  await loginUser.mutateAsync(data, {
    onSuccess: () => {
      navigate(location.state?.from || '/activities');
    }
  });
}

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper  sx={{ borderRadius: 3, p: 3, width: '100%', maxWidth: '60%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, py: 3 }}>
            <LockOpenIcon sx={{width:50, height:50}} color='primary'></LockOpenIcon>
            <Typography variant="h3" color='primary'>Sign In</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextInput label="Email" control={control} name="email"/>
            <TextInput label="Password" type='password' control={control} name="password"/> 

            <Button type="submit" color="primary" variant="contained" disabled={!isValid || isSubmitting}>LOGIN</Button>
            
            <Typography sx={{textAlign:'cetner'}}>Don't have an account?
              <Typography sx={{ml:2}} component={Link} to ='/register' color='primary'>Sign Up</Typography>
            </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
