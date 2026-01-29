'use client';

import { useSearch } from '@/hooks/useSearch';
import { formatPrice } from '@/utils/formatters';

export default function ListingsPage() {
  const { filters, updateFilter, results, isLoading } = useSearch();

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e) => updateFilter('q', e.target.value)}
      />
      <select onChange={(e) => updateFilter('transaction_type', e.target.value)}>
        <option value="">All</option>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>

      {isLoading && <div>Loading...</div>}
      
      {results?.results.map((listing) => (
        <div key={listing.id}>
          <h3>{listing.title}</h3>
          <p>{formatPrice(listing.price_amount, listing.price_currency)}</p>
        </div>
      ))}
    </div>
  );
}
