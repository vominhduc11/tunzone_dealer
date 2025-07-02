// This component ensures dark mode is applied immediately to prevent flash
export default function ThemeScript() {
  const themeScript = `
    (function() {
      function applyDarkTheme() {
        const root = document.documentElement;
        
        // Remove light theme class if it exists
        root.classList.remove('light');
        
        // Add dark theme class
        root.classList.add('dark');
        
        // Set data attribute
        root.setAttribute('data-theme', 'dark');
        
        // Set color scheme
        root.style.colorScheme = 'dark';
      }
      
      // Always apply dark theme
      applyDarkTheme();
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}
