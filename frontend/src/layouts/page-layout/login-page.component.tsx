'use client';

import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import LoginFormLogic from '@components/login-form/login-form-logic.component';
import LoginForm from '@components/login-form/login-form.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { cx } from '@sk-web-gui/react';

export const Login = ({ layoutData, pageData }: PageProps) => {
  return (
    <DefaultLayout layoutData={layoutData}>
      <ContentBlock classNameWrapper="HeaderBlock">
        <BigDropHeader
          imageSrc={pageData?.imgSrc}
          imageAlt={pageData?.imgAlt}
          imageDivClassName={cx(
            pageData?.showImgInMobile ? 'block' : 'hidden',
            pageData?.showImgInDesktop ? 'desktop:block' : 'desktop:hidden'
          )}
          breadcrumbs={<Breadcrumbs lastItemTitle="Logga in" />}
        >
          <h1>{pageData?.title}</h1>
          {pageData?.description ?
            <p className="ingress">{pageData?.description}</p>
          : <></>}
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
