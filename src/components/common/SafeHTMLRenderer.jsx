import React from 'react';
import DOMPurify from 'dompurify';

/**
 * Component để render HTML content một cách an toàn
 * Sử dụng DOMPurify để sanitize HTML và CSS thuần để styling
 */
const SafeHTMLRenderer = ({
  htmlContent,
  className = '',
  fallback = null,
  allowedTags = undefined
}) => {
  if (!htmlContent) {
    return fallback;
  }

  // Cấu hình DOMPurify - chỉ cho phép các tags an toàn
  const purifyConfig = {
    ALLOWED_TAGS: allowedTags || [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span',
      'div', 'table', 'tr', 'td', 'th', 'thead', 'tbody'
    ],
    ALLOWED_ATTR: [
      'class', 'style', 'id', 'data-*', 'href', 'target', 'rel', 'border'
    ],
    ALLOWED_STYLES: {
      'color': true,
      'font-weight': true,
      'font-style': true,
      'text-decoration': true,
      'text-align': true,
      'margin': true,
      'margin-top': true,
      'padding': true,
      'background-color': true,
      'border': true,
      'border-radius': true,
      'border-left': true,
      'border-collapse': true,
      'padding-left': true,
      'min-width': true,
      'width': true
    },
    // Cho phép tất cả class attributes
    ALLOW_UNKNOWN_PROTOCOLS: false,
    KEEP_CONTENT: true
  };

  // Sanitize HTML content
  const sanitizedHTML = DOMPurify.sanitize(htmlContent, purifyConfig);

  return (
    <div
      className={`html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default SafeHTMLRenderer;