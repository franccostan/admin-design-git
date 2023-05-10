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

async function fetchApplicantList(): Promise<Data[]> {
  try {
    const response = await getApplicantList();
    console.log("Response:", response);

    return response.map((applicant:any) => {
      console.log("Applicant:", applicant);
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


export default function StickyHeadTable() {
  const [rows, setRows] = useState<Data[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApplicantList();
      console.log("Data:", data);
      setRows(data);
      console.log("Rows:", rows);
    };
    fetchData();
  }, []);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.jobApplied}>
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
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}