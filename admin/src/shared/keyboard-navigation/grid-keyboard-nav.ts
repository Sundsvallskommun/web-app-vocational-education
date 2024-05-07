import React from 'react';

export interface KeyboardGridNavOptions {
  rows: number;
  columns: number;
  onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

const findNext = (element: HTMLElement, searchString: string, start?: boolean) => {
  const next = element.nextSibling as HTMLElement;
  if (next && next?.innerText.toLowerCase().indexOf(searchString) === 0) {
    next.focus();
  } else if (next) {
    findNext(next, searchString);
  } else {
    const first = element.parentElement?.firstChild as HTMLElement;
    if (first && first?.innerText.toLowerCase().indexOf(searchString) === 0) {
      first.focus();
    } else if (first) {
      findNext(first, searchString);
    }
  }
};

export const gridKeyboardNav = (
  event: React.KeyboardEvent<HTMLElement>,
  index: number,
  options: KeyboardGridNavOptions
) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    const next = event.currentTarget.nextSibling as HTMLElement;
    if (next) {
      next.focus();
    } else {
      const first = event.currentTarget.parentElement?.firstChild as HTMLElement;
      if (first) {
        first.focus();
      }
    }
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    const previous = event.currentTarget.previousSibling as HTMLElement;
    if (previous) {
      previous.focus();
    } else {
      const last = event.currentTarget.parentElement?.lastChild as HTMLElement;
      if (last) {
        last.focus();
      }
    }
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    const nextLine = event.currentTarget.parentElement?.children[index + options.columns] as HTMLElement;
    if (nextLine) {
      nextLine.focus();
    } else {
      const children = event.currentTarget.parentElement?.children;
      if (!children) return;
      const totalRows = options.rows ? options.rows : children.length / options.columns;
      const minRows = Math.floor(totalRows - 1) * options.columns;
      const maxRows = Math.ceil(totalRows - 1) * options.columns;

      let newIndex = index - maxRows >= 0 ? index - maxRows : index - minRows;

      const firstRow = children[newIndex] as HTMLElement;
      if (firstRow) {
        firstRow.focus();
      }
    }
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    const nextLine = event.currentTarget.parentElement?.children[index - options.columns] as HTMLElement;
    if (nextLine) {
      nextLine.focus();
    } else {
      const children = event.currentTarget.parentElement?.children;
      if (!children) return;
      const totalRows = options.rows ? options.rows : children.length / options.columns;
      const minRows = Math.floor(totalRows - 1) * options.columns;
      const maxRows = Math.ceil(totalRows - 1) * options.columns;

      let newIndex = index + maxRows <= children.length - 1 ? index + maxRows : index + minRows;

      const firstRow = children[newIndex] as HTMLElement;
      if (firstRow) {
        firstRow.focus();
      }
    }
  }
  if (event.key === 'Home') {
    event.preventDefault();
    const first = event.currentTarget.parentElement?.firstChild as HTMLElement;
    if (first) {
      first.focus();
    }
  }
  if (event.key === 'End') {
    event.preventDefault();
    const last = event.currentTarget.parentElement?.lastChild as HTMLElement;
    if (last) {
      last.focus();
    }
  }
  if (event.key === 'Enter' || event.key === ' ') {
    console.log('event', event);
    event.target?.dispatchEvent(new MouseEvent('click'));
    options.onEnter && options.onEnter(event);
  }

  const keyRegex = new RegExp(/^[A-Ö]{1}$/i);
  if (keyRegex.test(event.key)) {
    const element = event.currentTarget as HTMLElement;
    findNext(element, event.key.toLowerCase(), true);
  }
};
