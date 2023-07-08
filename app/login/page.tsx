'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';
import axios from 'axios';
import DefaultModal from '@/components/modals';
import { useRouter } from 'next/navigation';
import { setUser } from '@/data/container/user';
import { useDispatch } from 'react-redux';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link className="text-buy" href="/">
        tensor.exchange
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LogIn() {

	const [isModalOpen, showModal] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const router = useRouter();
	const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

		const signinData = {
			email: data.get('email'),
			password: data.get('password'),
		}

		axios.post('/api/auth/login', signinData)
		.then((data) => {
			dispatch(setUser(data));
			router.replace('/dashboard');
		})
		.catch(error => {
			if(error.response.data.message == "Wrong password") {
				setErrorMessage("The password you provided is wrong.\nPlease confirm your password and try again.");
				showModal(true)
			}
			else if(error.response.data.message == "Unregistered user") {
				setErrorMessage("The email is not registered to tensor.exchange.\nPlease confirm your email and try again.");
				showModal(true)
			}
	})
  };

  return (
    <Container component="main" maxWidth="xs">
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Link href="/">
							<Avatar sx={{ m: 1, bgcolor: 'transparent' }}>
								<Image
										className="mx-2"
										src="/logo.png"
										alt="Tensor Exchange Logo"
										width={40}
										height={40} 
										priority
										quality={100}
								/>  
							</Avatar>
					</Link>
					<Typography component="h1" variant="h5">
					Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
					/>
					<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
					/>
					<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
					/>
					<Button
							type="submit"
							fullWidth
							variant="contained"
							color="success"
							sx={{ mt: 3, mb: 2, color: "white" }}
					>
							Log In
					</Button>
					<Grid container>
							<Grid item xs>
							<Link href="#" variant="body2">
									Forgot password?
							</Link>
							</Grid>
							<Grid item>
							<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
							</Link>
							</Grid>
					</Grid>
					</Box>
				</Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
		<DefaultModal isOpen={isModalOpen} showModal={showModal} title='Login failed'>
			<Typography component="h6" className="whitespace-pre">
			{
				errorMessage
			}
			</Typography>
		</DefaultModal>
    </Container>
  );
}