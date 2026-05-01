import { marked } from 'marked';

// Configure marked parser for consistent output
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
});

export { marked };
