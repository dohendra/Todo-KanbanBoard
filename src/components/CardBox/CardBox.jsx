import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title/Title';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
function preventDefault(event) {
  event.preventDefault();
}

export default function CardBox({ title, count }) {
  return (
    <>
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: "auto",
          }}
        >
          <Title>{title}</Title>
          <Typography component="p" variant="h4">
            {count}
          </Typography>
          {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography> */}


        </Paper>
      </Grid>

    </>
  );
}