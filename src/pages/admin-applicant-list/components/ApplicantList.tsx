import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';


interface User {
  id: string;
  viewed: boolean;
  name: string;
  email: string;
  dateApplied: string;
  status: string;
}

const users: User[] = [
  { viewed: false, id: '#112233', name: 'John Doe', email: 'johndoe@example.com', dateApplied: '01/01/2022', status: 'To View' },  
  { viewed: true, id: '#112345', name: 'Jane Smith', email: 'janesmith@example.com', dateApplied: '02/01/2022', status: 'Viewed' },  
  { viewed: false, id: '#156233', name: 'Bob Johnson', email: 'bobjohnson@example.com', dateApplied: '03/01/2022', status: 'To View' },
];

const useStyles = makeStyles({
  iconButton: {
    width: '30px',
    height: '30px',
    color: 'black',
    background: 'none',
    '&:hover': {
      color: 'black',
      background: 'none',
    },
  },
});

const ApplicantList: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleEditAdmin = () => { // redirect to Admin Info page
    navigate('/adminInfo');
  };

  const handleViewedChange = (index: number) => {
    const updatedUsers = [...users]; // make a copy of the users array
    updatedUsers[index] = { ...updatedUsers[index], viewed: !updatedUsers[index].viewed }; // update the viewed property of the user at the given index
    //setUsers(updatedUsers); // update the state with the new users array
  };

  return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr) 100px 150px 100px', gridAutoRows: '50px', gridColumnGap: '50px' }}>
        <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '1 / 2', padding: '0 10px' }}>Viewed</div>
        <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '2 / 3', padding: '0 10px' }}>ID</div>
        <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '3 / 4', padding: '0 10px' }}>Name</div>
        <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '4 / 5', padding: '0 20px' }}>Email</div>
        <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '5 / 6', padding: '0 70px', whiteSpace: 'nowrap' }}>Date Applied</div>
        <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '6 / 7', padding: '0 50px' }}>Status</div>
        {users.map((user, index) => (
            <React.Fragment key={index}>
            <div style={{ textAlign: 'left', gridColumn: '1 / 2', padding: '0 10px', width: '10px' }}>
            <input 
                type="checkbox" 
                checked={user.viewed} 
                onChange={() => handleViewedChange(index)}
                style={{ width: '15px', height: '15px', marginRight: '5px'}}
                />
            </div>
            <div style={{ textAlign: 'left', gridColumn: '2 / 3', padding: '0 10px' }}>{user.id}</div>
            <div style={{ textAlign: 'left', gridColumn: '3 / 4', padding: '0 10px' }}>{user.name}</div>
            <div style={{ textAlign: 'left', gridColumn: '4 / 5', padding: '0 20px', whiteSpace: 'nowrap' }}><EmailIcon style={{color: 'red'}}/>{user.email}</div>
            <div style={{ textAlign: 'left', gridColumn: '5 / 6', padding: '0 70px', whiteSpace: 'nowrap' }}><CalendarMonthIcon style={{color: 'red'}}/>{user.dateApplied}</div>
            <div style={{ textAlign: 'left', gridColumn: '6 / 7', padding: '0 50px' }}>{user.status}</div>
            </React.Fragment>
        ))}
        <div style={{ gridColumn: '5 / span 6', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <button className={classes.iconButton} onClick={handlePreviousPage} disabled={currentPage === 0}><span>&lt;</span></button>
            <span style={{ margin: '0 20px' }}>Page {currentPage + 1}</span>
            <button className={classes.iconButton} onClick={handleNextPage} disabled={currentPage === totalPages - 1}><span>&gt;</span></button>
        </div>
        </div>

  );
};

export default ApplicantList;
