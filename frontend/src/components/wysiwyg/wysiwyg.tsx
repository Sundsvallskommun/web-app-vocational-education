import { replaceWithComponent } from '@components/wysiwyg/utils';
import sanitized from '@services/sanitizer-service';
import parse from 'html-react-parser';
import React from 'react';
import NextLink from 'next/link';
import Button from '@components/button/button.component';
import { Link, useThemeQueries } from '@sk-web-gui/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
interface WysiwygProps {
  content?: string;
  children?: React.ReactNode | React.ReactNode[];
}

interface FactBlockProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const FactBlock = (props: FactBlockProps) => {
  return <div data-type="factblock">{props.children}</div>;
};

interface SiteNavigationButtonProps {
  href?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const SiteNavigationButton = (props: SiteNavigationButtonProps) => {
  const { isMinDesktop } = useThemeQueries();

  return (
    <NextLink href={props.href ?? ''} data-type="sitenavigationbutton" className="inline-flex">
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

function isExternalLink(url: string): boolean {
  // If it's a relative path, it's always internal
  if (!/^https?:\/\//.test(url)) {
    return false;
  }

  const currentUrl = new URL(window.location.href);
  const linkUrl = new URL(url, currentUrl.origin); // Ensures relative URLs are treated properly

  // Compare both the hostname and the protocol (http/https)
  return linkUrl.hostname !== currentUrl.hostname || linkUrl.protocol !== currentUrl.protocol;
}

interface SpanLinkProps {
  href?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const SpanLink = (props: SpanLinkProps) => {
  const isExternal = isExternalLink(props.href ?? '');
  if (isExternal) {
    return (
      <Link href={props.href} external={true}>
        {props.children}
      </Link>
    );
  }
  return (
    <NextLink href={props.href ?? ''}>
      <Link as="span" external={false}>
        {props.children}
      </Link>
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
            { tagName: 'a', Comp: SpanLink },
          ]),
        }
      )}
    </div>
  );
}
