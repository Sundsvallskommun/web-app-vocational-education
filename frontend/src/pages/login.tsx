import ContentBlock from '@components/block/content-block.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import LoginFormLogic from '@components/login-form/login-form-logic.component';
import LoginForm from '@components/login-form/login-form.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { getLayout } from '@services/layout-service';
import { Breadcrumb } from '@sk-web-gui/react';
import NextLink from 'next/link';

export async function getServerSideProps({ res }) {
  const layoutProps = await getLayout(res);
  return layoutProps;
}

export const Login: React.FC = ({ layoutData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Login`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          imageSrc="/drop-person-holding-thing.png"
          imageAlt="Två studenter skrattar"
          imageDivClassName="hidden desktop:block"
          breadcrumbs={
            <Breadcrumb className="" separator={<span className="mx-1">|</span>}>
              <Breadcrumb.Item>
                <NextLink href="/" passHref legacyBehavior>
                  <Breadcrumb.Link>Start</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/login" passHref legacyBehavior>
                  <Breadcrumb.Link currentPage>Logga in</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <h1>Dags att logga in</h1>
          <p className="ingress">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Exercitation veniam consequat sunt nostrud
            amet.
          </p>
          <div className="max-w-[51rem]">
            <LoginFormLogic>
              <LoginForm />
            </LoginFormLogic>
          </div>
        </BigDropHeader>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Login;
