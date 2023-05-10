import { Padding } from '@mui/icons-material';
import React from 'react';

interface Props {
  title: string;
  value: number;
}

const RoundedBox: React.FC<Props> = ({ title, value }) => {
  return (
    <div>
    <div>
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
    </div>
    <div style={{ 
        fontFamily: 'Inter',
        color: 'white',
        backgroundColor: '#d83333', 
        padding: '10px', 
        borderRadius: '10px', 
        display: 'inline-block',
        width: '250px',
        height: '100px',
        marginRight: '40px',
        textAlign: 'left',
      }}>
      <p style={{fontSize: '18px', marginTop: '10px', marginBottom: '5px' }}>{title}</p>
      <h1 style={{ fontSize: '18px', margin: '0', alignItems: 'start' }}>{value}</h1>
    </div>
    </div>
  );
};

export default RoundedBox;
