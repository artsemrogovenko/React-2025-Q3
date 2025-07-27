import student from '../assets/rs-school.d8af85c6.webp';
import { ToHomepage } from '../components/ToHomepage';

export function About() {
  return (
    <div
      className={`flex flex-col size-min-[300px] gap-y-[20px] items-center content-center font-bold  h-[50dvh]`}
      data-testid="about-page"
    >
      <div>
        <h1 className="text-xl">Author:</h1>
        <span className="text-2xl">Artsem Rogovenko</span>
      </div>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        className="flex flex-col stre rounded-full size-[200px] bg-amber-200  text-3xl  "
        rel="noreferrer"
      >
        <img
          src={student}
          alt="student"
          className="size-full size-min-[40px]"
          data-testid="student-img"
        />
        <span>React-2025-Q3</span>
      </a>
      <ToHomepage className={'mt-[40px] relative top-5'} />
    </div>
  );
}
