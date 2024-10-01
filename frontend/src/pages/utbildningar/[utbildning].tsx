import ContentBlock from '@components/block/content-block.component';
import Button from '@components/button/button.component';
import Drop from '@components/drop/drop.component';
import EducationsRelatedBlock from '@components/educations-related-block/educations-related-block';
import FAQBlock from '@components/faq-block/faq-block';
import Search from '@components/search/search.component';
import { PageProps } from '@interfaces/admin-data';
import { Course } from '@interfaces/education';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolIcon from '@mui/icons-material/School';
import {
  getEducationEvent,
  getEducationLengthString,
  getSanitizedInformation,
} from '@services/education-service/education-service';
import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import { Breadcrumb } from '@sk-web-gui/react';
import { getFormattedLabelFromValue } from '@utils/labels';
import NextLink from 'next/link';

export async function getServerSideProps(context) {
  const layout = await getLayout(context.res);
  const educationEventRes = await getEducationEvent(context.query.utbildning);
  const pageProps = await getPage('/utbildningar/[utbildning]', context.res);
  return {
    props: {
      layoutData: layout.props,
      educationData: !educationEventRes.error ? educationEventRes.data : null,
      pageData: pageProps.props?.pageData,
    },
  };
}

export const Utbildning: React.FC = ({
  layoutData,
  educationData,
  pageData,
}: PageProps & { educationData: Course }) => {
  if (!educationData) return <></>;
  return (
    <DefaultLayout title={`Yrkesutbildning - ${educationData.name}`} layoutData={layoutData}>
      <ContentBlock>
        <div className="desktop:flex">
          <div className="flex-grow flex flex-col desktop:mt-lg desktop:pr-xl">
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
              <div className="flex justify-between medium-device:justify-start items-center">
                <h1 className="m-0">{educationData.name}</h1>
                <Drop
                  className="p-sm medium-device:p-md medium-device:ml-lg"
                  dropIcon={<SchoolIcon className="!text-2xl" />}
                />
              </div>
              <p className="ingress mt-0">
                {educationData.level ? getFormattedLabelFromValue(educationData.level) : '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="text-sm mt-lg grid grid-cols-2 desktop:flex gap-xl">
          <div>
            <label id="education-length">Utbildningens längd</label>
            <div aria-describedby="education-length">
              <strong>
                {educationData?.start && educationData?.end ?
                  getEducationLengthString(educationData?.start, educationData?.end)
                : '-'}
              </strong>
            </div>
          </div>
          <div>
            <label id="education-studyLocation">Plats</label>
            <div aria-describedby="education-studyLocation">
              <strong>{educationData?.studyLocation?.split(',')}</strong>
            </div>
          </div>
          <div>
            <label id="education-pace">Studietakt</label>
            <div aria-describedby="education-pace">
              <strong>{educationData?.scope ? educationData?.scope + '%' : '-'}</strong>
            </div>
          </div>
          <div>
            <label id="education-distance">Distans</label>
            <div aria-describedby="education-distance">
              <strong>?</strong>
            </div>
          </div>
          <div>
            <label id="education-language">Språk</label>
            <div aria-describedby="education-language">
              <strong>?</strong>
            </div>
          </div>
        </div>
      </ContentBlock>
      <ContentBlock classNameWrapper="!mt-2xl bg-blue-light py-lg">
        <div className="flex flex-col gap-lg desktop:flex-row justify-between items-center">
          <div className="text-sm grid grid-cols-2 gap-lg desktop:flex desktop:gap-[75px]">
            <div>
              <label id="education-startdate">Nästa utbildningsstart</label>
              <div aria-describedby="education-startdate">
                <strong>{educationData?.start ?? '-'}</strong>
              </div>
            </div>
            <div>
              <label id="education-latestapplyday">Sista ansökningsdag</label>
              <div aria-describedby="education-latestapplyday">
                <strong>{educationData?.latestApplication ?? '-'}</strong>
              </div>
            </div>
          </div>
          <a href={educationData.url} target="_blank">
            <Button as="span" className="override" rightIcon={<ArrowForwardIcon />}>
              <span>Till utbildningens hemsida</span>
            </Button>
          </a>
        </div>
      </ContentBlock>
      <ContentBlock classNameWrapper="!mt-[8rem]">
        <h2>Om utbildningen</h2>
        <p dangerouslySetInnerHTML={{ __html: getSanitizedInformation(educationData.information) }} />
      </ContentBlock>

      <ContentBlock classNameWrapper="!mt-60">
        <h2>Kontaktuppgifter</h2>
        <p>Sundsvalls kommun (Komunal)Lasarettsvägen 19, 851 85 Sundsvall</p>
        <a className="inline-block mt-30" href={educationData.url} target="_blank">
          <Button as="span" className="override w-fit" rightIcon={<ArrowForwardIcon />}>
            <span>Till utbildningens hemsida</span>
          </Button>
        </a>
      </ContentBlock>

      <ContentBlock classNameWrapper="!mt-60">
        <h2>Söker du kontakt med utbildningsanordnare?</h2>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
          officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <NextLink className="inline-block mt-30" href={'/arbetsgivare/kontaktautbildningsanordnare'}>
          <Button as="span" className="override w-fit" rightIcon={<ArrowForwardIcon />}>
            <span>Till utbildningsanordnare</span>
          </Button>
        </NextLink>
      </ContentBlock>

      <FAQBlock classNameWrapper="pt-80" faqBlock={pageData.faqBlock?.pop()} />

      <EducationsRelatedBlock
        educations={Array.from({ length: 3 }, (_, i) => ({
          title: `${educationData.name}-related-${i}`,
          text: 'Amet minimimi mollot non deseret ullamco est sit alique dolor do sint. Velit officia consequat duis enim.',
          courseCode: `${educationData.id}`,
          date: new Date(),
          studyLocation: `Location-${i}`,
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

export default Utbildning;
