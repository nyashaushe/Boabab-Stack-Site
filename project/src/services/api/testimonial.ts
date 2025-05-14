import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role?: string;
  image?: string;
  rating?: number;
  publishedAt: string;
}

export async function fetchTestimonials(params?: Record<string, any>): Promise<Testimonial[]> {
  const response = await axios.get(`${API_URL}/testimonials`, { params });
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}

export async function submitTestimonial(data: Omit<Testimonial, 'id' | 'publishedAt'>): Promise<Testimonial> {
  const response = await axios.post(`${API_URL}/testimonials`, data);
  return { id: response.data.data.id, ...response.data.data.attributes };
}