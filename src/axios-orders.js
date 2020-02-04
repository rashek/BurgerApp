import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-burger-app-f1c13.firebaseio.com/'
});

export default instance;
