export interface UrlEntry {
  id: string;
  originalUrl: string;
  shortCode?: string;
  validityMinutes?: number;
  createdAt?: string;
  expiresAt?: string;
  shortUrl?: string;
}

export interface UrlShortenerFormProps {
  onSubmit: (urls: UrlEntry[]) => void;
}

export interface UrlResultProps {
  url: UrlEntry;
}