'use server';

interface Spell {
  name: string;
  description?: string;
}

export async function createCsvContent(items: Spell[]): Promise<string> {
  const headers = ['name', 'description'];
  const rows = items.map((item) =>
    `"${item.name}","${item.description ?? ''}"`
  );
  return [headers.join(','), ...rows].join('\n');
}