import { Suspense } from 'react';
import CountryList from '../CountryList/CountryList';

export default function Co2DataLoader() {
  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <CountryList />
    </Suspense>
  );
}