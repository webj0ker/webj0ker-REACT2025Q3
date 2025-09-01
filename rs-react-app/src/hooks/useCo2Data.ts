import { useEffect, useState } from 'react';

const DATA_URL = 'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export type CountryData = {
  country: string;
  iso: string;
  population?: number;
  year?: number;
  co2?: number;
  co2PerCapita?: number;
  methane?: number;
  nitrous?: number;
  shareGlobal?: number;
  tempChange?: number;
  totalGHG?: number;
};

export function useCo2Data(year: number) {
  const [data, setData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(DATA_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(json => {
        const result: CountryData[] = [];
        Object.entries(json).forEach(([countryName, countryObj]: any) => {
          if (!countryObj.data) return;
          const arr = countryObj.data;
          const found = arr.find((row: any) => row.year === year);
          if (found) {
            result.push({
              country: countryName, 
              iso: countryObj.iso_code, 
              population: found.population,
              year: found.year,
              co2: found.cement_co2, 
              co2PerCapita: found.cement_co2_per_capita, 
              methane: found.methane,
              nitrous: found.nitrous_oxide,
              shareGlobal: found.share_global_cumulative_luc_co2,
              tempChange: found.temperature_change_from_co2,
              totalGHG: found.total_ghg,
            });
          }
        });
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error('CO2 fetch error:', err);
        setData([]);
        setLoading(false);
      });
  }, [year]);

  return { data, loading };
}