import axios from 'axios';

const API_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  categories: string[];
  featuredImage?: string;
  publishedAt: string;
}

export async function fetchArticles(params?: Record<string, any>): Promise<Article[]> {
  const response = await axios.get(`${API_URL}/articles`, { params });
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}

export async function fetchArticle(id: number): Promise<Article> {
  const response = await axios.get(`${API_URL}/articles/${id}`);
  return { id: response.data.data.id, ...response.data.data.attributes };
}