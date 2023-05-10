import axios from 'axios';

export const getApplicantList = () => {
  return axios.get(`http://localhost:55731/api/Application/list?Page=1`)
    .then((response) => {
      console.log("First Data", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
