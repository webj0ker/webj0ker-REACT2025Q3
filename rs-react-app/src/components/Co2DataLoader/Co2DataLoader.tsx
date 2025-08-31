import { Suspense } from 'react';

export default function Co2DataLoader() {
  return (
    <Suspense fallback={<div>Loading data...</div>}>

    </Suspense>
  );
}