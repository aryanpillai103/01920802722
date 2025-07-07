import type { UrlEntry } from '../types/types';

const UrlResult = ({ url }: { url: UrlEntry }) => {
  if (!url.shortUrl) return null;

  return (
    <div className="p-4 border rounded-lg mb-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-gray-700">Original URL</h3>
          <p className="truncate text-blue-600 hover:text-blue-800">
            <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
              {url.originalUrl}
            </a>
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">Shortened URL</h3>
          <p className="truncate text-green-600 hover:text-green-800">
            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
              {url.shortUrl}
            </a>
          </p>
        </div>
      </div>
      {url.expiresAt && (
        <div className="mt-2">
          <h3 className="font-medium text-gray-700">Expires At</h3>
          <p>{new Date(url.expiresAt).toLocaleString()}</p>
        </div>
      )}
      <div className="mt-3">
        <button
          onClick={() => navigator.clipboard.writeText(url.shortUrl!)}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default UrlResult;