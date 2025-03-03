import React, { useState, useEffect } from 'react';
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
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { toast } from 'react-toastify';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { fetchUsers } from '../../apiConfig';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/features/userSlice";
import { setTasks } from '../../redux/features/taskSlice';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
  identifier: Yup.string()
    .required('Username or Email is required')
    .test('is-valid-identifier', 'Enter a valid email or username', value => {
      const isValidEmail = Yup.string().email().isValidSync(value);
      const isValidUsername = Yup.string().min(3).max(20).isValidSync(value);
      return isValidEmail || isValidUsername;
    }),
  password: Yup.string()
    .required('Password is required'),
  captcha: Yup.string()
    .required('Captcha is required')
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
      captcha: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!validateCaptcha(values.captcha)) {
        toast.error('Captcha not Matched');
        return;
      }
      console.log(values);
      try {
         toast.success('Login successful');
        navigate("/dashboard");
        sessionStorage.setItem("token", "token")

        // bypass json-server apis hitting
        // const allUsersInDb = await fetchUsers();
        // // console.log("allUsersInDb",allUsersInDb);
        // const foundUserData = allUsersInDb.find(
        //   (user) =>
        //     (user.email === values.identifier || user.username === values.identifier) &&
        //     user.password === values.password
        // );
        // if (foundUserData) {
        //   // console.log(foundUserData,"foundUserData")
        //   toast.success('Login successful');
        //   navigate("/dashboard");
        //   sessionStorage.setItem("token", "token")
        //   dispatch(loginSuccess(foundUserData))
        //   dispatch(setTasks(foundUserData?.tasks))

        // } else {
        //   const existingUser = allUsersInDb.find((user) => user.email === values.identifier || user.username === values.identifier);
        //   if (existingUser) {
        //     toast.error('Invalid password');
        //   } else {
        //     toast.error('User not found');
        //   }
        // }
      } catch (error) {
        toast.error('An error occurred while trying to log in');
        console.error('Login error:', error);
      }
    },
  });

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

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
            Log-in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextField
                  name="identifier"
                  label="Username or Email"
                  formik={formik}
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
                <LoadCanvasTemplate reloadText="Reload Captcha" reloadColor="red" />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  name="captcha"
                  label="Enter Captcha Value"
                  formik={formik}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/register">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
