import React from 'react';
import { DOMNode } from 'html-react-parser';

// List of self-closing tags in HTML
const selfClosingTags = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

function convertNodeToJSX(node: DOMNode, index: number = 0): React.ReactNode {
  // If the node is a text node, return its content
  if (node.type === 'text') {
    return node.data;
  }

  // If the node is an element node, reconstruct its tag, attributes, and children
  if (node.type === 'tag') {
    const { name, attribs, children } = node;

    // Recursively handle children and provide keys, unless it's a self-closing tag
    const childElements =
      selfClosingTags.has(name) ? null
      : children ? children.map((childNode: DOMNode, childIndex: number) => convertNodeToJSX(childNode, childIndex))
      : null;

    // Create a key using index or node data (e.g., tagName or attributes)
    const key = attribs?.id || `${name}-${index}`;

    // Use React.createElement to create the element dynamically, with a key and no children for self-closing tags
    return React.createElement(name, { key, ...attribs }, childElements);
  }

  return null; // Return null for unsupported node types
}

export const replaceWithComponent =
  (
    componentMappings: { tagName: string; Comp: React.FC<{ children: string | boolean | object | Element | null }> }[]
  ) =>
  (node: DOMNode, index: number = 0): string | boolean | object | Element | null => {
    for (const componentMapping of componentMappings) {
      if (node.type === 'tag' && node.name === componentMapping.tagName) {
        const Comp = componentMapping.Comp({
          ...node.attribs,
          children:
            node.children ?
              node.children.map((childNode: DOMNode, childIndex: number) =>
                replaceWithComponent(componentMappings)(childNode, childIndex)
              )
            : null,
        });
        if (Comp !== undefined && typeof Comp !== 'number' && typeof Comp !== 'bigint') {
          return Comp;
        }
      }
    }

    // Default handling for other nodes: use the existing convertNodeToJSX function
    const convertedNode = convertNodeToJSX(node, index);

    // Ensure convertedNode matches the expected return type of the replace function
    if (typeof convertedNode === 'string' || typeof convertedNode === 'object' || convertedNode === null) {
      return convertedNode;
    }

    // Fallback for unsupported types (e.g., number, boolean, etc.)
    return null;
  };
