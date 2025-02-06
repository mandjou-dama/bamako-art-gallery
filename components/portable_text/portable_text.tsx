import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";

import "./styles.css";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <span className="portable_text_span">{children}</span>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a href={value?.href} rel="noreferrer noopener">
            {children}
          </a>
        );
      },
      strong: ({ children }) => (
        <strong className="portable_text_strong">{children}</strong>
      ),
    },
    list: {
      // Customize unordered lists (bullet points)
      bullet: ({ children }) => (
        <ul className="portable_text_bullet_list">{children}</ul>
      ),
      // Customize ordered lists (numbered lists)
      number: ({ children }) => (
        <ol className="portable_text_numbered_list">{children}</ol>
      ),
    },
    listItem: {
      // Customize individual list items
      bullet: ({ children }) => (
        <li className="portable_text_bullet_list_item">{children}</li>
      ),
      number: ({ children }) => (
        <li className="portable_text_numbered_list_item">{children}</li>
      ),
    },
  };

  return (
    <div className={["prose", className].filter(Boolean).join(" ")}>
      <PortableText components={components} value={value} />
    </div>
  );
}
