import axios from 'axios';
import { environment } from '../environment';

export const httpClient = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
});
