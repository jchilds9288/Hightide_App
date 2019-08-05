import axios from 'axios';

import { authHeader } from '../utils/auth-header';

export default {
  getAll: async () => {
    console.log('asdfasdf');
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    };
    console.log('about to send..')
    axios.get('/api/team', requestOptions)
      .then((res) => {
        console.log(`data: ${JSON.stringify(res.data)}`);
        return res.data;
      })
      .catch((err) => {
        console.log(`i fucked up: ${err}`)
      });
    },
};
