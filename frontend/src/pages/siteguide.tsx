import { default as NextLink } from 'next/link';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Link } from '@sk-web-gui/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@components/button/button.component';
import ContentBlock from '@components/block/content-block.component';
import Buttons from '@layouts/button-groups/buttons';
import { getLayout } from '@services/layout-service';
import { LayoutProps } from '@interfaces/admin-data';
import Wysiwyg from '@components/wysiwyg/wysiwyg';

export async function getServerSideProps({ res }) {
  return await await getLayout(res);
}

export const Siteguide: React.FC = ({ layoutData }: LayoutProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Siteguide`} layoutData={layoutData}>
      <ContentBlock classNameWrapper="desktop:mt-lg">
        <Wysiwyg>
          <h1>Siteguide</h1>
          <p className="ingress">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
          <h2>
            WIP: Sidor <span className="text-gray text-base">(unordered list)</span>
          </h2>
          <ul>
            <li>
              <NextLink href={'/'}>
                <Link as="div">Startsida</Link>
              </NextLink>
            </li>
            <li>
              <NextLink href={'/utbildningar'}>
                <Link as="div">Utbildningar - Sugen på att börja studera?</Link>
              </NextLink>
            </li>
            <li>
              <NextLink href={'/utbildningar/utbildning'}>
                <Link as="div">Utbildning - Yrkesförare buss</Link>
              </NextLink>
            </li>
            <li>
              <NextLink href={'/utbildningar/sok'}>
                <Link as="div">Söksida - Sugen på att börja studera?</Link>
              </NextLink>
            </li>
            <li>
              <NextLink href={'/utbildningar/sok/jamfor'}>
                <Link as="div">Jämför - Jämför utbildningar</Link>
              </NextLink>
            </li>
            <li>
              <NextLink href={'/utbildningar/behorighet'}>
                <Link as="div">Behörigheter - Behörighet, betyg och meritvärden</Link>
              </NextLink>
            </li>
          </ul>
          <h2>Ordered list</h2>
          <p className="text">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
          <ol>
            <li>
              <p>Item</p>
            </li>
            <li>
              <p>Item</p>
            </li>
            <li>
              <p>Item</p>
            </li>
          </ol>
          <h2>Knappar</h2>
          <p>Olika typer av knappar</p>
          <p>
            <Button className="override" rightIcon={<ArrowForwardIcon />}>
              <span>Lorem ipsum dolor sit</span>
            </Button>
            <Button className="override mt-sm" disabled rightIcon={<ArrowForwardIcon />}>
              <span>Lorem ipsum dolor sit</span>
            </Button>
          </p>
          <p className="text blocked-blue my-2xl flex gap-sm">
            <Buttons>
              <Button className="override btn-white" rightIcon={<ArrowForwardIcon />}>
                <span>Lorem ipsum dolor sit</span>
              </Button>
              <Button className="override btn-white" disabled rightIcon={<ArrowForwardIcon />}>
                <span>Lorem ipsum dolor sit</span>
              </Button>
            </Buttons>
          </p>
          <p>
            <Button className="override" rightIcon={<ArrowForwardIcon />}>
              <span>Lorem ipsum dolor sit</span>
            </Button>
            <Button className="override mt-sm" disabled rightIcon={<ArrowForwardIcon />}>
              <span>Lorem ipsum dolor sit</span>
            </Button>
          </p>
        </Wysiwyg>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Siteguide;
