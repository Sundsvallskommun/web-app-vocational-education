import ContentBlock from '@components/block/content-block.component';
import Button from '@components/button/button.component';
import Drop from '@components/drop/drop.component';
import EducationsRelatedBlock from '@components/educations-related-block/educations-related-block';
import FAQBlock from '@components/faq-block/faq-block';
import SearchBlock from '@components/search-block/search-block.component';
import { PageProps } from '@interfaces/admin-data';
import { Course } from '@interfaces/education';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SchoolIcon from '@mui/icons-material/School';
import { getEducationLengthString, getSanitizedInformation } from '@services/education-service/education-service';
import { Breadcrumb, useThemeQueries } from '@sk-web-gui/react';
import { fallbackDataValue, getFormattedLabelFromValue } from '@utils/labels';
import { getBlockData } from '@utils/page-types';
import NextLink from 'next/link';

export const Utbildning = ({
  layoutData,
  educationData,
  relatedEducationData,
  pageData,
}: PageProps & { educationData: Course; relatedEducationData: Course[] | null }) => {
  const { isMinDesktop } = useThemeQueries();
  if (!educationData) return <></>;
  const sanitizedInformation = educationData.information ? getSanitizedInformation(educationData.information) : null;
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
              <div className="flex justify-between medium-device-min:justify-start items-center">
                <h1 className="m-0">{educationData.name}</h1>
                <Drop
                  className="self-start p-sm medium-device-min:p-md medium-device-min:ml-lg medium-device-min:min-w-[6.8rem] medium-device-min:min-h-[6.8rem]"
                  dropIcon={<SchoolIcon className="!text-2xl" />}
                />
              </div>
              <p className="ingress mt-0">
                {educationData.level ? getFormattedLabelFromValue(educationData.level) : fallbackDataValue()}
              </p>
            </div>
          </div>
        </div>
        <div className="text-[1.3rem] small-device:text-sm mt-lg grid grid-cols-[40%,60%] gap-md desktop:gap-2xl desktop:flex">
          <div>
            <label id="education-length">Längd</label>
            <div aria-describedby="education-length">
              <strong>
                {educationData?.start && educationData?.end ?
                  getEducationLengthString(educationData?.start, educationData?.end)
                : fallbackDataValue()}
              </strong>
            </div>
          </div>
          <div>
            <label id="education-studyLocation">Plats</label>
            <div aria-describedby="education-studyLocation">
              <strong>
                {educationData?.studyLocation ? educationData?.studyLocation?.split(',') : fallbackDataValue()}
              </strong>
            </div>
          </div>
          <div>
            <label id="education-pace">Studietakt</label>
            <div aria-describedby="education-pace">
              <strong>{educationData?.scope ? educationData?.scope + '%' : fallbackDataValue()}</strong>
            </div>
          </div>
          <div>
            <label id="education-distance">Distans</label>
            <div aria-describedby="education-distance">
              <strong>{fallbackDataValue()}</strong>
            </div>
          </div>
          <div>
            <label id="education-language">Språk</label>
            <div aria-describedby="education-language">
              <strong>{fallbackDataValue()}</strong>
            </div>
          </div>
          <div>
            <label id="education-language">Utbildningsform</label>
            <div aria-describedby="education-form">
              <strong className="break-all">
                {educationData?.level ? `${getFormattedLabelFromValue(educationData?.level)}` : fallbackDataValue()}
              </strong>
            </div>
          </div>
        </div>
      </ContentBlock>
      <ContentBlock classNameWrapper="!mt-lg desktop:!mt-2xl bg-blue-light py-lg">
        <div className="flex flex-col gap-lg desktop:flex-row justify-between items-center">
          <div className="text-[1.3rem] small-device:text-sm grid grid-cols-2 gap-lg desktop:flex desktop:gap-[75px]">
            <div>
              <label id="education-startdate">Nästa utbildningsstart</label>
              <div aria-describedby="education-startdate">
                <strong>{educationData?.start ?? fallbackDataValue()}</strong>
              </div>
            </div>
            <div>
              <label id="education-latestapplyday">Sista ansökningsdag</label>
              <div aria-describedby="education-latestapplyday">
                <strong>{educationData?.latestApplication ?? fallbackDataValue()}</strong>
              </div>
            </div>
          </div>
          <a href={educationData.url ?? educationData.providerUrl} target="_blank">
            <Button
              as="span"
              dense={!isMinDesktop}
              className="override !text-sm small-device-min:!text-base"
              rightIcon={<OpenInNewIcon />}
            >
              <span>Till utbildningens hemsida</span>
            </Button>
          </a>
        </div>
      </ContentBlock>
      <ContentBlock classNameWrapper="!mt-lg desktop:!mt-[8rem]">
        <h2>Om utbildningen</h2>
        {sanitizedInformation ?
          <p dangerouslySetInnerHTML={{ __html: sanitizedInformation }} />
        : null}
      </ContentBlock>

      {educationData.provider ?
        <ContentBlock classNameWrapper="!mt-xl">
          <h2>Skola som anordnar utbildningen</h2>
          <p>{educationData.provider}</p>
        </ContentBlock>
      : <></>}

      <ContentBlock classNameWrapper="!mt-xl">
        <a className="inline-block mb-md" href={educationData.url ?? educationData.providerUrl} target="_blank">
          <Button
            as="span"
            dense={!isMinDesktop}
            className="override w-fit !text-sm small-device-min:!text-base"
            rightIcon={<OpenInNewIcon />}
          >
            <span>Till utbildningens hemsida</span>
          </Button>
        </a>
      </ContentBlock>

      <FAQBlock classNameWrapper="pt-80" faqBlock={getBlockData(pageData.faqBlock)} />

      {relatedEducationData ?
        <EducationsRelatedBlock show={pageData.showEducationsRelatedBlock} educations={relatedEducationData} />
      : <></>}

      <SearchBlock show={pageData.showSearchBlock} />
    </DefaultLayout>
  );
};

export default Utbildning;
