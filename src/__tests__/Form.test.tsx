import { test } from 'vitest';
import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { buttonForControlled, buttonForUncontrolled, user } from './Prepare';

const imageFile = new File([''], 'image.jpg', { type: 'image/jpeg' });
const textFile = new File([''], 'primer.txt', { type: 'text/plain' });

const expectedFields = [
  'Upload image',
  'Name',
  'Age',
  'Email',
  'Password',
  'Repeat Password',
  'Gender',
  'Country',
  'Submit',
] as const;

const wrongPassword = 'abc';
const simplePassword = '1A@a';

const validData = [
  imageFile,
  'Bob',
  '12',
  'sample@sample.com',
  simplePassword,
  simplePassword,
  'Male',
  'Japan',
] as const;

const wrongData = [
  textFile,
  'bob',
  '-12',
  'sample@',
  wrongPassword,
  simplePassword,
  'a',
  'pan',
] as const;

async function fillInputs(values: typeof validData | typeof wrongData) {
  const fileInput = screen.getByTestId('picture');
  const nameInput = screen.getByTestId('name');
  const ageInput = screen.getByTestId('age');
  const emailInput = screen.getByTestId('email');
  const passwordInput = screen.getByTestId('password');
  const repeatPasswordInput = screen.getByTestId('repeat');
  const genderSelect = screen.getByTestId('gender');
  const countrySelect = screen.getByTestId('country');

  await user.clear(nameInput);
  await user.clear(ageInput);
  await user.clear(emailInput);
  await user.clear(passwordInput);
  await user.clear(repeatPasswordInput);
  await user.clear(genderSelect);
  await user.clear(countrySelect);

  await user.type(nameInput, values[1]);
  await user.type(ageInput, values[2]);
  await user.type(emailInput, values[3]);
  await user.type(passwordInput, values[4]);
  await user.type(repeatPasswordInput, values[5]);
  await user.type(genderSelect, values[6]);
  await user.type(countrySelect, values[7]);

  await user.upload(fileInput, values[0]);
}

describe('Testing Requirements / Unit Testing', () => {
  test('Test controlled render', async () => {
    if (buttonForControlled) {
      act(() => {
        buttonForControlled?.click();
      });
      expect(screen.getByTestId('MyForm')).toBeInTheDocument();
      expectedFields.forEach((field) => {
        expect(screen.getByText(field)).toBeInTheDocument();
      });
    }
  });

  test('Test controlled render', async () => {
    if (buttonForControlled) {
      act(() => {
        buttonForControlled?.click();
      });
      expect(screen.getByTestId('MyForm')).toBeInTheDocument();
      expectedFields.forEach((field) => {
        expect(screen.getByText(field)).toBeInTheDocument();
      });
    }
  });

  test('Test controlled validation fail', async () => {
    if (buttonForControlled) {
      act(() => {
        buttonForControlled?.click();
      });
    }
    expect(screen.getByTestId('MyForm')).toBeInTheDocument();

    await fillInputs([...wrongData]);
    expect(screen.getAllByTestId('errorTip').length).toBe(wrongData.length);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeDisabled();
  });

  test('Test controlled validation pass', async () => {
    if (buttonForControlled) {
      act(() => {
        buttonForControlled?.click();
      });
    }
    expect(screen.getByTestId('MyForm')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Submit' });

    await fillInputs([...wrongData]);
    const alerts = screen.getAllByTestId('errorTip');
    expect(alerts.length).toBe(wrongData.length);
    expect(button).toHaveAttribute('disabled');

    await fillInputs([...validData]);

    alerts.forEach((alert) => expect(alert).not.toBeInTheDocument());
    expect(button).not.toHaveAttribute('disabled');
  });

  test('Test uncontrolled validation fail', async () => {
    if (buttonForUncontrolled) {
      act(() => {
        buttonForUncontrolled?.click();
      });
    }
    expect(screen.getByTestId('MyForm')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Submit' });
    const checkbox = screen.getByRole('checkbox');
    expect(button).toBeEnabled();
    await fillInputs([...wrongData]);
    await user.click(checkbox);
    await user.click(button);

    expect(screen.getAllByTestId('errorTip').length).toBe(wrongData.length - 1);
  });

  test('Test uncontrolled validation pass', async () => {
    if (buttonForUncontrolled) {
      act(() => {
        buttonForUncontrolled?.click();
      });
    }
    expect(screen.getByTestId('MyForm')).toBeInTheDocument();

    await fillInputs([...validData]);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).not.toBeDisabled();
  });

  test('Test controlled submit and close form', async () => {
    if (buttonForControlled) {
      act(() => {
        buttonForControlled?.click();
      });
    }
    const form = screen.getByTestId('MyForm');
    expect(form).toBeInTheDocument();

    await fillInputs([...validData]);
    const button = screen.getByRole('button', { name: 'Submit' });
    const checkbox = screen.getByRole('checkbox');
    expect(button).not.toBeDisabled();

    await user.click(checkbox);
    await user.click(button);

    expect(form).not.toBeInTheDocument();
  });
});
