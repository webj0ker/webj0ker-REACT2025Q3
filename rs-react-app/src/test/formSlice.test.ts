import formReducer, {
  addUncontrolled,
  type FormData,
} from '../store/formSlice';

describe('formSlice', () => {
  it('should add uncontrolled form data', () => {
    const initialState = { uncontrolled: [], controlled: [] };
    const data: FormData = {
      name: 'Ivan',
      age: 25,
      email: 'ivan@mail.com',
      password: 'Pass123!',
      gender: 'male',
      terms: true,
      image: '',
      country: 'Russia',
    };
    const state = formReducer(initialState, addUncontrolled(data));
    expect(state.uncontrolled).toHaveLength(1);
    expect(state.uncontrolled[0].name).toBe('Ivan');
  });
});
