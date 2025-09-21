import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { ClearOutlined, ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const RichTextEditor = ({
  value = '',
  onChange,
  placeholder = 'Nhập nội dung...',
  template = '',
  height = '200px'
}) => {
  const [editorValue, setEditorValue] = useState(value || template);

  useEffect(() => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  }, [value]);

  const handleChange = (newValue) => {
    setEditorValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    handleChange('');
    message.success('Đã xóa nội dung');
  };

  const handleUseTemplate = () => {
    if (template) {
      handleChange(template);
      message.success('Đã áp dụng mẫu');
    }
  };

  return (
    <div className="rich-text-editor">
      <div className="flex justify-between items-center mb-2">
        <div className="flex !space-x-2">
          {template && (
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={handleUseTemplate}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Sử dụng mẫu
            </Button>
          )}
          <Button
            size="small"
            icon={<ClearOutlined />}
            onClick={handleClear}
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            Xóa tất cả
          </Button>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Simple toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-2 flex !space-x-1">
          <button
            type="button"
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => document.execCommand('bold')}
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => document.execCommand('italic')}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => document.execCommand('underline')}
          >
            <u>U</u>
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => document.execCommand('insertUnorderedList')}
          >
            • List
          </button>
        </div>

        {/* Editor area */}
        <div
          contentEditable
          className="p-3 min-h-32 focus:outline-none"
          style={{ height, overflowY: 'auto' }}
          dangerouslySetInnerHTML={{ __html: editorValue }}
          onInput={(e) => handleChange(e.currentTarget.innerHTML)}
          placeholder={placeholder}
          suppressContentEditableWarning={true}
        />
      </div>

      <div className="mt-1 text-xs text-gray-500">
        Sử dụng toolbar phía trên để định dạng text. Có thể sử dụng mẫu có sẵn hoặc tự tạo nội dung.
      </div>

      <style jsx>{`
        .rich-text-editor [contenteditable]:empty:before {
          content: attr(placeholder);
          color: #999;
          font-style: italic;
        }
        .rich-text-editor [contenteditable]:focus {
          border-color: #1890ff;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

RichTextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  template: PropTypes.string,
  height: PropTypes.string,
};

export default RichTextEditor;