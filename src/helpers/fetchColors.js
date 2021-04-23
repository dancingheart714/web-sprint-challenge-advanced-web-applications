import { axiosWithAuth } from '../helpers/axiosWithAuth';

const fetchColors = () => {
  return axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export default fetchColors;
