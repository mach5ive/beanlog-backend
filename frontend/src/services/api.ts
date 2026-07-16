const API_BASE_URL = 'http://localhost:4000/api';

interface RequestOptions extends RequestInit {
  body?: any;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      // JSON parsing failed, fallback to generic message
    }
    throw new Error(errorMsg);
  }

  // Handle empty or NO-CONTENT responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
