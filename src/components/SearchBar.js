import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const client = algoliasearch('YOUR_APP_ID', 'YOUR_SEARCH_KEY');

export default function SearchBar({ onSelect }) {
  return (
    <InstantSearch indexName="cities" searchClient={client}>
      <SearchBox />
      <Hits hitComponent={({ hit }) => (
        <div onClick={() => onSelect(hit.name)} style={{ cursor: 'pointer' }}>
          {hit.name}, {hit.country}
        </div>
      )} />
    </InstantSearch>
  );
}
