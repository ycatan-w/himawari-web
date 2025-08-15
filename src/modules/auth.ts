import { getProvider } from "@/modules/providers";
const provider = () => getProvider();

const STORAGE_USERNAME_KEY = 'currentUser'
const STORAGE_AUTH_TOKEN_KEY = 'authToken';

export async function register(username: string, password: string) {
  const authData = await provider().register(username, password);
  authenticate(authData.token, authData.username);
}

export async function login(username: string, password: string) {
  const authData = await provider().login(username, password);
  authenticate(authData.token, authData.username);
}

export function logout() {
  deauthenticate();
}

function authenticate(token: string, username: string): void {
  localStorage.setItem(STORAGE_USERNAME_KEY, username);
  localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, token);
}

function deauthenticate(): void {
  localStorage.removeItem(STORAGE_USERNAME_KEY);
  localStorage.removeItem(STORAGE_AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(STORAGE_USERNAME_KEY);
}

export function getCurrentUser(): string | null {
  return localStorage.getItem(STORAGE_USERNAME_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
}


/*

j'ai cette utilsation dans `auth.js`:
```
import { getProvider } from "@/modules/providers";
const provider = getProvider();
```

le provider est pas encore init quand c'est utiliser (via le router.ts)
j'ai changer l'utilisation en:
```
const provider = () => getProvider();
```
est la bonne facon de faire ?

*/
