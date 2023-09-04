import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// METHODS HTTP

// GET
export const getFetch = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

/* put */
export const updateFetch = async (url: string, data: any, config?: any) => {
  if (config === null) {
    config = {};
  }
  const res = await axiosInstance.put(url, data, { ...config });
  return res.data;
};

/**
 ´post
 */
export const postFetch = async (url: string, data: any, config?: any) => {
  if (config === null) {
    config = {};
  }
  const res = await axiosInstance.post(url, data, { ...config });
  return res.data;
};

/**
 delete
 */
export const deleteFetch = async (url: string, config?: any) => {
  if (config === null) {
    config = {};
  }
  const res = await axiosInstance.delete(url, { ...config });
  return res.data;
};

export const endpoints = {
  pets: {
    list: 'api/pets',
    multiDelete: 'api/pets/delete-multiple'
  },
  breeds: {
    list: 'api/breeds',
    multiDelete: 'api/breeds/delete-multiple'
  },
};
