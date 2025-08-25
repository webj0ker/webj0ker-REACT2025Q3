import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addControlled } from '../../store/formSlice';
import { formSchema, type FormSchemaType } from '../../utils/validation';
import { useState } from 'react';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';

export default function ControlledForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState<FormSchemaType & { imageUrl?: string } | null>(null);

  const { control, register, handleSubmit, formState, reset } = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormSchemaType) => {
    let imageUrl = '';
    if (data.image && data.image[0]) {
      imageUrl = URL.createObjectURL(data.image[0]);
    }
    dispatch(
      addControlled({
        ...data,
        image: imageUrl,
      })
    );
    setSubmitted({ ...data, imageUrl }); 
    onSuccess(); 
    reset();
  };

  return (
    <div>
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
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CountryAutocomplete {...field} />
          )}
        />
        {formState.errors.country && (
          <div className="error">{formState.errors.country.message}</div>
        )}

        <button type="submit" disabled={!formState.isValid}>
          Submit
        </button>
      </form>

      
    </div>
  );
}
