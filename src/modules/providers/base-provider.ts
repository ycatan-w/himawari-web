export interface AuthData {
  token: string;
  username: string;
}

export interface NewEventData {
  title: string;
  description: string;
  date: string;
  start: number;
  end: number;
}

export interface EventData extends NewEventData {
  id: number;
}

export interface JournalData {
  id: number;
  date: string;
  text: string;
}

export abstract class BaseProvider {
  abstract login(username: string, password: string): Promise<AuthData>;
  abstract register(username: string, password: string): Promise<AuthData>;
  abstract logout(token: string | null): Promise<void>;

  abstract getEvents(date: string): Promise<EventData[]>;
  abstract addEvent(event: NewEventData): Promise<EventData>;
  abstract updateEvent(event: EventData): Promise<EventData>;
  abstract deleteEvent(id: number): Promise<void>;

  abstract getJournal(date: string): Promise<JournalData[] | null>;
  abstract addJournal(entry: Omit<JournalData, 'id'>): Promise<JournalData>;
  abstract updateJournal(entry: JournalData): Promise<JournalData>;
  abstract deleteJournal(id: number): Promise<void>;
}
