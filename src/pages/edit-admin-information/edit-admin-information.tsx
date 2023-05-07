import { useState } from 'react';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  AppBar, Toolbar,ListItem, ListItemText, Typography, Grid, IconButton } from '@material-ui/core';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';
import { Edit, Delete } from '@material-ui/icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../alliance-logo.png';


const drawerWidth = 240;

const statuses = [
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'NotActive',
    label: 'Not Active',
  },
];

// <ITEM>
const Item = styled('div')(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      display: 'flex',
      zIndex: theme.zIndex.drawer + 1,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderBottom: '5px solid red',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    logo: {
      height: '30px',
      marginRight: '20px',
    },
    welcome: {
      paddingRight: '20px',
    },
    iconButton: {
      width: '48',
      height: '48',
    },
    listItem: {
      textAlign: 'center',
      color: 'black',
    },
  })
);



const AdminInformationScreen = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState('Admin');
  const [status, setStatus] = React.useState('Active');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  return (

    // AppBar/TopBar
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="Alliance Software Inc" className={classes.logo} />
          <Grid style={{ display: 'flex', justifyContent: 'center' }} container spacing={2} alignItems="center">
            <Grid item className={classes.listItem}>
              <ListItem button onClick={() => console.log('Item clicked')}>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Grid>
            <Grid item className={classes.listItem}>
              <ListItem button onClick={() => console.log('Item clicked')}>
                <ListItemText primary="Applicants" />
              </ListItem>
            </Grid>
            <Grid item className={classes.listItem}>
              <ListItem button onClick={() => console.log('Item clicked')}>
              <ListItemText style={{color: 'red', textDecoration: 'underline'}} primary="Admin" />
              </ListItem>
            </Grid>
          </Grid>
          <Typography variant="h6" className={classes.welcome} style={{whiteSpace: 'nowrap', color: 'black', fontSize: '16px'}}>
            Welcome, User
          </Typography>
          <IconButton style={{ width: 48, height: 48 }}>
            <AccountCircleIcon/>
          </IconButton>    
        </Toolbar>
      </AppBar>
      {/* End App Bar */}

      {/* Information Section */}
      <Grid container justifyContent="center">
        <Grid item>
            <Card style={{ width:'800px', height:'500px',marginTop: 75, padding:'50px'}}>
              <CardContent>

            {/* TITLE */}
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant='h5'>
                      Edit Admin information
                    </Typography> 
                  </Grid> 
                  {/* <Grid item>
                    <ButtonBase style={{ width: '30px' }} disableRipple>
                      <Edit />
                    </ButtonBase>
                    <ButtonBase style={{ width: '30px' }} disableRipple>
                      <Delete />
                    </ButtonBase>
                  </Grid> */}
                </Grid>
                <Divider/> 
            {/* END TITLE */}

                {/* FORM */}
                  <form className={classes.root} noValidate autoComplete="off">
    
                        <Stack spacing={1} style={{ display: 'flex', justifyContent: 'flex-start', marginTop:'20px'}}>
                          {/* First Name */}
                          <Item>
                            <TextField
                            id="outlined-read-only-input"
                            label="First Name"
                            defaultValue="Hello World"
                            variant="outlined"
                            style={{ width: "350px" }}
                            /></Item>
                            {/* Last Name */}
                          <Item>
                            <TextField
                            id="outlined-read-only-input"
                            label="Last Name"
                            defaultValue="Hello World"
                            variant="outlined"
                            style={{ width: "350px" }}
                            /></Item>
                            {/* Email */}
                          <Item>
                            <TextField
                            id="outlined-read-only-input"
                            label="Email"
                            defaultValue="Hello World"
                            variant="outlined"
                            style={{ width: "350px" }}
                            /></Item>
                            {/* Password */}
                          <Item>
                            <TextField
                            id="outlined-read-only-input"
                            label="Password"
                            defaultValue="Hello World"
                            variant="outlined"
                            style={{ width: "350px" }}
                            /></Item>
                      
                        </Stack>

                    
                  </form>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  {/* END FORM */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" style={{ width: "200px", marginLeft: "10px" }}>Save</button>
                    <button type="submit" style={{ width: "200px" }}>Back</button>
                </div>
              </CardContent>
          </Card>
      </Grid>
    </Grid>
    {/* END Card */}
    </div>
  );
};

export default AdminInformationScreen;
