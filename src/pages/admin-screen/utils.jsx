import axios from 'axios';

export const getAdminList = async () => {
  return await axios.get(`http://localhost:55731/api/UserAPI/list?IsActive=true&Page=1&PageSize=15`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
