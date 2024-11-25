import { replaceWithComponent } from '@components/wysiwyg/utils';
import sanitized from '@services/sanitizer-service';
import parse from 'html-react-parser';
import React from 'react';
import NextLink from 'next/link';
import Button from '@components/button/button.component';
import { useThemeQueries } from '@sk-web-gui/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
interface WysiwygProps {
  content?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const FactBlock = (props) => {
  return <div data-type="factblock">{props.children}</div>;
};

export const SiteNavigationButton = (props) => {
  const { isMinDesktop } = useThemeQueries();

  return (
    <NextLink href={props.href} data-type="sitenavigationbutton" className="inline-flex">
      <Button
        as="span"
        dense={!isMinDesktop}
        className="override !text-sm small-device-min:!text-base"
        rightIcon={<ArrowForwardIcon />}
      >
        <span>{props.children}</span>
      </Button>
    </NextLink>
  );
};

export default function Wysiwyg({ content, children }: WysiwygProps) {
  if (children) {
    return <div className="wysiwyg-content">{children}</div>;
  }

  return (
    <div className="wysiwyg-content">
      {parse(
        sanitized(content || '', {
          allowedTags: ['factblock', 'sitenavigationbutton'],
          allowedAttributes: { sitenavigationbutton: ['href'], '*': ['data-type'] },
        }),
        {
          replace: replaceWithComponent([
            { tagName: 'factblock', Comp: FactBlock },
            { tagName: 'sitenavigationbutton', Comp: SiteNavigationButton },
          ]),
        }
      )}
    </div>
  );
}
