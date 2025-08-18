import { BaseProvider, type AuthData, type EventData, type JournalData, type NewEventData } from './base-provider';
import { type ProviderError, ProviderErrorCode } from './provider-errors';
import { demoData } from './demo-data';

interface UserData {
  id: number;
  username: string;
  password: string;
}

export class LocalStorageProvider extends BaseProvider {
  private usersKey = 'users';
  private eventsKey = 'events';
  private journalKey = 'journals';

  constructor() {
    super();
    this.initDemoData();
  }

  private initDemoData() {
    if (!localStorage.getItem(this.eventsKey)) {
      localStorage.setItem(this.eventsKey, JSON.stringify(demoData.events));
    }
    if (!localStorage.getItem(this.journalKey)) {
      localStorage.setItem(this.journalKey, JSON.stringify(demoData.journals));
    }
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify(demoData.users));
    }
  }

  resetDemoData() {
    localStorage.removeItem(this.eventsKey);
    localStorage.removeItem(this.journalKey);
    localStorage.removeItem(this.usersKey);
    this.initDemoData();
  }

  private load<T>(key: string): T[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  private save<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ---- USER ----
  async login(username: string, password: string): Promise<AuthData> {
    const users = this.load<UserData>(this.usersKey);
    const user = users.find((u: UserData) => u.username === username);
    if (user && username === user.username && password === user.password) {
      return {
        token: JSON.stringify(user),
        username: username
      };
    }
    throw new Error('Invalid credentials');
  }

  async register(username: string, password: string): Promise<AuthData> {
    const users = this.load<UserData>(this.usersKey);
    const user = users.find((u: UserData) => u.username === username);
    if (user) {
      throw new Error('Invalid username or password.');
    }

    const last = users[users.length - 1] || { };
    const newUser = { username, password, id: (last?.id || 0) + 1 };
    users.push(newUser);
    this.save(this.usersKey, users);

    return {
      token: JSON.stringify(newUser),
      username: username
    };
  }

  // ---- EVENTS ----
  async getEvents(date: string) {
    /** for demo purpose all event are returned */
    return this.load<EventData>(this.eventsKey);
  }

  async addEvent(event: NewEventData) {
    const errors: Record<string, string> = {};

    if (!event.title || event.title.trim().length === 0) {
      errors.title = 'title.required';
    }

    if (event.start >= event.end) {
      errors.start = 'start.invalidRange';
      errors.end = 'end.invalidRange';
    }

    if (Object.keys(errors).length > 0) {
      throw <ProviderError>{
        code: ProviderErrorCode.VALIDATION_ERROR,
        details: errors
      };
    }
    const events = this.load<EventData>(this.eventsKey);
    const last = events[events.length - 1] || { };
    const newEvent = { ...event, id: (last?.id || 0) + 1 };
    events.push(newEvent);
    this.save(this.eventsKey, events);
    return newEvent;
  }

  async updateEvent(event: EventData) {
    const events = this.load<EventData>(this.eventsKey);
    const idx = events.findIndex(e => e.id === event.id);
    if (idx === -1) throw { code: ProviderErrorCode.NOT_FOUND } as ProviderError;
    events[idx] = event;
    this.save(this.eventsKey, events);
    return event;
  }
  async deleteEvent(id: number) {
    const events = this.load<EventData>(this.eventsKey).filter(e => e.id !== id);
    this.save(this.eventsKey, events);
  }

  // ---- JOURNAL ----
  async getJournal(date: string) {
    /** for demo purpose the first journal is returned */
    const journals = this.load<JournalData>(this.journalKey);

    return journals[0] || null;
  }
  async addJournal(entry: Omit<JournalData, 'id'>) {
    const journals = this.load<JournalData>(this.journalKey);
    const last = journals[journals.length - 1] || { };
    const newJournal = { ...entry, id: (last?.id || 0) + 1 };
    journals.push(newJournal);
    this.save(this.journalKey, journals);
    return newJournal;
  }
  async updateJournal(entry: JournalData) {
    const journals = this.load<JournalData>(this.journalKey);
    const idx = journals.findIndex(j => j.id === entry.id);
    if (idx === -1) throw { code: ProviderErrorCode.NOT_FOUND } as ProviderError;
    journals[idx] = entry;
    this.save(this.journalKey, journals);
    return entry;
  }
  async deleteJournal(id: number) {
    const journals = this.load<JournalData>(this.journalKey).filter(j => j.id !== id);
    this.save(this.journalKey, journals);
  }
}
