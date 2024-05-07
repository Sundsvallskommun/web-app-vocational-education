import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Breadcrumb } from '@sk-web-gui/react';
import SchoolIcon from '@mui/icons-material/School';
import dayjs from 'dayjs';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentBlock from '@components/block/content-block.component';
import Search from '@components/search/search.component';
import Drop from '@components/drop/drop.component';
import Button from '@components/button/button.component';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EducationsRelatedBlock from '@components/educations-related-block/educations-related-block';
import { getLayout } from '@services/layout-service';
import { LayoutProps } from '@interfaces/admin-data';

interface EducationData {
  title: string;
  courseCode: string;
}

export async function getServerSideProps({ res }) {
  return await getLayout(res);
}

export const Yrkesforare: React.FC = ({ layoutData }: LayoutProps) => {
  const router = useRouter();
  const [educationData, setEducationData] = useState<EducationData>();

  useEffect(() => {
    const loadEducation = async () => {
      const education: string = router.query['utbildning'] as string;
      const [courseCode, title] = education.split(/-(.*)/s);
      //search education based on ~courseCode(?), perhaps with serversideprops instead
      setEducationData({ courseCode: courseCode, title: title });
    };

    if (router.isReady) {
      loadEducation();
    }

    router.events.on('routeChangeComplete', loadEducation);
    return () => {
      router.events.off('routeChangeComplete', loadEducation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.isReady]);

  if (!educationData) return <></>;

  return (
    <DefaultLayout title={`Yrkesutbildning - Yrkesforare`} layoutData={layoutData}>
      <ContentBlock>
        <div className="lg:flex">
          <div className="flex-grow flex flex-col lg:mt-lg lg:pr-xl">
            <div>
              <Breadcrumb className="text-[13px]" separator={<span className="mx-1">|</span>}>
                <Breadcrumb.Item>
                  <NextLink href="/" passHref legacyBehavior>
                    <Breadcrumb.Link href="/">Start</Breadcrumb.Link>
                  </NextLink>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                  <NextLink href="/utbildningar" passHref legacyBehavior>
                    <Breadcrumb.Link href="/utbildningar">För dig som söker utbildning</Breadcrumb.Link>
                  </NextLink>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                  <NextLink href="/utbildningar/utbildning" passHref legacyBehavior>
                    <Breadcrumb.Link currentPage href="/utbildningar/utbildning">
                      Yrkesförare buss
                    </Breadcrumb.Link>
                  </NextLink>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="h-full flex-grow flex flex-col justify-center max-w-[720px]">
              <div className="flex justify-between md:justify-start items-center">
                <h1 className="m-0">{educationData.title}</h1>
                <Drop className="p-sm md:p-md md:ml-lg" dropIcon={<SchoolIcon className="!text-2xl" />} />
              </div>
              <p className="ingress mt-0">Yrkesakademin Vux</p>
            </div>
          </div>
        </div>
        <div className="text-sm mt-lg grid grid-cols-2 lg:flex gap-xl">
          <div>
            <label id="education-length">Utbildningens längd</label>
            <div aria-describedby="education-length">
              <strong>6 veckor</strong>
            </div>
          </div>
          <div>
            <label id="education-location">Plats</label>
            <div aria-describedby="education-location">
              <strong>Sundsvall</strong>
            </div>
          </div>
          <div>
            <label id="education-pace">Studietakt</label>
            <div aria-describedby="education-pace">
              <strong>100%</strong>
            </div>
          </div>
          <div>
            <label id="education-distance">Distans</label>
            <div aria-describedby="education-distance">
              <strong>Nej</strong>
            </div>
          </div>
          <div>
            <label id="education-language">Språk</label>
            <div aria-describedby="education-language">
              <strong>Svenska, Engelska</strong>
            </div>
          </div>
        </div>
      </ContentBlock>
      <ContentBlock classNameWrapper="!mt-2xl bg-blue-light py-lg">
        <div className="flex flex-col gap-lg lg:flex-row justify-between items-center">
          <div className="text-sm grid grid-cols-2 gap-lg lg:flex lg:gap-[75px]">
            <div>
              <label id="education-startdate">Nästa utbildningsstart</label>
              <div aria-describedby="education-startdate">
                <strong>{dayjs('2022-12-28').format('YYYY-MM-DD')}</strong>
              </div>
            </div>
            <div>
              <label id="education-latestapplyday">Sista ansökningsdag</label>
              <div aria-describedby="education-latestapplyday">
                <strong>{dayjs('2023-12-28').format('YYYY-MM-DD')}</strong>
              </div>
            </div>
          </div>
          <Button className="override" rightIcon={<ArrowForwardIcon />}>
            <span>Till utbildningens hemsida</span>
          </Button>
        </div>
      </ContentBlock>
      <ContentBlock classNameWrapper="!mt-2xl">
        <div>
          <h2>Om utbildningen</h2>
          <p className="text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <h2>Grundläggande behörighet</h2>
          <p className="text hidden md:block">
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
          <Button className="override !mt-2xl" rightIcon={<ArrowForwardIcon />}>
            <span>Till utbildningens hemsida</span>
          </Button>
        </div>
      </ContentBlock>

      <EducationsRelatedBlock
        educations={Array.from({ length: 3 }, (_, i) => ({
          title: `${educationData.title}-related-${i}`,
          text: 'Amet minimimi mollot non deseret ullamco est sit alique dolor do sint. Velit officia consequat duis enim.',
          courseCode: `${educationData.courseCode}-${educationData.title}-${i}`,
          date: new Date(),
          location: `Location-${i}`,
        }))}
      />

      <ContentBlock>
        <div className="flex w-full justify-center">
          <div className="flex flex-col max-w-[720px]">
            <h2 className="text-center">Sugen på att börja studera?</h2>
            <p className="text">
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

export default Yrkesforare;
