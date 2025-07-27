import { render, screen } from '@testing-library/react';
import { Wrapper } from './__mock__/wrapper';
import '@testing-library/jest-dom/vitest';
import { About } from '../pages/About';

describe('About page', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <About />
      </Wrapper>
    );
  });

  test('renders author information', () => {
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    expect(screen.getByText('Author:')).toBeInTheDocument();
  });

  test('renders RS School link with image', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    const image = screen.getByTestId('student-img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/src/assets/rs-school.d8af85c6.webp');
    expect(image).toHaveAttribute('alt', 'student');
  });

  test('course name', () => {
    expect(screen.getByText('React-2025-Q3')).toBeInTheDocument();
  });

  test('renders ToHomepage buttton', () => {
    expect(screen.getByTestId('go-homepage')).toBeInTheDocument();
    expect(screen.getByText('back to homepage')).toBeInTheDocument();
  });
});
