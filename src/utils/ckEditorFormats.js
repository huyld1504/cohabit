/**
 * Demo: So sánh output thực tế của CK Editor vs Tailwind
 */

// ========================================
// CK EDITOR THỰC TẾ TẠO RA:
// ========================================

const ckEditorRealOutput = `
<!-- User click Bold button -->
<p><strong>Tiêu đề quan trọng</strong></p>

<!-- User chọn màu đỏ từ color picker -->
<p style="color: rgb(220, 38, 38);">Text màu đỏ</p>

<!-- User tạo table -->
<table style="border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <td style="border: 1px solid rgb(0, 0, 0); padding: 8px;">Cell 1</td>
      <td style="border: 1px solid rgb(0, 0, 0); padding: 8px;">Cell 2</td>
    </tr>
  </tbody>
</table>

<!-- User tạo list -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- User align center -->
<p style="text-align: center;">Text căn giữa</p>
`;

// ========================================
// TAILWIND FORMAT (KHÔNG REALISTIC):
// ========================================

const tailwindFormat = `
<!-- User sẽ KHÔNG BAO GIỜ viết được như này qua CK Editor -->
<p class="font-bold text-lg text-gray-900">Tiêu đề quan trọng</p>
<p class="text-red-600">Text màu đỏ</p>
<table class="w-full border-collapse">
  <tbody>
    <tr>
      <td class="border border-gray-300 p-2">Cell 1</td>
      <td class="border border-gray-300 p-2">Cell 2</td>
    </tr>
  </tbody>
</table>
<ul class="list-disc pl-6 space-y-2">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<p class="text-center">Text căn giữa</p>
`;

// ========================================
// CẤU HÌNH CK EDITOR THỰC TẾ:
// ========================================

const ckEditorConfig = {
  toolbar: [
    'heading',
    '|',
    'bold', 'italic', 'underline',
    '|',
    'bulletedList', 'numberedList',
    '|',
    'insertTable',
    '|',
    'fontColor', 'fontBackgroundColor',
    '|',
    'alignment:left', 'alignment:center', 'alignment:right',
    '|',
    'link', 'blockQuote',
    '|',
    'undo', 'redo'
  ],

  // CK Editor sẽ tạo styles như này:
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
    ]
  },

  // Output sẽ là:
  // <h3>My Heading</h3> (không có classes)
  // <p style="color: red;">Colored text</p>
  // <table style="...">...</table>
};

export { ckEditorRealOutput, tailwindFormat, ckEditorConfig };