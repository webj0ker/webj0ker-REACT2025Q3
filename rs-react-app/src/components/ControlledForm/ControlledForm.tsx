import { useForm } from 'react-hook-form';


interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean;
  image: FileList;
  country: string;
}

export default function ControlledForm({  }: { onSuccess: () => void }) {

  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = () => {

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
      <label htmlFor="name">Name</label>
      <input id="name" {...register('name')} />
      {formState.errors.name && <div className="error">{formState.errors.name.message}</div>}
      <button type="submit" disabled={!formState.isValid}>Submit</button>
    </form>
  );
}