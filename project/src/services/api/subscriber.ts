import axios from 'axios';

const API_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';

export interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

export async function fetchSubscribers(params?: Record<string, any>): Promise<Subscriber[]> {
  const response = await axios.get(`${API_URL}/subscribers`, { params });
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}

export async function subscribe(email: string): Promise<Subscriber> {
  const response = await axios.post(`${API_URL}/subscribers`, { email });
  return { id: response.data.data.id, ...response.data.data.attributes };
}