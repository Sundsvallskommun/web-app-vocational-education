import SanitizeHTML from 'sanitize-html';

const config = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'blockquote',
    'p',
    'a',
    'ul',
    'ol',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'strike',
    'del',
    'br',
    'div',
    'sup',
    'sub',
    'span',
    'iframe',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src', 'width', 'height', 'alt', 'loading', 'style', 'class', 'data-*', 'decoding', 'title'],
    iframe: [
      'src',
      // 'width', // @tiptap youtube extension configure sets default width, uncomment to enable that
      // 'height', // @tiptap youtube extension configure sets default height, uncomment to enable that
      'allowfullscreen',
      'autoplay',
      'ccLanguage',
      'ccLoadPolicy',
      'disableKBcontrols',
      'enableIFrameApi',
      'endTime',
      'interfaceLanguage',
      'ivLoadPolicy',
      'loop',
      'modestBranding',
      'origin',
      'playlist',
      'progressBarColor',
    ],
  },
  // Lots of these won't come up by default because we don't allow them
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  // URL schemes we permit
  allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {},
};

const sanitized: (unsafe: string) => string = (unsafe) => {
  return SanitizeHTML(unsafe, config);
};

export default sanitized;
