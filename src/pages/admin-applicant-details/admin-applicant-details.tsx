import { useState, useEffect } from "react";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary, CloudinaryFile} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar,ListItem, ListItemText, Typography, Grid, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../alliance-logo.png';
import { useNavigate } from 'react-router-dom';
import Container from "./components/Container";
import StatusRemarksModal from "./components/Modal";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { getApplicantDetails } from "./utils";
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';


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

interface ApplicantDetails {
  Id: number;
  JobId: number;
  PersonalInformationId: number;
  AttachmentId: number;
  Status: string;
  DateTimeApplied: string;
  job: {
    JobTitle: string,
  };
  personalInformation: {
    AddressLine1: string;
    AddressLine2: string;
    Country: string;
    DateOfBirth: string;
    EmailAddress: string;
    FirstName: string;
    Id: number;
    LastName: string;
    MiddleName: string;
    PhoneNumber: string;
    Province: string;
    Sex: string;
    ZipCode: string;
  };
  attachment: {
    FormalPhoto: string;
    Id: number;
    LinkedInProfile: string;
    PortfolioUrl: string;
    Resume: string;
  };
}

const ApplicantDetails = () => {
  const { id } = useParams();
  const [applicantDetails, setApplicantDetails] = useState<ApplicantDetails>({} as ApplicantDetails); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      const data = await getApplicantDetails({id: id});
      console.log("Returned Data:", data);
      setApplicantDetails(data);
      setIsLoading(false);
    }
    fetchApplicantDetails();
  }, []);

  useEffect(() => {
    console.log("Applicant Details:", applicantDetails);
  }, [applicantDetails]);

    
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
  

  const [step, setStep] = useState(0);
  const dummy = "dummy";
  const cld = new Cloudinary({    
      cloud: {
        cloudName: 'da1sdiduo'
      }
    }); 

  const BasicInformation = () => (
      <div>
          <h5 className="text-base italic mb-2">Basic Information</h5>
          <label className="block text-sm font-light">Sex</label>
          <p className="mb-4">{applicantDetails.personalInformation.Sex}</p>
          <label className="block text-sm font-light">Date of Birth</label>
          <p className="mb-4">{format(new Date(applicantDetails.personalInformation.DateOfBirth), 'MM/dd/yyyy')}</p>
      </div>
  )

  const Address = () => (
      <div>
          <h5 className="text-base italic mb-2">Address</h5>
          <label className="block text-sm font-light">Country</label>
          <p className="mb-4">{applicantDetails.personalInformation.Country}</p>
          <label className="block text-sm font-light">Province</label>
          <p className="mb-4">{applicantDetails.personalInformation.Province}</p>
          <label className="block text-sm font-light">City</label>
          <p className="mb-4">{applicantDetails.personalInformation.Province}</p>
          <label className="block text-sm font-light">Zip Code</label>
          <p className="mb-4">{applicantDetails.personalInformation.ZipCode}</p>
          <label className="block text-sm font-light">Address Line 1</label>
          <p className="mb-4">{applicantDetails.personalInformation.AddressLine1}</p>
          <label className="block text-sm font-light">Address Line 2</label>
          <p className="mb-4">{applicantDetails.personalInformation.AddressLine2 ? applicantDetails.personalInformation.AddressLine2 : "-"}</p>
      </div>
  ) 

  const Contact = () => (
      <div>
          <h5 className="text-base italic mb-2">Contact</h5>
          <label className="block text-sm font-light">Email</label>
          <p className="mb-4">{applicantDetails.personalInformation.EmailAddress}</p>
          <label className="block text-sm font-light">Phone Number</label>
          <p className="mb-4">{applicantDetails.personalInformation.PhoneNumber}</p>
      </div>
  )
  
  const PersonalInformation = () => (
    <div>
      <h1 className="font-bold text-2xl">Personal Information</h1>
      <hr className="my-4 border-b-1 border-gray-400" />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <BasicInformation />
        </div>
        <div>
          <Address />
        </div>
        <div>
          <Contact />
        </div>
      </div>
      <h1 className="font-bold text-2xl">Remarks</h1>
      <hr className="my-4 border-b-1 border-gray-400" />
    </div>
     
  )   

  const Attachment = () => (
      <div>
         <h1 className="font-bold text-2xl">Attachments</h1>
          <hr className="my-4 border-b-1 border-gray-400" />
          <div className="grid grid-cols-2 gap-4 mb-12">
          <div>
            <h5 className="text-base italic mb-2">LinkedIn Profile</h5>
            <p>{applicantDetails.attachment.LinkedInProfile ? applicantDetails.attachment.LinkedInProfile : "-"}</p>
          </div>
          <div>
            <h5 className="text-base italic mb-2">Portfolio URL</h5>
            <p>{applicantDetails.attachment.PortfolioUrl ? applicantDetails.attachment.PortfolioUrl : "-"}</p>
          </div>
        </div>
        <h1 className="flex items-center justify-between font-bold text-2xl">
          Formal Picture
          <a href={`https://res.cloudinary.com/da1sdiduo/image/upload/fl_attachment:${applicantDetails.personalInformation.LastName + applicantDetails.personalInformation.FirstName}_FormalPhoto/${applicantDetails.attachment.FormalPhoto}`}
          className="bg-white text-red-500 py-0 px-0 w-24 text-sm hover:bg-transparent">
            Download <CloudDownloadIcon className="text-red-500 px-0"/>
          </a>
        </h1>
        <hr className="my-4 border-b-1 border-gray-400" />
        <div className="mb-12">
          <AdvancedImage
            cldImg={cld
              .image(applicantDetails.attachment.FormalPhoto)!
              .resize(thumbnail().width(250).height(250))
            }
            className="mx-auto"
          />
        </div>
        <h1 className="flex items-center justify-between font-bold text-2xl">
          Resume
          <a href={`https://res.cloudinary.com/da1sdiduo/image/upload/fl_attachment:${applicantDetails.personalInformation.LastName + applicantDetails.personalInformation.FirstName}_Resume/${applicantDetails.attachment.Resume}`}
          className="bg-white text-red-500 py-0 px-0 w-24 text-sm hover:bg-transparent">
            Download <CloudDownloadIcon className="text-red-500 px-0"/>
          </a>
        </h1>
        <hr className="my-4 border-b-1 border-gray-400" />
          <AdvancedImage cldImg={cld.image(applicantDetails.attachment.Resume + ".jpg")!}/>
      </div>
  )
  
  const reviewPages = [
      <PersonalInformation/>,
      <Attachment/>
  ]

  const Navigation = () => {
    if(step == 0){
        return(
        <ul className="flex bg-gray-100 px-1 py-2 w-fit mx-auto rounded-md mb-12">
            <li className="flex-1 mx-2">
                <a className="w-72 text-center block rounded-md py-4 px-4 bg-white hover:bg-gray-50 text-red-600 font-semibold cursor-pointer">Information</a>
            </li>
            <li className="flex-1 mx-2">
                <a className="w-72 text-center block rounded-md hover:border-gray-200 text-black font-semibold hover:bg-gray-200 py-4 px-4 cursor-pointer" onClick={()=>{setStep(1)}}>Attachments</a>
            </li>
        </ul>
        )
    }else{
        return(
        <ul className="flex bg-gray-100 px-1 py-2 w-fit mx-auto rounded-md mb-12">
            <li className="flex-1 mx-2">
                <a className="w-72 text-center block rounded-md hover:border-gray-200 text-black font-semibold hover:bg-gray-200 py-4 px-4 cursor-pointer" onClick={()=>{setStep(0)}}>Information</a>
            </li>
            <li className="flex-1 mx-2">
                <a className="w-72 text-center block rounded-md py-4 px-4 bg-white hover:bg-gray-50 text-red-600 font-semibold cursor-pointer">Attachments</a>
            </li>
        </ul>
        )
    }
}
 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const fullName = applicantDetails.personalInformation.FirstName + " " + applicantDetails.personalInformation.MiddleName + " " + applicantDetails.personalInformation.LastName;  

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
              <ListItem button onClick={handleApplicant}>
                <ListItemText style={{color: 'red', textDecoration: 'underline'}} primary="Applicants"/>
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
    
    <div className="mx-auto mt-16">
        <Container>
            <div className="h-fit mx-16 text-left">
                <div className="w-full">
                    <div className="grid grid-cols-2 justify-start text-left mb-12">
                        <div >
                            <h4 className="text-red-500 text-left">Applicant Name</h4>
                            <h2 className="text-black text-xl font-semibold mb-8">{fullName}</h2>
                            <h4 className="text-red-500 text-left">Position Applied for</h4>
                            <h2 className="text-black text-xl font-semibold">{applicantDetails.job.JobTitle}</h2>
                        </div>
                        <div>
                            <h4 className="text-red-500">Status</h4>
                            <h2 className="text-black text-xl font-semibold mb-6">{applicantDetails.Status}</h2>
                            <button className="bg-red-600 w-[75%] text-white py-3 px-4 rounded-md"  onClick={() => setIsModalOpen(true)}>
                                Update Status
                            </button>
                            {isModalOpen && (
                              <StatusRemarksModal open={handleOpen} handleClose={handleClose}/>
                            )}
                        </div>
                    </div>
                    <Navigation/>
                    {reviewPages[step]}
                </div>         
            </div>
        </Container>
    </div>
   
        
    </div>
    
  );
}

export default ApplicantDetails;