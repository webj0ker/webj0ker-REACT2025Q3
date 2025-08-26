type Props = {
  item: {
    name: string;
    age: number;
    email: string;
    password: string;
    gender: string;
    country: string;
    terms: boolean;
    image?: string;
  };
};

export default function FormDataTile({ item }: Props) {
  return (
    <div className="tile">
      <p><strong>Имя:</strong> {item.name}</p>
      <p><strong>Возраст:</strong> {item.age}</p>
      <p><strong>Email:</strong> {item.email}</p>
      <p><strong>Пароль:</strong> {item.password}</p>
      <p><strong>Пол:</strong> {item.gender === 'male' ? 'Мужской' : item.gender === 'female' ? 'Женский' : ''}</p>
      <p><strong>Страна:</strong> {item.country}</p>
      <p><strong>Согласие с условиями:</strong> {item.terms ? 'Да' : 'Нет'}</p>
      {item.image && (
        <div style={{ marginTop: '8px' }}>
          <strong>Картинка:</strong>
          <br />
          <img
            src={item.image}
            alt="Загруженное"
            style={{
              maxWidth: '120px',
              maxHeight: '120px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              marginTop: '4px',
            }}
          />
        </div>
      )}
    </div>
  );
}