import { Observable } from 'rxjs';

export async function setLocalItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalItem(key: string) {
  let data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
}
