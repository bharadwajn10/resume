export type ResumeMode = 'datascience' | 'aerospace';

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  backgroundImage?: string;
  typography: {
    headingFont: string;
    bodyFont: string;
  };
}

export const DATA_SCIENCE_THEME: Theme = {
  name: 'Data Science',
  colors: {
    primary: '#2563eb', // Blue
    secondary: '#0891b2', // Cyan/Teal
    background: '#f0f9ff', // Light blue background
    text: '#1e293b', // Dark slate
    accent: '#06b6d4', // Bright cyan
  },
  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  typography: {
    headingFont: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    bodyFont: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

export const AEROSPACE_THEME: Theme = {
  name: 'Aerospace',
  colors: {
    primary: '#b91c1c', // Darker red for better contrast (was #dc2626)
    secondary: '#c2410c', // Darker orange for better contrast (was #ea580c)
    background: '#fef2f2', // Light red/pink background
    text: '#1e293b', // Dark slate
    accent: '#ea580c', // Orange accent
  },
  backgroundImage: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
  typography: {
    headingFont: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    bodyFont: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};
