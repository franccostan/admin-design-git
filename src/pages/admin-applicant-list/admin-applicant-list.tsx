import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, ListItem, ListItemText, Typography, Grid, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../alliance-logo.png';
import { useNavigate } from 'react-router-dom';
import StickyHeadTable from './components/ApplicantList';

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
    button: {
        width: '100px',
        marginLeft: '420px',
    }
  })
);

const AdminApplicantList = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleAdminInfo = () => { // redirect to admin information page
    navigate('/adminScreen');
  };

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
                <ListItemText style={{color: 'red', textDecoration: 'underline'}} primary="Applicants" />
              </ListItem>
            </Grid>
            <Grid item className={classes.listItem}>
              <ListItem button onClick={handleAdminInfo}>
                <ListItemText primary="Admin" />
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
      <div style={{marginTop: '140px', marginLeft: '150px', display: 'flex', flexDirection:'column'}}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <h1 style={{ marginBottom: '20px', fontSize: '30px' }}>Applicant List</h1>
        </div>
        <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight:'auto', justifyContent:'center', alignItems:'center'}}>
          <StickyHeadTable/>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicantList;
