import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUncontrolled } from '../../store/formSlice';
import { validateUncontrolledForm } from '../../utils/validation';

interface Props {
  onSuccess: () => void;
}

export default function UncontrolledForm({ onSuccess }: Props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;

    const elements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      age: HTMLInputElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
      gender: HTMLSelectElement;
      terms: HTMLInputElement;
      image: HTMLInputElement;
      country: HTMLSelectElement;
    };

    // Преобразуем image в URL, чтобы соответствовать типу Redux
    const data = {
      name: elements.name.value,
      age: Number(elements.age.value),
      email: elements.email.value,
      password: elements.password.value,
      gender: elements.gender.value,
      terms: elements.terms.checked,
      image:
        elements.image.files && elements.image.files[0]
          ? URL.createObjectURL(elements.image.files[0])
          : '', // строка
      country: elements.country.value,
    };

    const validation = await validateUncontrolledForm(data);

    if (validation.valid && validation.data) {
      dispatch(addUncontrolled(validation.data));
      onSuccess();
    } else if (validation.errors) {
      setErrors(validation.errors);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="form">
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" />
      {errors.name && <div className="error">{errors.name}</div>}

      <label htmlFor="age">Age</label>
      <input id="age" name="age" type="number" />
      {errors.age && <div className="error">{errors.age}</div>}

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />
      {errors.email && <div className="error">{errors.email}</div>}

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      {errors.password && <div className="error">{errors.password}</div>}

      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender">
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <div className="error">{errors.gender}</div>}

      <label htmlFor="country">Country</label>
      <select id="country" name="country">
        <option value="">Select country</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Germany">Germany</option>
      </select>
      {errors.country && <div className="error">{errors.country}</div>}

      <label htmlFor="image">Image</label>
      <input id="image" name="image" type="file" />
      {errors.image && <div className="error">{errors.image}</div>}

      <label>
        <input id="terms" name="terms" type="checkbox" /> Accept Terms &
        Conditions
      </label>
      {errors.terms && <div className="error">{errors.terms}</div>}

      <button type="submit">Submit</button>
    </form>
  );
}
