import { getToken } from '../auth';
import {
  BaseProvider,
  type AuthData,
  type EventData,
  type JournalData,
  type NewEventData,
} from './base-provider';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface APIError {
  field: string;
  code: string;
  details: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  errors: APIError[];
  message: string;
}

export class APIException extends Error {
  status: number;
  errors: APIError[];
  responseMessage: string;

  constructor(status: number, message: string, errors: APIError[] = []) {
    super(message);
    this.name = 'APIException';
    this.status = status;
    this.errors = errors;
    this.responseMessage = message;
  }
}

export class ApiProvider extends BaseProvider {
  async apiFetch<T>(
    endpoint: string,
    includeToken: boolean,
    options: RequestInit = {},
  ): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(includeToken && token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new APIException(response.status, `Invalid response content-type`);
    }
    const result = (await response.json()) as APIResponse<T>;
    if (!result.success) {
      throw new APIException(response.status, result.message, result.errors);
    }

    return result.data;
  }

  async apiFetchNoContent(
    endpoint: string,
    includeToken: boolean,
    options: RequestInit = {},
  ): Promise<void> {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(includeToken && token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    if (response.status !== 204) {
      throw new APIException(
        response.status,
        `Invalid response status code. Expect 204 but got ${response.status}`,
      );
    }
  }

  async login(username: string, password: string): Promise<AuthData> {
    return this.apiFetch<AuthData>('/login', false, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }
  async register(username: string, password: string): Promise<AuthData> {
    return this.apiFetch<AuthData>('/register', false, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }
  async logout(token: string | null): Promise<void> {
    if (!token) {
      return;
    }
    this.apiFetchNoContent('/logout', false, {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
  async getEvents(date: string): Promise<EventData[]> {
    return this.apiFetch<EventData[]>(`/events?date=${date}`, true, {
      method: 'GET',
    });
  }

  async addEvent(event: NewEventData): Promise<EventData> {
    return this.apiFetch<EventData>('/events', true, {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async updateEvent(event: EventData): Promise<EventData> {
    return this.apiFetch<EventData>(`/events/${event.id}`, true, {
      method: 'PUT',
      body: JSON.stringify(event),
    });
  }

  async deleteEvent(id: number): Promise<void> {
    this.apiFetchNoContent(`/events/${id}`, true, {
      method: 'DELETE',
    });
  }

  async getJournal(date: string): Promise<JournalData[]> {
    return this.apiFetch<JournalData[]>(`/logs?date=${date}`, true, {
      method: 'GET',
    });
  }

  async addJournal(entry: Omit<JournalData, 'id'>): Promise<JournalData> {
    return this.apiFetch<JournalData>('/logs', true, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  async updateJournal(entry: JournalData): Promise<JournalData> {
    return this.apiFetch<JournalData>(`/logs/${entry.id}`, true, {
      method: 'PUT',
      body: JSON.stringify(entry),
    });
  }

  async deleteJournal(id: number): Promise<void> {
    this.apiFetchNoContent(`/logs/${id}`, true, {
      method: 'DELETE',
    });
  }
}
