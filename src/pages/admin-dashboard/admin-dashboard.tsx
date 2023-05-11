import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar,ListItem, ListItemText, Typography, Grid, IconButton} from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../alliance-logo.png';
import { useNavigate } from 'react-router-dom';
import BarGraph from './BarGraph';
import RoundedBox from './RoundedBox';
import { useAuthUser } from "react-auth-kit";

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

const DashboardBoardScreen = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleAdminInfo = () => { // redirect to admin screen page
    navigate('/adminScreen');
  };

  const handleDashboard = () => { // redirect to dashboard page
    navigate('/dashboard');
  };

  const handleApplicant = () => { // redirect to applicant info page
    navigate('/applicantList');
  };

  const auth = useAuthUser();
  const activeUser = auth()?.user;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="Alliance Software Inc" className={classes.logo} />
          <Grid style={{ display: 'flex', justifyContent: 'center' }} container spacing={2} alignItems="center">
            <Grid item className={classes.listItem}>
              <ListItem button onClick={handleDashboard}>
                <ListItemText style={{color: 'red', textDecoration: 'underline'}} primary="Dashboard" />
              </ListItem>
            </Grid>
            <Grid item className={classes.listItem}>
              <ListItem button onClick={handleApplicant}>
                <ListItemText primary="Applicants" />
              </ListItem>
            </Grid>
            <Grid item className={classes.listItem}>
              <ListItem button onClick={handleAdminInfo}>
                <ListItemText primary="Admin" />
              </ListItem>
            </Grid>
          </Grid>
          <Typography variant="h6" className={classes.welcome} style={{whiteSpace: 'nowrap', color: 'black', fontSize: '16px'}}>
            Welcome, {activeUser}
          </Typography>
          <IconButton style={{ width: 48, height: 48 }}>
            <AccountCircleIcon/>
          </IconButton>    
        </Toolbar>
      </AppBar>

      {/*  Content  */}
      <Grid container justifyContent="center" style={{marginLeft: '20px'}}>
        <div >
          <h1 style={{ marginTop: '130px', display: 'flex', fontSize: '30px'}} >Summary</h1>
          <Grid container spacing={1} style={{marginTop:'20px'}}>
            <Grid item xs>
              <RoundedBox title="NEW APPLIANTS" value={10} />
            </Grid>
            <Grid item xs>
              <RoundedBox title="TOTAL APPLIANTS" value={87} />
            </Grid>
            <Grid item xs>
              <RoundedBox title="ADMINS" value={23} />
            </Grid>
          </Grid>
          {/* <div style={{ marginTop: '20px', display: 'flex' }}>
            <RoundedBox title="NEW APPLIANTS" value={10} />
             <RoundedBox title="TOTAL APPLIANTS" value={87} />
            <RoundedBox title="ADMINS" value={23} />
          </div> */}
          <div style={{ marginTop: '100px', display: 'flex'}}>
            <BarGraph />
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default DashboardBoardScreen;
