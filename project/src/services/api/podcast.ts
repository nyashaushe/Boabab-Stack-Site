import axios from 'axios';

const API_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';

export interface Podcast {
  id: number;
  title: string;
  description: string;
  audioUrl?: string;
  videoUrl?: string;
  duration?: string;
  publishedAt: string;
}

export async function fetchPodcasts(params?: Record<string, any>): Promise<Podcast[]> {
  const response = await axios.get(`${API_URL}/podcasts`, { params });
  return response.data.data.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));
}

export async function fetchPodcast(id: number): Promise<Podcast> {
  const response = await axios.get(`${API_URL}/podcasts/${id}`);
  return { id: response.data.data.id, ...response.data.data.attributes };
}