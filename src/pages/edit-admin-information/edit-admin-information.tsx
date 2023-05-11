import { useState, useEffect } from 'react';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import LogoutIcon from '@mui/icons-material/Logout';
import {Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  AppBar, Toolbar,ListItem, ListItemText, Typography, Grid, IconButton } from '@material-ui/core';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';
import { Edit, Delete } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../alliance-logo.png';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuthUser } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import { getApplicant } from './utils';
import axios from 'axios';

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
    menuContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9998,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)', // Apply blur effect to the background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menu: {
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      padding: '50px',
    },
  })
);

interface Admin {
  id: string,
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}


const AdminInformationScreen = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [admin, setAdmin] = useState<Admin>({
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [status, setStatus] = React.useState('Active');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const auth = useAuthUser();
  const activeUser = auth()?.user;
  const signOut = useSignOut();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplicant({username: id});
        const { user_id, user_username, user_password, user_firstName, user_lastName, user_email, user_phoneNumber } = data;
        const adminData: Admin = {
          id: user_id,
          username: user_username,
          password: user_password,
          firstName: user_firstName,
          lastName: user_lastName,
          email: user_email,
          phoneNumber: user_phoneNumber,
        };
        console.log(adminData);
        setAdmin(adminData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  const navigate = useNavigate();

  const handleDashboard = () => { // redirect to dashboard page
    navigate('/dashboard');
  };

  const handleApplicantList = () => { // redirect to Applicant list
    navigate('/applicantList');
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); //menu state variable

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => { //menu anchor element:
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  }

  const handleSubmit = async () => {
    try {
      await axios.put("http://localhost:55731/api/UserAPI/edit", {
        user_id: admin.id,
        user_firstName: admin.firstName,
        user_lastName: admin.lastName,
        user_email: admin.email,
        user_phoneNumber: admin.phoneNumber,
        user_username: admin.username,
        user_password: admin.password,
        confirm_pass: admin.password,
        user_isActive: true,
        user_role: "Admin",
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }
  

  return (

    // AppBar/TopBar
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="Alliance Software Inc" className={classes.logo} />
          <Grid style={{ display: 'flex', justifyContent: 'center' }} container spacing={2} alignItems="center">
            <Grid item className={classes.listItem}>
              <ListItem button onClick={handleDashboard}>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Grid>
            <Grid item className={classes.listItem}>
              <ListItem button onClick={handleApplicantList}>
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
            Welcome, ${activeUser.user_firstName},
          </Typography>
          <IconButton style={{ width: 48, height: 48 }}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton onClick={handleSignOut} style={{ width: 48, height: 48 }}>
          <LogoutIcon />
        </IconButton>
        </Toolbar>
      </AppBar>
      {/* End App Bar */}

      {/* Information Section */}
      <Grid container justifyContent="center">
        <Grid item>
            <Card style={{ width:'800px', marginTop: 75, padding:'50px'}}>
              <CardContent>

            {/* TITLE */}
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant='h5'>
                      Edit Admin Information
                    </Typography> 
                  </Grid> 
                </Grid>
                <Divider/> 
            {/* END TITLE */}

                {/* FORM */}
                  <form className={classes.root} noValidate autoComplete="off">
                    <Grid container>
                      {/* First COLUMN */}
                      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', marginTop:'20px'}}>
                        <Stack spacing={1}>
                        <Item>
                            <label style={{textAlign: 'start'}}>Username</label>
                            <TextField variant="outlined" style={{ width: "350px" }} value={admin.username} onChange={(e) => setAdmin({ ...admin, username: e.target.value })}/>
                          </Item>
                          <Item>
                            <label style={{textAlign: 'start'}}>Password</label>
                            <TextField variant="outlined" style={{ width: "350px" }} value={admin.password} onChange={(e) => setAdmin({ ...admin, password: e.target.value })}/>
                          </Item>
                             <Item>
                            <label style={{textAlign: 'start'}}>First Name</label>
                            <TextField variant="outlined" style={{ width: "350px" }} value={admin.firstName} onChange={(e) => setAdmin({ ...admin, firstName: e.target.value })}/>
                          </Item>
                          <Item>
                            <label style={{textAlign: 'start'}}>Last Name</label>
                            <TextField variant="outlined" style={{ width: "350px" }} value={admin.lastName} onChange={(e) => setAdmin({ ...admin, lastName: e.target.value })}/>
                          </Item>
                          <Item>
                            <label style={{textAlign: 'start'}}>Email</label>
                            <TextField variant="outlined"  style={{ width: "350px" }} value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })}/>
                          </Item>
                          <Item>
                            <label style={{textAlign: 'start'}}>Phone Number</label>
                            <TextField variant="outlined" style={{ width: "350px" }} value={admin.phoneNumber} onChange={(e) => setAdmin({ ...admin, phoneNumber: e.target.value })}/>
                          </Item>
                          <Item>
                            <button className='bg-red-600 rounded-md' onClick={handleSubmit}>Submit</button>
                          </Item>
                        </Stack>
                      </Grid>
                      </Grid> 
                  </form>
                  {/* END FORM */}

              </CardContent>
          </Card>
      </Grid>
    </Grid>
    {/* END Card */}
    </div>
  );
};

export default AdminInformationScreen;