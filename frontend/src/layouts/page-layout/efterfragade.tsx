import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import Button from '@components/button/button.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import Wysiwyg from '@components/wysiwyg/wysiwyg';
import { EmployerPromotionsBlock, EmployerPromotionsBlockPromotions, PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Breadcrumb, cx } from '@sk-web-gui/react';
import { routeDynamicSlugFormatExtract } from '@utils/app-url';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface EfterfragadeProps extends PageProps {
  employerPromotionsBlock: EmployerPromotionsBlock | null;
}

export const Efterfragade: React.FC<EfterfragadeProps> = ({ layoutData, employerPromotionsBlock, pageData }) => {
  const router = useRouter();
  const [educationData, setEducationData] = useState<EmployerPromotionsBlockPromotions>();

  useEffect(() => {
    const loadEducation = async () => {
      const educationTitle = routeDynamicSlugFormatExtract({
        slug: '/utbildningar/efterfragade/[efterfragad]',
        formattedString: router.query['efterfragad'] as string,
      }).title;
      const data = employerPromotionsBlock?.employerPromotions.find((x) => x.title === educationTitle);
      setEducationData(data);
    };

    if (router.isReady) {
      loadEducation();
    }

    router.events.on('routeChangeComplete', loadEducation);
    return () => {
      router.events.off('routeChangeComplete', loadEducation);
    };
  }, [router.query, router.isReady, router.events, employerPromotionsBlock]);

  if (!educationData) return <></>;

  return (
    <DefaultLayout
      title={`Yrkesutbildning - Efterfrågade av arbetsgivare - ${educationData.title}`}
      layoutData={layoutData}
    >
      <ContentBlock>
        <BigDropHeader
          imageSrc={pageData?.imgSrc}
          imageAlt={pageData?.imgAlt}
          imageDivClassName={cx(
            pageData?.showImgInMobile ? 'block' : 'hidden',
            pageData?.showImgInDesktop ? 'desktop:block' : 'desktop:hidden'
          )}
          breadcrumbs={<Breadcrumbs />}
        >
          <h1>{educationData.title}</h1>
          {educationData.ingress ?
            <p className="ingress">{educationData.ingress}</p>
          : <></>}
        </BigDropHeader>

        <div className="mt-lg">
          <Wysiwyg content={educationData.wysiwyg_content} />

          <NextLink href={`/utbildningar/sok?q=${educationData.searchPhrase}`}>
            <Button as="span" className="override !mt-2xl w-fit" rightIcon={<ArrowForwardIcon />}>
              <span>Vidare till utbildningen</span>
            </Button>
          </NextLink>
        </div>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Efterfragade;
