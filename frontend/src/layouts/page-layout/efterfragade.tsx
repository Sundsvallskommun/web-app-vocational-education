import ContentBlock from '@components/block/content-block.component';
import Button from '@components/button/button.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import Wysiwyg from '@components/wysiwyg/wysiwyg';
import { EmployerPromotionsBlock, EmployerPromotionsBlockPromotions, LayoutProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Breadcrumb } from '@sk-web-gui/react';
import { routeDynamicSlugFormatExtract } from '@utils/app-url';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface EfterfragadeProps extends LayoutProps {
  employerPromotionsBlock: EmployerPromotionsBlock | null;
}

export const Efterfragade: React.FC<EfterfragadeProps> = ({ layoutData, employerPromotionsBlock }) => {
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
                <NextLink href="/utbildningar/efterfragade" passHref legacyBehavior>
                  <Breadcrumb.Link currentPage href="/utbildningar/efterfragade">
                    {educationData.title}
                  </Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <h1>{educationData.title}</h1>
          <p className="ingress">{educationData.ingress}</p>
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
