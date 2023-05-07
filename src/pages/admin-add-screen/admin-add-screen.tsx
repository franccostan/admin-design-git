import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Card, CardContent, Divider, TextField, AppBar, Toolbar,ListItem, ListItemText, Typography, Grid, IconButton } from '@material-ui/core';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../alliance-logo.png';
import { useNavigate } from 'react-router-dom';

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

const Item = styled('div')(({ theme }) => ({
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

const AdminAddScreen = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleDashboard = () => { // redirect to dashboard page
    navigate('/dashboard');
  };

  return (

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

      <Grid container justifyContent="center">
        <Grid item>
            <Card style={{ width:'800px', marginTop: 75, padding:'50px'}}>
              <CardContent>

                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant='h5'>Add an Admin</Typography> 
                  </Grid> 
                </Grid>
                <Divider/> 

                  <form className={classes.root} noValidate autoComplete="off">
                    <Grid container>
                      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', marginTop:'20px'}}>
                        <Stack spacing={0}>
                          <Item>
                            <label style={{textAlign: 'start'}}>First Name</label>
                            <TextField variant="outlined" style={{ width: "350px" }}/>
                          </Item>
                          <Item>
                            <label style={{textAlign: 'start'}}>Last Name</label>
                            <TextField variant="outlined" style={{ width: "350px" }}/>
                          </Item>
                          <Item>
                            <label style={{textAlign: 'start'}}>Email</label>
                            <TextField variant="outlined" style={{ width: "350px" }}/>
                          </Item>
                          <Item>
                            <label style={{textAlign: 'start'}}>Password</label>
                            <TextField variant="outlined" style={{ width: "350px" }}/>
                          </Item>
                          <Item>
                            <label style={{textAlign: 'start'}}>Confirm Password</label>
                            <TextField variant="outlined" style={{ width: "350px" }}/>
                          </Item>
                        </Stack>
                      </Grid>
                          <Item style={{ marginTop:'600px', marginBottom:'-50px'}}>
                            <button type="submit" style={{ width: "250px" }}>Add Admin</button>
                          </Item>
                    </Grid>
                  </form>
              </CardContent>
          </Card>
      </Grid>
    </Grid>
    </div>
  );
};

export default AdminAddScreen;