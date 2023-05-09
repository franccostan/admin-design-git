import React, { useState } from 'react';
import {makeStyles, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


interface User {
  name: string;
  email: string;
  dateJoined: string;
}

const users: User[] = [
  { name: 'John Doe', email: 'johndoe@example.com', dateJoined: '01/01/2022' },  
  { name: 'Jane Smith', email: 'janesmith@example.com', dateJoined: '02/01/2022' },  
  { name: 'Bob Johnson', email: 'bobjohnson@example.com', dateJoined: '03/01/2022' },
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

const AdminList: React.FC = () => {
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

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 20px', gridAutoRows: '50px', gridColumnGap: '10px' }}>
      <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '1 / 2', padding: '0 10px' }}>Name</div>
      <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '2 / 3', padding: '0 5px' }}>Email</div>
      <div style={{ fontWeight: 'bold', textAlign: 'left', gridColumn: '3 / 4', padding: '0 50px' }}>Date Joined</div>
      <div></div>
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <div style={{ textAlign: 'left', gridColumn: '1 / 2', padding: '0 10px' }}>{user.name}</div>
          <div style={{ textAlign: 'left', gridColumn: '2 / 3', padding: '0 5px' }}>{user.email}</div>
          <div style={{ textAlign: 'left', gridColumn: '3 / 4', padding: '0 50px' }}>{user.dateJoined}</div>
          <IconButton onClick={handleMenuOpen} style={{ transform: "rotate(90deg)", gridColumn: '4 / 5', padding: '0 0px'}} className={classes.iconButton}><MoreVertIcon /></IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditAdmin}><EditIcon/> Edit</MenuItem>
            <MenuItem onClick={handleMenuClose} style={{color: 'red'}}><DeleteIcon/> Delete</MenuItem>
          </Menu>
        </React.Fragment>
      ))}
      <div style={{ gridColumn: '4 / span 4', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <button className={classes.iconButton} onClick={handlePreviousPage} disabled={currentPage === 0}><span>&lt;</span></button>
        <span style={{ margin: '0 20px' }}>Page {currentPage + 1}</span>
        <button className={classes.iconButton} onClick={handleNextPage} disabled={currentPage === totalPages - 1}><span>&gt;</span></button>
      </div>
    </div>
  );
};

export default AdminList;
