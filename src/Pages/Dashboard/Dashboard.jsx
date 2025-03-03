import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardBox from '../../components/CardBox/CardBox';
import { useSelector } from "react-redux";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  selectTotalCreatedTasks,
  selectTotalCompletedTasks,
  selectPendingTasks,
} from '../../redux/features/taskSlice';
const defaultTheme = createTheme();


export default function Dashboard() {
  const totalCreatedTasks = useSelector(selectTotalCreatedTasks) ?? 0;
  const totalCompletedTasks = useSelector(selectTotalCompletedTasks) ?? 0;
  const pendingTasks = useSelector(selectPendingTasks) ?? 0;


  // const userData = useSelector((state) => state?.user?.user);
  // console.log("totalCreatedTasks",totalCreatedTasks);
  // console.log("totalCompletedTasks",totalCompletedTasks);
  // console.log("pendingTasks",pendingTasks);



  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <CardBox title="Total Created Task" count={totalCreatedTasks} />
              <CardBox title="Total Completed Task" count={totalCompletedTasks} />
              <CardBox title="Pending Task" count={pendingTasks} />
              {/* <CardBox title="Pending Task" count="3" /> */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}