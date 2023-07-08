"use client"
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
import { Modal } from '@mui/material';
import DefaultModal from '@/components/modals';
import axios from 'axios';

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

export default function SignUp() {
	
	const [isModalOpen, setModalOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [password, setPassword] = React.useState('');

	const showModal = (isOpen: boolean) => {
		if(!isOpen) {
			setErrorMessage('');
			setPassword('');
		}
		setModalOpen(isOpen);
	}
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const signupData = {
			name: data.get('firstName') + " " + data.get('lastName'),
			email: data.get('email'),
			password: data.get('password'),
		};
		console.log(signupData);
		axios.post('/api/auth/register', signupData)
			.then(() => showModal(true))
			.catch(error => {
				if(error.response.data.message) {
					setErrorMessage(error.response.data.message.join('\n'));
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
				Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
							<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
							/>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
							/>
							</Grid>
							<Grid item xs={12}>
							<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
							/>
							</Grid>
							<Grid item xs={12}>
							<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
							/>
							</Grid>
							<Grid item xs={12}>
							<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I want to receive inspiration, marketing promotions and updates via email."
							/>
							</Grid>
					</Grid>
					<Button
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, color: "white" }}
							color="success"
							type="submit"
					>
							Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
							<Grid item>
							<Link href="/login" variant="body2" className='dark:text-white'>
									Already have an account? Sign in
							</Link>
							</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 5 }} />
			<DefaultModal isOpen={isModalOpen} showModal={showModal}>
				<Typography component="h6" className="whitespace-pre">
				{
					errorMessage ? errorMessage : 
					`Thank you for signing up!\nTo activate your account, please check your email.`
				}
				</Typography>
			</DefaultModal>
    </Container>
  );
}