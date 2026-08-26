import { Paper, Box, Button, Typography } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../App/shared/components/TextInput";
import { useAccount } from "../../lib/hooks/useAccount";
import { Link } from "react-router";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";

export default function RegisterForm() {
const { control, handleSubmit, setError, formState: {isValid, isSubmitting }} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });
  const { registerUser } = useAccount();

const onSubmit = async (data: RegisterSchema) => {
  await registerUser.mutateAsync(data, {
    onError: (error) => {
        if (Array.isArray(error)) {
            error.forEach(err => {
                if (err.includes('Email')) setError('email', {message: err});
                else if (err.includes('Password')) setError('password', {message: err});
            })
        }
    }
  });
}

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper  sx={{ borderRadius: 3, p: 3, width: '100%', maxWidth: '60%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, py: 3 }}>
            <LockOpenIcon sx={{width:50, height:50}} color='primary'></LockOpenIcon>
            <Typography variant="h3" color='primary'>Register</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextInput label="Email" control={control} name="email"/>
            <TextInput label="Display Name" control={control} name="displayName"/>
            <TextInput label="Password" type='password' control={control} name="password"/> 

            <Button type="submit" color="primary" variant="contained" disabled={!isValid || isSubmitting}>Register</Button>
            
            <Typography sx={{textAlign:'cetner'}}>Already have an account?
              <Typography sx={{ml:2}} component={Link} to ='/login' color='primary'>Sign In</Typography>
            </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
