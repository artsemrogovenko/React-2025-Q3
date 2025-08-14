import '../../../index.css';
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import student from '/public/rs-school.d8af85c6.webp';
import { ToHomepageButton } from '../../../components/ToHomepageButton.tsx';
import Image from 'next/image';
import { SIZE_IMG } from '../../../constants.ts';
import Link from 'next/link';

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('AboutPage');
  return (
    <div
      className={`flex flex-col size-min-[300px] gap-y-[20px] items-center content-center font-bold  h-[80vh]`}
      data-testid="about-page"
    >
      <div>
        <h1 className="text-xl capitalize">{t('title')}</h1>
        <span className="text-2xl capitalize">{t('author')}</span>
      </div>
      <Link
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
          width={SIZE_IMG}
          height={SIZE_IMG}
        />
        <span>React-2025-Q3</span>
      </Link>
      <ToHomepageButton className={'mt-[40px] relative top-5'} />
    </div>
  );
}
