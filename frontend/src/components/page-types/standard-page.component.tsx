import ContentBlock from '@components/block/content-block.component';
import DropCard from '@components/card/drop-card.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import Search from '@components/search/search.component';
import Wysiwyg from '@components/wysiwyg/wysiwyg';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { Breadcrumb } from '@sk-web-gui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';

export default function StandardPage({ layoutData, pageData }: PageProps) {
  return (
    <DefaultLayout title={`Yrkesutbildning - ${pageData.title}`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          imageSrc={`/YM_puff1.jpg`}
          imageAlt="Två studenter skrattar"
          breadcrumbs={
            <Breadcrumb className="" separator={<span className="mx-1">|</span>}>
              <Breadcrumb.Item>
                <NextLink href="/" passHref legacyBehavior>
                  <Breadcrumb.Link href="/">Start</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/utbildningar" passHref legacyBehavior>
                  <Breadcrumb.Link href="/utbildningar">Utbildningar</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/utbildningar/behorighet" passHref legacyBehavior>
                  <Breadcrumb.Link currentPage href="/utbildningar/behorighet">
                    Behörighet, betyg och meritvärden
                  </Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <h1>{pageData.title}</h1>
          <p className="ingress">{pageData.description}</p>
        </BigDropHeader>
      </ContentBlock>

      <ContentBlock classNameWrapper="mt-lg">
        <Wysiwyg content={pageData.wysiwyg_content} />
      </ContentBlock>

      <ContentBlock classNameWrapper="bg-blue-light" padded>
        <h2>Relaterade utbildningar</h2>
        <div className="mt-2xl flex flex-col medium-device:grid medium-device:grid-cols-2 desktop:grid-cols-3 gap-lg gap-y-2xl">
          <DropCard
            classNameCard="h-[232px] desktop:h-[270px]"
            href="/"
            dropIcon={<SchoolIcon className="material-icon !text-2xl" />}
            footer={
              <>
                <div className="flex items-center">
                  <DateRangeIcon className="!text-2xl mr-sm" /> <span>{dayjs('2021-05-20').format('DD MMM YYYY')}</span>
                </div>
                <div className="flex items-center">
                  <LocationOnIcon className="!text-2xl mr-sm" /> <span>Sundsvall</span>
                </div>
              </>
            }
          >
            <h3>Yrkesförare Buss</h3>
            <p className="text">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
          </DropCard>
          <DropCard
            classNameCard="h-[232px] desktop:h-[270px]"
            href="/"
            dropIcon={<SchoolIcon className="material-icon !text-2xl" />}
            footer={
              <>
                <div className="flex items-center">
                  <DateRangeIcon className="!text-2xl mr-sm" /> <span>{dayjs('2021-05-20').format('DD MMM YYYY')}</span>
                </div>
                <div className="flex items-center">
                  <LocationOnIcon className="!text-2xl mr-sm" /> <span>Sundsvall</span>
                </div>
              </>
            }
          >
            <h3>Yrkesförare Buss</h3>
            <p className="text">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
          </DropCard>
          <DropCard
            classNameCard="h-[232px] desktop:h-[270px]"
            href="/"
            dropIcon={<SchoolIcon className="material-icon !text-2xl" />}
            footer={
              <>
                <div className="flex items-center">
                  <DateRangeIcon className="!text-2xl mr-sm" /> <span>{dayjs('2021-05-20').format('DD MMM YYYY')}</span>
                </div>
                <div className="flex items-center">
                  <LocationOnIcon className="!text-2xl mr-sm" /> <span>Sundsvall</span>
                </div>
              </>
            }
          >
            <h3>Yrkesförare Buss</h3>
            <p className="text">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
          </DropCard>
        </div>
      </ContentBlock>
      <ContentBlock>
        <div className="flex w-full justify-center">
          <div className="flex flex-col max-w-[720px]">
            <h2 className="text-center">Sugen på att börja studera?</h2>
            <p className="text mt-md">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt
              nostrud amet.
            </p>
            <Search className="mt-lg" />
          </div>
        </div>
      </ContentBlock>
    </DefaultLayout>
  );
}
