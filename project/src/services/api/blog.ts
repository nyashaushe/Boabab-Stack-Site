import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  categories: string[];
  featuredImage?: string;
  publishedAt: string;
}

export async function fetchBlogPosts(params?: Record<string, any>): Promise<BlogPost[]> {
  const response = await axios.get(`${API_URL}/blogs`, { params });
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}

export async function fetchBlogPost(id: number): Promise<BlogPost> {
  const response = await axios.get(`${API_URL}/blogs/${id}`);
  return { id: response.data.data.id, ...response.data.data.attributes };
}