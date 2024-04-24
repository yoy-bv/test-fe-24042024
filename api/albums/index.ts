import { AxiosResponse } from 'axios';

import { Photos, Albums } from '@/base/types/albums';
import api from '../api';

export function fetchAlbums() {
  return api.get(`/albums`);
}

export function fetchPhotosByIdAlbum(id: string): Promise<AxiosResponse<Photos[]>> {
  return api.get(`/albums/${id}/photos`);
}

