export const ALL_COLUMNS = [
  { key: 'country', label: 'Country' },
  { key: 'iso', label: 'ISO code' },
  { key: 'population', label: 'Population' },
  { key: 'year', label: 'Year' },
  { key: 'co2', label: 'CO2' },
  { key: 'co2PerCapita', label: 'CO2 per capita' },
  { key: 'methane', label: 'Methane' },
  { key: 'nitrous', label: 'Nitrous oxide' },
  { key: 'shareGlobal', label: 'Share global cumulative luc CO2' },
  { key: 'tempChange', label: 'Temperature change from CO2' },
  { key: 'totalGHG', label: 'Total GHG' },
] as const;

export type ColumnKey = typeof ALL_COLUMNS[number]['key'];
