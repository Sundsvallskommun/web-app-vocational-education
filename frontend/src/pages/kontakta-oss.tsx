import ContentBlock from '@components/block/content-block.component';
import ContactFormLogic from '@components/contact-form/contact-form-logic.component';
import ContactFormWrapper from '@components/contact-form/contact-form-wrapper.component';
import ContactForm from '@components/contact-form/contact-form.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import Wysiwyg from '@components/wysiwyg/wysiwyg';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Breadcrumb } from '@sk-web-gui/react';
import NextLink from 'next/link';

export const KontaktaOss: React.FC = ({ layoutData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Kontakta oss`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          breadcrumbs={
            <Breadcrumb className="" separator={<span className="mx-1">|</span>}>
              <Breadcrumb.Item>
                <NextLink href="/" passHref legacyBehavior>
                  <Breadcrumb.Link href="/">Start</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/kontakta-oss" passHref legacyBehavior>
                  <Breadcrumb.Link currentPage href="/kontakta-oss">
                    Kontakta oss
                  </Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <h1>Kontakta oss / Det här är vi</h1>
        </BigDropHeader>
      </ContentBlock>

      <ContentBlock>
        <Wysiwyg>
          <h2>Lorem ipsum</h2>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Dest sit aliqua dolor do amet sint. Velit
            officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
        </Wysiwyg>
      </ContentBlock>
      <ContentBlock classNameWrapper="mt-[5.15rem]">
        <ContactFormWrapper>
          <ContactFormLogic>
            <ContactForm />
          </ContactFormLogic>
        </ContactFormWrapper>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default KontaktaOss;
