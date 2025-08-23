import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateUncontrolledForm } from '../../utils/validation';



export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;
    const data = {
      name: form.name.value,
      age: Number(form.age.value),
      email: form.email.value,
      password: form.password.value,
      gender: form.gender.value,
      terms: form.terms.checked,
      image: form.image.files[0],
      country: form.country.value,
    };

    const validation = validateUncontrolledForm(data);
    if (validation.valid) {
   
    } else {
      setErrors(validation.errors);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="form">
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" />
      {errors.name && <div className="error">{errors.name}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}