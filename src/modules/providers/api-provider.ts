// api-provider.ts
import { BaseProvider, type AuthData, type EventData, type JournalData, type NewEventData } from './base-provider';

export class ApiProvider extends BaseProvider {
  login(username: string, password: string): Promise<AuthData> {
    throw'Not implemented';
  }
  register(username: string, password: string): Promise<AuthData> {
    throw'Not implemented';
  }
  async getEvents(date: string): Promise<EventData[]> {
    throw 'Not implemented';
  }

  async addEvent(event: NewEventData): Promise<EventData> {
    throw 'Not implemented';
  }

  async updateEvent(event: EventData): Promise<EventData> {
    throw 'Not implemented';
  }

  async deleteEvent(id: number): Promise<void> {
    throw 'Not implemented';
  }

  async getJournal(date: string): Promise<JournalData[] | null> {
    throw 'Not implemented';
  }

  async addJournal(entry: Omit<JournalData, 'id'>): Promise<JournalData> {
    throw 'Not implemented';
  }

  async updateJournal(entry: JournalData): Promise<JournalData> {
    throw 'Not implemented';
  }

  async deleteJournal(id: number): Promise<void> {
    throw 'Not implemented';
  }
}
