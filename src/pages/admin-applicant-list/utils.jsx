import axios from 'axios';

export const getApplicantList = async ({pageNumber}) => {
  return await axios.get(`http://localhost:55731/api/Application/list?Page=${pageNumber}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
