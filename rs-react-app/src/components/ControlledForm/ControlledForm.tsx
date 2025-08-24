import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addControlled } from '../../store/formSlice';
import { formSchema, type FormSchemaType } from '../../utils/validation';
// import '../../Form.css';

export default function ControlledForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormSchemaType) => {
    dispatch(
      addControlled({
        ...data,
        image:
          data.image && data.image[0] ? URL.createObjectURL(data.image[0]) : '',
      })
    );
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
      <label htmlFor="name">Name</label>
      <input id="name" {...register('name')} />
      {formState.errors.name && (
        <div className="error">{formState.errors.name.message}</div>
      )}

      <label htmlFor="age">Age</label>
      <input id="age" type="number" {...register('age')} />
      {formState.errors.age && (
        <div className="error">{formState.errors.age.message}</div>
      )}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...register('email')} />
      {formState.errors.email && (
        <div className="error">{formState.errors.email.message}</div>
      )}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" {...register('password')} />
      {formState.errors.password && (
        <div className="error">{formState.errors.password.message}</div>
      )}

      <label>Gender</label>
      <select {...register('gender')}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {formState.errors.gender && (
        <div className="error">{formState.errors.gender.message}</div>
      )}

      <label htmlFor="terms">
        <input type="checkbox" id="terms" {...register('terms')} />
        Accept T&C
      </label>
      {formState.errors.terms && (
        <div className="error">{formState.errors.terms.message}</div>
      )}

      <label htmlFor="image">Upload image</label>
      <input type="file" id="image" {...register('image')} />
      {formState.errors.image && (
        <div className="error">{formState.errors.image.message}</div>
      )}

      <label htmlFor="country">Country</label>
      <input id="country" {...register('country')} />
      {formState.errors.country && (
        <div className="error">{formState.errors.country.message}</div>
      )}

      <button type="submit" disabled={!formState.isValid}>
        Submit
      </button>
    </form>
  );
}
