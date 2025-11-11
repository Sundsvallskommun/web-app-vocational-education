import { DOMNode } from 'html-react-parser';
import React from 'react';

// Type guard to check if the node is a tag node
function isTagNode(node: DOMNode): node is DOMNode & {
  name: string;
  attribs: Record<string, string>;
  children?: DOMNode[];
} {
  return node.type === 'tag';
}

// The main function to replace nodes with components
export const replaceWithComponent =
  (componentMappings: { tagName: string; Comp: React.FC<{ children: React.ReactNode }> }[]) =>
  // eslint-disable-next-line react/display-name
  (node: DOMNode, index: number = 0): string | boolean | object | Element | null => {
    if (isTagNode(node)) {
      for (const { tagName, Comp } of componentMappings) {
        if (node.name === tagName) {
          // Map the children recursively
          const children = node.children?.map((childNode, childIndex) =>
            replaceWithComponent(componentMappings)(childNode, childIndex)
          );

          // Return component with children if it's a matching tag
          return (
            <Comp key={index} {...node.attribs}>
              {(children && children.length > 0 ? children : null) as React.ReactNode}
            </Comp>
          );
        }
      }

      // Fallback to creating a default element if no component matches
      const children = node.children?.map((childNode, childIndex) =>
        replaceWithComponent(componentMappings)(childNode, childIndex)
      );

      // Special handling for self-closing tags (e.g., <img />)
      if (node.name === 'img') {
        // Ensure <img /> is passed through as a valid React element
        return React.createElement('img', { key: index, ...node.attribs });
      }

      // Use React.createElement to create the element dynamically for other nodes
      return React.createElement(
        node.name,
        { key: index, ...node.attribs },
        (children && children.length > 0 ? children : null) as React.ReactNode
      );
    }

    if (node.type === 'text') {
      // Return text data as a string
      return node.data || null;
    }

    // Return null for unsupported node types
    return null;
  };
