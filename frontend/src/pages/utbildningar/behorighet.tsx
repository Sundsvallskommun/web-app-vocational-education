import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Breadcrumb } from '@sk-web-gui/react';
import Image from 'next/image';
import DropCard from '@components/card/drop-card.component';
import SchoolIcon from '@mui/icons-material/School';
import dayjs from 'dayjs';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentBlock from '@components/block/content-block.component';
import Search from '@components/search/search.component';
import Button from '@components/button/button.component';
import NextLink from 'next/link';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import { getPage } from '@services/page-service';
import _ from 'lodash';
import { PageProps } from '@interfaces/admin-data';
import { getLayout } from '@services/layout-service';

export async function getServerSideProps({ res }) {
  const layoutProps = await getLayout(res);
  const pageProps = await getPage('/utbildningar/behorighet', res);
  return await _.merge(layoutProps, pageProps);
}

export const Behorighet: React.FC = ({ layoutData, pageData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Behorighet`} layoutData={layoutData}>
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

        <div className="mt-lg">
          <h2>Om utbildningen</h2>
          <p className="text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <h2>Grundläggande behörighet</h2>
          <p className="text hidden medium-device:block">
            Du är behörig att antas till en yrkeshögskoleutbildning om du uppfyller något av följande:
          </p>
          <ol className="drops">
            <li>Har en gymnasieexamen från gymnasieskolan eller kommunal vuxenutbildning.</li>
            <li>Har en svensk eller utländsk utbildning som motsvarar kraven i punkt 1 ovan.</li>
            <li>Är bosatt i Danmark, Finland, Island eller Norge och där är behörig till motsvarande utbildning.</li>
            <li>
              Genom svensk eller utländsk utbildning, praktisk erfarenhet eller på grund av någon annan omständighet har
              förutsättningar att tillgodogöra dig utbildningen.Utöver detta kräver vissa utbildningar särskilda
              förkunskaper och/eller villkor. Se nedan vad som gäller för just denna utbildning.
            </li>
          </ol>
          <h2>Utbildningens innehåll</h2>
          <p className="text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <ul className="drops">
            <li>Köra buss</li>
            <li>Teoretiskt prov</li>
            <li>Öppna och stänga dörrarna </li>
            <li>Slutprov</li>
          </ul>
          <p className="text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <h3>Utbildningens innehåll underrubrik h3</h3>
          <p className="text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <p className="text blocked-blue my-2xl">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
          </p>
          <p className="text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <Image
            className="my-2xl"
            width={900}
            height={600}
            unoptimized
            src={'https://placehold.co/900x600'}
            alt={''}
          />
          <p className="text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <Button className="override !mt-2xl" rightIcon={<ArrowForwardIcon />}>
            <span>Lorem ipsum dolor sit</span>
          </Button>
        </div>
      </ContentBlock>
      <ContentBlock classNameWrapper="bg-blue-light" padded>
        <h2>Relaterade utbildningar</h2>
        <div className="mt-2xl flex flex-col medium-device:grid medium-device:grid-cols-2 desktop:grid-cols-3 gap-lg gap-y-2xl">
          <DropCard
            classNameCard="max-h-[270px]"
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
            classNameCard="max-h-[270px]"
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
            classNameCard="max-h-[270px]"
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
};

export default Behorighet;
