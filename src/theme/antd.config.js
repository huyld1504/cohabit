// Theme configuration for Ant Design
export const themeConfig = {
  token: {
    // Primary colors
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',

    // Font settings
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,

    // Border radius
    borderRadius: 8,

    // Spacing
    padding: 16,
    margin: 16,
  },
  components: {
    Button: {
      borderRadius: 8,
      fontWeight: 500,
    },
    Card: {
      borderRadiusLG: 12,
    },
    Input: {
      borderRadius: 8,
    },
  },
};

// Alternative theme for dark mode
export const darkThemeConfig = {
  algorithm: 'dark',
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#141414',
  },
};
