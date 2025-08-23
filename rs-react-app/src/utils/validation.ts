import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup.string().matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be uppercase').required(),
  age: yup.number().min(0, 'No negative values').required(),
  email: yup.string().email('Invalid email').required(),
  password: yup.string()
    .matches(/[0-9]/, 'At least one number')
    .matches(/[A-Z]/, 'At least one uppercase')
    .matches(/[a-z]/, 'At least one lowercase')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character')
    .required(),
  gender: yup.string().required(),
  terms: yup.boolean().oneOf([true], 'Accept T&C'),
  image: yup.mixed(),
  country: yup.string().required(),
});

export function validateUncontrolledForm(data: any) {

  return { valid: true, errors: {}, data };
}