import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { registerUser } from '../../apiConfig';
import { register } from '../../redux/features/registerSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const defaultTheme = createTheme();

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required'),
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Contact number must be digits only')
    .nullable(),
  password: Yup.string()
    .required('Password is required'),
  profileImage: Yup.mixed()
    .nullable()
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileImagePreview, setProfileImagePreview] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      contactNumber: '',
      password: '',
      profileImage: null
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      try {
        // const userData = await registerUser({
        //   ...values,
        //   tasks: [],
        // });
// bypassing json-server api call
          const userData = await {
          ...values,
          tasks: [],
        };
        dispatch(register(userData));
        toast.success('Registered successfully');
        navigate('/login');
      } catch (error) {
        console.error("Error during registration:", error);
        
      }
    },
  });

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('profileImage', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue('profileImage', null);
      setProfileImagePreview(null);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs" sx={{ mt: 3, mb: 2 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Registration Form
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                name="name"
                label="Name"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="username"
                label="Username"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="email"
                label="Email Address"
                formik={formik}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="contactNumber"
                label="Contact Number"
                formik={formik}
                type="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="password"
                label="Password"
                formik={formik}
                type="password"
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              >
                Upload Profile Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfileImageChange}
                />
              </Button>
              {profileImagePreview && (
                <Box
                  component="img"
                  src={profileImagePreview}
                  alt="Profile Preview"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    mt: 2,
                    borderRadius: '8px',
                  }}
                />
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  );
}
