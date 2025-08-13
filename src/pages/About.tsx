import student from '../../public/rs-school.d8af85c6.webp';
import { ToHomepageButton } from '../components/ToHomepageButton';
import Image from 'next/image';

export function About() {
  return (
    <div
      className={`flex flex-col size-min-[300px] gap-y-[20px] items-center content-center font-bold  h-[80vh]`}
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
        <Image
          src={student}
          alt="student"
          className="size-full size-min-[40px]"
          data-testid="student-img"
          width={200}
          height={200}
        />
        <span>React-2025-Q3</span>
      </a>
      <ToHomepageButton className={'mt-[40px] relative top-5'} />
    </div>
  );
}
