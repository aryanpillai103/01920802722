import UrlShortenerForm from "../components/URLShortenerForm"
import type { UrlEntry } from "../types/types"

export default function URLShortener() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">URL Shortener</h1>
        <p className="text-gray-600 mb-6">
          Shorten your URLs quickly and easily. You can shorten up to 5 URLs at once with custom options.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-4">
            Enter the URLs you want to shorten below. You can also specify a custom short code and validity period.
          </p>
          <UrlShortenerForm onSubmit={function (_urls: UrlEntry[]): void {
            throw new Error("Function not implemented.")
          } } />
          </div>
      </div>
    </div>
  )
}