
import SpellsApp from '../../src/components/SpellsApp/SpellsApp';

const ITEMS_PER_PAGE = 10;

interface Spell {
  name: string;
  description?: string;
  [key: string]: unknown;
}

// Эта функция будет выполняться на сервере при каждой загрузке страницы
async function getSpells() {
  try {
    const res = await fetch('https://hp-api.onrender.com/api/spells');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return []; 
  }
}

export default async function HomeLocalePage() {
  // Загружаем данные на сервере
  const spells = await getSpells();

  // Рендерим клиентский компонент и передаем ему данные
  return <SpellsApp initialSpells={spells} />;
}