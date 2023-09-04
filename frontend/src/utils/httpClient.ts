import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axios';

class HttpClient {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axiosInstance;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.delete(url, config);
    return response.data;
  }
}

export const httpClient = new HttpClient();
