import axios from 'axios';

let user = JSON.parse(sessionStorage.getItem('user'))
console.log(user, 'Getting user?')

export default {
  getTasks: () => {
    if (!user) {
      user = JSON.parse(sessionStorage.getItem('user'));
    }
    return axios.get(`/api/tasks/${user.id}`);
  },

  getTask: (id) => {
    return axios.get(`/api/tasks/${id}`);
  },

  addTask: (taskData) => {
    if (!user) {
      user = JSON.parse(sessionStorage.getItem('user'));
    }
    return axios.post(`/api/tasks/${user.id}`, taskData);
  },

  deleteTask: (taskId) => {
    return axios.delete(`/api/tasks/${user.id}/${taskId}`);
  },

  updateTask: (id) => {
    return axios.put(`/api/tasks/${id}`);
  },

  addUser: (userData) => {
    console.log(`adding ${JSON.stringify(userData)}`)
    return axios.post('/api/user', userData);
  },

  getUsers: () => {
    console.log(`getting users}`)
    return axios.get('/api/user', {})
  },

    login:(userData) => {
      console.log('posting...')
        return axios.post('/api/user/login', userData)
    }
};
