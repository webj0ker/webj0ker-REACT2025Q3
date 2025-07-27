interface Spell {
  name: string;
  description?: string;
}

interface SpellDetailsProps {
  spell?: Spell;
  onClose: () => void;
}

const SpellDetails: React.FC<SpellDetailsProps> = ({ spell, onClose }) => {
  if (!spell) return <div>No details found</div>;

  return (
    <aside style={{ borderLeft: '1px solid #ccc', padding: 16, minWidth: 250 }}>
      <button onClick={onClose}>Close</button>
      <h2>{spell.name}</h2>
      <p>{spell.description}</p>
    </aside>
  );
};

export default SpellDetails;
