const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:4000';

function resolveUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(resolveUrl(path), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.headers ?? {})
    },
    cache: init.cache ?? 'no-store',
    next: init.next ?? { revalidate: 0 }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as T;
}
