import axios from 'axios';

export const getApplicant = async ({username}) => {
  return await axios.get(`http://localhost:55731/api/UserAPI/getUser?id=${username}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
