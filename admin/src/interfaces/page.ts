export type NestedPage = {
  id?: string;
  url?: string;
  children?: { [key: string]: NestedPage };
};
