'use client';
import { useTranslations } from 'next-intl';

interface Spell {
  name: string;
  description?: string;
}

interface SpellDetailsProps {
  spell?: Spell;
  onClose: () => void;
}

const SpellDetails: React.FC<SpellDetailsProps> = ({ spell, onClose }) => {
  const t = useTranslations();

  if (!spell) return null;

  return (
    <aside className="spell-details">
      <button onClick={onClose}>{t('Close')}</button>
      <h2>{spell.name}</h2>
      <p>{spell.description}</p>
    </aside>
  );
};

export default SpellDetails;
