import { EmployerPromotionsBlockPromotions } from '@interfaces/admin-data';
import { Course } from '@interfaces/education';

export const appURL = (path = ''): string => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return `${baseURL}${basePath}${path}`;
};

export type DynamicSlugTypes = {
  '/utbildningar/[utbildning]': Course;
  '/utbildningar/efterfragade/[efterfragad]': EmployerPromotionsBlockPromotions;
};

// Create a union type of all possible pairs
type DynamicSlugUnion = {
  [K in keyof DynamicSlugTypes]: { slug: K; data: DynamicSlugTypes[K] };
}[keyof DynamicSlugTypes];

export const routeDynamicSlugFormat = (params: DynamicSlugUnion): string => {
  const { slug, data } = params;

  switch (slug) {
    case '/utbildningar/[utbildning]':
      return data.id && data.name ? `${data.id}-${encodeURIComponent(data.name)}` : '';

    case '/utbildningar/efterfragade/[efterfragad]':
      return encodeURIComponent(data.title);

    default:
      return '';
  }
};

// Define return types for the function based on the slug
type RouteDynamicSlugExtractReturnType<T extends keyof DynamicSlugTypes> =
  T extends '/utbildningar/[utbildning]' ? { id: string; title: string }
  : T extends '/utbildningar/efterfragade/[efterfragad]' ? { title: string }
  : never;

// New function to extract id and title from a formatted slug
export const routeDynamicSlugFormatExtract = <T extends keyof DynamicSlugTypes>(params: {
  slug: T;
  formattedString: string;
}): RouteDynamicSlugExtractReturnType<T> => {
  const { slug, formattedString } = params;

  switch (slug) {
    case '/utbildningar/[utbildning]': {
      const [idString, ...titleParts] = formattedString.split('-');
      const id = idString;
      const title = decodeURIComponent(titleParts.join('-'));

      return { id, title } as RouteDynamicSlugExtractReturnType<T>;
    }
    case '/utbildningar/efterfragade/[efterfragad]': {
      return { title: decodeURIComponent(formattedString) } as RouteDynamicSlugExtractReturnType<T>;
    }
    default:
      throw new Error('Unsupported slug type');
  }
};
