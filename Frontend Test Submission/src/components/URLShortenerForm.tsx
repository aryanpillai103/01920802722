import { useState } from 'react';
import type { UrlEntry } from '../types/types';

const MAX_URLS = 5;

const UrlShortenerForm = ({ onSubmit }: { onSubmit: (urls: UrlEntry[]) => void }) => {
  const [urls, setUrls] = useState<UrlEntry[]>([
    { id: crypto.randomUUID(), originalUrl: '', shortCode: '', validityMinutes: undefined }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    urls.forEach((url, _index) => {
      if (!url.originalUrl.trim()) {
        newErrors[`originalUrl-${url.id}`] = 'URL is required';
        isValid = false;
      } else if (!validateUrl(url.originalUrl)) {
        newErrors[`originalUrl-${url.id}`] = 'Invalid URL format';
        isValid = false;
      }

      if (url.validityMinutes && (isNaN(url.validityMinutes) || url.validityMinutes <= 0)) {
        newErrors[`validityMinutes-${url.id}`] = 'Validity must be a positive number';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(urls);
    }
  };

  const handleUrlChange = (id: string, field: keyof UrlEntry, value: string | number | undefined) => {
    setUrls(prevUrls =>
      prevUrls.map(url =>
        url.id === id ? { ...url, [field]: value } : url
      )
    );
  };

  const addUrlField = () => {
    if (urls.length < MAX_URLS) {
      setUrls(prevUrls => [
        ...prevUrls,
        { id: crypto.randomUUID(), originalUrl: '', shortCode: '', validityMinutes: undefined }
      ]);
    }
  };

  const removeUrlField = (id: string) => {
    if (urls.length > 1) {
      setUrls(prevUrls => prevUrls.filter(url => url.id !== id));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {urls.map((url, index) => (
        <div key={url.id} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">URL #{index + 1}</h3>
            {urls.length > 1 && (
              <button
                type="button"
                onClick={() => removeUrlField(url.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label htmlFor={`originalUrl-${url.id}`} className="block text-sm font-medium text-gray-700">
              Original URL *
            </label>
            <input
              type="text"
              id={`originalUrl-${url.id}`}
              value={url.originalUrl}
              onChange={(e) => handleUrlChange(url.id, 'originalUrl', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="https://example.com"
            />
            {errors[`originalUrl-${url.id}`] && (
              <p className="mt-1 text-sm text-red-600">{errors[`originalUrl-${url.id}`]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`shortCode-${url.id}`} className="block text-sm font-medium text-gray-700">
                Preferred Short Code (optional)
              </label>
              <input
                type="text"
                id={`shortCode-${url.id}`}
                value={url.shortCode || ''}
                onChange={(e) => handleUrlChange(url.id, 'shortCode', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                placeholder="my-custom-code"
              />
            </div>

            <div>
              <label htmlFor={`validityMinutes-${url.id}`} className="block text-sm font-medium text-gray-700">
                Validity Period in Minutes (optional)
              </label>
              <input
                type="number"
                id={`validityMinutes-${url.id}`}
                value={url.validityMinutes || ''}
                onChange={(e) => handleUrlChange(url.id, 'validityMinutes', e.target.value ? parseInt(e.target.value) : undefined)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                placeholder="60"
                min="1"
              />
              {errors[`validityMinutes-${url.id}`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`validityMinutes-${url.id}`]}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-4">
        {urls.length < MAX_URLS && (
          <button
            type="button"
            onClick={addUrlField}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Another URL
          </button>
        )}

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Shorten URLs
        </button>
      </div>
    </form>
  );
};

export default UrlShortenerForm;