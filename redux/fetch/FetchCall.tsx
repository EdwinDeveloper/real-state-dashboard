import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { AxiosOptions } from '../../components/Models/Fetch/AxiosOptions';
import { AxiosErrorResponse } from './responses';

export async function FetchCall<T>( options: AxiosOptions = {}): Promise<T> {
  const defaultOptions: AxiosRequestConfig = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const axiosOptions: AxiosRequestConfig = { ...defaultOptions, ...options };
  try {
    const response = await axios(axiosOptions);
    const data = response as T;
    return data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    let errorResponse: AxiosErrorResponse = {
        status: axiosError.response?.status,
        messages: message_builder(axiosError.response?.data)
    }
    return errorResponse as T
  }
}

const message_builder = (body: any) => {
    const entries: any = Object.entries(body)
    let messages: any = []
    entries.forEach((entrie: any) => {
        messages.push({
            key: entrie[0],
            value: entrie[1][0]
        })
    })
    return messages
}