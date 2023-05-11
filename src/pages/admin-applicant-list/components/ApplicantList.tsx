import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import { getApplicantList } from '../utils';
import { Link } from 'react-router-dom';


interface Column {
  id: 'id' | 'name' | 'email' | 'jobApplied' | 'dateApplied' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 75 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email Address', minWidth: 170 },
  {
    id: 'jobApplied',
    label: 'Job Applied',
    minWidth: 150,
  },
  {
    id: 'dateApplied',
    label: 'Date Applied',
    minWidth: 150,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 150,
  },
];

interface Data {
  id: string;
  name: string;
  email: string;
  jobApplied: string;
  dateApplied: string;
  status: string;
}

function createData(
  id: string,
  name: string,
  email: string,
  jobApplied: string,
  dateApplied: string,
  status: string,
): Data {
  return { id, name, email, jobApplied, dateApplied, status };
}

async function fetchApplicantList({page} : {page : number}): Promise<Data[]> {
  try {
    const response = await getApplicantList({pageNumber: page});
    
    return response.data.map((applicant:any) => {
      const formattedDate = format(new Date(applicant.dateTimeApplied), 'MM/dd/yyyy');
      return createData(
        applicant.id.toString(),
        `${applicant.personalInformation.FirstName} ${applicant.personalInformation.MiddleName} ${applicant.personalInformation.LastName}`,
        applicant.personalInformation.EmailAddress,
        applicant.job.JobTitle,
        formattedDate,
        applicant.status
      )
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchListInfo({page} : {page : number}): Promise<{ pages: number, size: number }> {
  try {
    const response = await getApplicantList({pageNumber : page});
    return response.pagination;
  } catch (error) {
    console.log(error);
    return { pages: 0, size: 0 };
  }
}


export default function StickyHeadTable() {
  const [rows, setRows] = useState<Data[]>([]);
  const [pagination, setPagination] = useState<any>({}); 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  
  async function fetchData(page: number) {
    try {
      console.log("Page:", page);
      const data = await fetchApplicantList({page});
      const info = await fetchListInfo({page});
      console.log("Data from new page:", data);
      setRows([...data]);
      setPagination(info);
    } catch (error) {
      console.log(error);
      setRows([]);
      setPagination({});
    }
  }
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchData(newPage + 1);
  };

  useEffect(() => {
    console.log("Rows:", rows);
  }, [page, rows]);
  
  useEffect(() => {
    fetchData(page + 1);
  }, []);
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Link to={`/applicantDetails/${row.id}`} key={row.id}>
                          {value.toString()}
                        </Link>
                      </TableCell>
                    );
                  })}
                </TableRow>
                
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15]}
        component="div"
        count={pagination.size}
        rowsPerPage={15}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}