// utils/validation.ts
import * as yup from 'yup';

// Схема валидации для React Hook Form
export const formSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be uppercase')
    .required('Name is required'),
  age: yup.number().min(0, 'No negative values').required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(/[0-9]/, 'At least one number')
    .matches(/[A-Z]/, 'At least one uppercase')
    .matches(/[a-z]/, 'At least one lowercase')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character')
    .required('Password is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'Accept T&C')
    .required('You must accept T&C'),
  image: yup
    .mixed<FileList>()
    .test(
      'fileRequired',
      'Image is required',
      (value) => value && value.length > 0
    )
    .required('Image is required'),
  country: yup.string().required('Country is required'),
});

// Тип, который соответствует схеме
export type FormSchemaType = yup.InferType<typeof formSchema>;

// Для uncontrolled формы — простая проверка
export async function validateUncontrolledForm(data: any) {
  const errors: Record<string, string> = {};

  if (!data.name) errors.name = 'Name is required';
  if (!data.age) errors.age = 'Age is required';
  if (!data.email) errors.email = 'Email is required';
  if (!data.password) errors.password = 'Password is required';
  if (!data.gender) errors.gender = 'Gender is required';
  if (!data.country) errors.country = 'Country is required';
  if (!data.terms) errors.terms = 'Accept T&C';
  if (!data.image || data.image.length === 0)
    errors.image = 'Image is required';

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  // Преобразуем FileList в URL
  const imageUrl =
    data.image && data.image[0] ? URL.createObjectURL(data.image[0]) : '';

  return {
    valid: true,
    data: {
      ...data,
      image: imageUrl,
    },
  };
}
