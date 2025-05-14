import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

export interface Newsletter {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
}

export async function fetchNewsletters(params?: Record<string, any>): Promise<Newsletter[]> {
  const response = await axios.get(`${API_URL}/newsletters`, { params });
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}

export async function fetchNewsletter(id: number): Promise<Newsletter> {
  const response = await axios.get(`${API_URL}/newsletters/${id}`);
  return { id: response.data.data.id, ...response.data.data.attributes };
}

export async function subscribeToNewsletter(email: string): Promise<any> {
  const response = await axios.post(`${API_URL}/newsletter-subscribers`, { email });
  return response.data;
}