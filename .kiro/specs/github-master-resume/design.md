# Design Document

## Overview

The GitHub Master Resume is a dual-mode, single-page web application that presents professional qualifications in two distinct contexts: Data Science/Machine Learning and Aerospace/Rocketry. The system uses a toggle mechanism to switch between modes, dynamically updating the visual theme and displayed projects while maintaining consistent core information across both views.

The application will be built as a static website hosted on GitHub Pages, utilizing modern web technologies for responsive design, smooth transitions, and optimal performance. Content will be stored in structured data files (JSON/YAML) to enable easy maintenance without requiring code changes.

## Architecture

### High-Level Architecture

The system follows a static site architecture with client-side interactivity:

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │  Content Data  │  │  Templates   │  │   Styles    │ │
│  │  (JSON/YAML)   │  │   (HTML)     │  │   (CSS)     │ │
│  └────────────────┘  └──────────────┘  └─────────────┘ │
│  ┌────────────────┐  ┌──────────────┐                  │
│  │    Scripts     │  │  Build Tool  │                  │
│  │ (JavaScript)   │  │              │                  │
│  └────────────────┘  └──────────────┘                  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │ GitHub Actions  │
                   │   (CI/CD)       │
                   └─────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  GitHub Pages   │
                   │  (Static Host)  │
                   └─────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  User Browser   │
                   │                 │
                   │  ┌───────────┐  │
                   │  │  Resume   │  │
                   │  │   App     │  │
                   │  └───────────┘  │
                   └─────────────────┘
```

### Technology Stack

- **Static Site Generator**: Vite or Next.js (static export) for build tooling
- **Frontend Framework**: React or vanilla JavaScript with modern ES6+
- **Styling**: CSS3 with CSS Variables for theming, or Tailwind CSS
- **Content Format**: Markdown (.md) or plain text (.txt) files for all user-editable content
- **Content Parser**: Markdown parser (e.g., marked, markdown-it) or custom text parser
- **Deployment**: GitHub Actions for automated builds and deployment to GitHub Pages
- **Version Control**: Git with GitHub for repository hosting

### Component Architecture

```
Resume Application
├── App Container
│   ├── Header Component
│   │   ├── Name & Title
│   │   ├── Contact Information
│   │   └── Mode Toggle Control
│   ├── Main Content
│   │   ├── Summary Section
│   │   ├── Education Section (Shared)
│   │   ├── Work Experience Section (Shared)
│   │   ├── Positions of Responsibility Section (Shared)
│   │   ├── Projects Section (Mode-Specific)
│   │   └── Skills Section (Mode-Specific or Shared)
│   └── Footer Component
├── Theme Manager
│   ├── Data Science Theme
│   └── Aerospace Theme
└── State Manager
    ├── Current Mode State
    └── Content Data Store
```

## Components and Interfaces

### 1. Mode Toggle Component

**Purpose**: Provides user interface for switching between resume modes

**Interface**:
```typescript
interface ModeToggleProps {
  currentMode: 'datascience' | 'aerospace';
  onModeChange: (mode: 'datascience' | 'aerospace') => void;
}
```

**Behavior**:
- Displays current active mode
- Handles click/tap events to switch modes
- Triggers theme transition
- Updates URL state for deep linking

### 2. Theme Manager

**Purpose**: Manages visual styling for each resume mode

**Interface**:
```typescript
interface Theme {
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

interface ThemeManager {
  getTheme(mode: 'datascience' | 'aerospace'): Theme;
  applyTheme(theme: Theme): void;
}
```

**Themes**:
- **Data Science/ML Theme**: Cool tones (blues, teals), tech-oriented background patterns
- **Aerospace/Rocketry Theme**: Warm/neutral tones (deep blues, grays), space/aerospace imagery

### 3. Content Manager

**Purpose**: Loads and parses content from text/Markdown files

**Interface**:
```typescript
interface ResumeContent {
  personal: PersonalInfo;
  education: Education[];
  experience: WorkExperience[];
  positions: Position[];
  projects: Project[];
  skills: Skill[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  outcomes: string[];
  recognition?: string;
  modes: ('datascience' | 'aerospace')[];
}

interface ContentManager {
  loadContent(): Promise<ResumeContent>;
  parseMarkdownFile(filePath: string): Promise<any>;
  parseTextFile(filePath: string): Promise<any>;
  filterProjects(projects: Project[], mode: string): Project[];
}
```

**Content File Structure**:
The system will read from organized text/Markdown files:
```
content/
├── personal.md          # Name, contact, summary
├── education.md         # Education entries
├── experience.md        # Work experience entries
├── positions.md         # Positions of responsibility
├── projects-ds.md       # Data Science projects
├── projects-aero.md     # Aerospace projects
└── skills.md            # Skills by category
```

### 4. Section Components

**Shared Sections** (Education, Experience, Positions):
```typescript
interface SharedSectionProps {
  data: Education[] | WorkExperience[] | Position[];
  title: string;
}
```

**Projects Section**:
```typescript
interface ProjectsSectionProps {
  projects: Project[];
  mode: 'datascience' | 'aerospace';
}
```

## Data Models

### Content File Format

All content will be stored in Markdown files with a simple, intuitive structure. Here are examples:

### personal.md
```markdown
# Personal Information

**Name:** Your Full Name
**Title:** Your Professional Title
**Email:** your.email@example.com
**Phone:** +1234567890
**LinkedIn:** linkedin.com/in/yourprofile
**GitHub:** github.com/yourusername
**Location:** City, Country

## Summary - Data Science
Your data science focused professional summary goes here. Highlight your ML expertise, data analysis skills, and relevant achievements.

## Summary - Aerospace
Your aerospace focused professional summary goes here. Highlight your rocketry experience, engineering skills, and relevant projects.
```

### education.md
```markdown
# Education

## Bachelor of Technology in Computer Science
**Institution:** University Name
**Location:** City, Country
**Duration:** August 2020 - May 2024
**GPA:** 3.8/4.0

**Achievements:**
- Dean's List for Academic Excellence
- Published research paper on Machine Learning
- Winner of University Hackathon 2023

---

## High School Diploma
**Institution:** School Name
**Location:** City, Country
**Duration:** 2018 - 2020
**Grade:** 95%
```

### experience.md
```markdown
# Work Experience

## Software Engineering Intern
**Company:** Tech Company Name
**Location:** City, Country
**Duration:** June 2023 - August 2023

**Responsibilities:**
- Developed machine learning models for customer segmentation
- Collaborated with cross-functional teams on data pipeline optimization
- Implemented automated testing for ML model validation

**Achievements:**
- Improved model accuracy by 15%
- Reduced processing time by 30%

---

## Research Assistant
**Institution:** University Research Lab
**Location:** City, Country
**Duration:** January 2022 - May 2023

**Responsibilities:**
- Conducted research on rocket propulsion systems
- Analyzed experimental data from fuel cell tests
- Assisted in preparing research publications
```

### positions.md
```markdown
# Positions of Responsibility

## President - Robotics Club
**Organization:** University Robotics Club
**Duration:** August 2022 - May 2024

**Responsibilities:**
- Led a team of 30+ members in various robotics projects
- Organized workshops and competitions
- Managed club budget and sponsorships

---

## Team Lead - Science Congress Project
**Organization:** 38th Kerala Science Congress
**Duration:** January 2023 - March 2023

**Responsibilities:**
- Led development of TerraNode environmental monitoring system
- Coordinated with team members for poster presentation
- Presented project to judges and received excellent feedback
```

### projects-aero.md
```markdown
# Aerospace & Rocketry Projects

## TerraNode - Environmental Data Collection System
**Technologies:** IoT, Automation, Web Server, Sensors, Python, Arduino

**Description:**
TerraNode is an IoT and automation system that seamlessly collects environmental data including temperature, humidity, air quality, and atmospheric pressure. All data is logged to a web server hosted on the user's computer, providing real-time monitoring and historical data analysis.

**Outcomes:**
- Selected for the 38th Kerala Science Congress scientific poster presentation
- Received excellent reviews from judges for seamless setup and working demonstration
- Successfully demonstrated real-time data collection and visualization
- System achieved 99.5% uptime during testing period

**Recognition:**
Presented at 38th Kerala Science Congress - Judges praised the seamless integration and practical application

---

## AI-Driven Rocket Fuel Cell Performance Evaluation
**Technologies:** Machine Learning, Computer Vision, Physics-Informed Neural Networks, Statistical Modeling, Python, TensorFlow

**Description:**
An ensemble model system for investigation and evaluation of solid rocket fuel cell performance. The system consists of three integrated models working together to provide comprehensive performance analysis.

**Model Components:**
1. **Agglomerate Recognition Model:** Uses computer vision to identify and locate agglomerates formed during the combustion process in the opposed flow burner
2. **Characterization Model:** Analyzes the properties and characteristics of identified agglomerates including size, shape, and distribution
3. **Performance Evaluation Model:** Combines statistical modeling with physics-informed neural network layers to evaluate overall fuel cell performance

**Outcomes:**
- Successfully integrated three specialized models into cohesive ensemble system
- Achieved high accuracy in agglomerate detection and characterization
- Physics-informed NN layer improved prediction accuracy by incorporating domain knowledge
- System provides actionable insights for fuel cell optimization

**Status:** Currently in development and testing phase
```

### projects-ds.md
```markdown
# Data Science & Machine Learning Projects

## AI-Driven Rocket Fuel Cell Performance Evaluation
**Technologies:** Machine Learning, Computer Vision, Physics-Informed Neural Networks, Statistical Modeling, Python, TensorFlow

**Description:**
An ensemble model system for investigation and evaluation of solid rocket fuel cell performance. The system consists of three integrated models working together to provide comprehensive performance analysis.

**Model Components:**
1. **Agglomerate Recognition Model:** Uses computer vision to identify and locate agglomerates formed during the combustion process
2. **Characterization Model:** Analyzes the properties and characteristics of identified agglomerates
3. **Performance Evaluation Model:** Combines statistical modeling with physics-informed neural network layers

**Outcomes:**
- Successfully integrated three specialized models into cohesive ensemble system
- Achieved high accuracy in agglomerate detection and characterization
- Demonstrated effective use of physics-informed neural networks
- System provides actionable insights for performance optimization

**Status:** Currently in development and testing phase

---

## [Add Your Other Data Science Projects Here]
**Technologies:** List technologies used

**Description:**
Project description goes here...

**Outcomes:**
- Outcome 1
- Outcome 2
```

### skills.md
```markdown
# Skills

## Data Science & Machine Learning
**Programming Languages:** Python, R, SQL, Julia
**ML Frameworks:** TensorFlow, PyTorch, Scikit-learn, Keras
**Data Tools:** Pandas, NumPy, Matplotlib, Seaborn
**Big Data:** Apache Spark, Hadoop
**Databases:** PostgreSQL, MongoDB, MySQL

## Aerospace & Engineering
**Programming Languages:** Python, C++, MATLAB, Arduino
**CAD & Simulation:** SolidWorks, ANSYS, MATLAB Simulink
**Hardware:** IoT Sensors, Microcontrollers, Data Acquisition Systems
**Domains:** Rocketry, Propulsion Systems, Environmental Monitoring, Automation

## General Technical Skills
**Version Control:** Git, GitHub
**Development Tools:** VS Code, Jupyter Notebook, Docker
**Cloud Platforms:** AWS, Google Cloud Platform
**Operating Systems:** Linux, Windows, macOS

## Soft Skills
- Problem Solving & Analytical Thinking
- Team Leadership & Collaboration
- Technical Writing & Documentation
- Project Management
- Public Speaking & Presentation
```

**Parsing Strategy**:
- Use Markdown parser to convert .md files to structured data
- Extract sections using heading levels (# for main sections, ## for entries)
- Parse key-value pairs using **Bold:** format
- Parse lists using - or * markers
- Separate entries using --- horizontal rules


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Mode toggle alternation
*For any* current resume mode, clicking the toggle control should switch to the opposite mode (datascience ↔ aerospace)
**Validates: Requirements 2.1**

### Property 2: Initial mode selection
*For any* page load, exactly one resume mode should be active (either datascience or aerospace, never both or neither)
**Validates: Requirements 1.5**

### Property 3: Toggle state reflection
*For any* active resume mode, the toggle control's visual state should accurately indicate which mode is currently active
**Validates: Requirements 2.3**

### Property 4: URL state synchronization
*For any* mode selection, the browser URL or state should be updated to reflect the selected mode, enabling direct linking
**Validates: Requirements 2.5**

### Property 5: Scroll position handling
*For any* mode switch, the scroll position should either be preserved at its current value or reset to 0 (top of page)
**Validates: Requirements 2.4**

### Property 6: Theme application correctness
*For any* active resume mode, the applied theme should match the mode (Data Science theme for datascience mode, Aerospace theme for aerospace mode)
**Validates: Requirements 3.1, 3.2**

### Property 7: Color contrast accessibility
*For any* theme color combination used for text and background, the contrast ratio should meet or exceed WCAG 2.1 Level AA standards (4.5:1 for normal text, 3:1 for large text)
**Validates: Requirements 3.5, 8.4**

### Property 8: Shared sections invariance
*For any* mode switch, the content of shared sections (education, work experience, positions of responsibility) should remain identical
**Validates: Requirements 4.1, 4.2, 4.3**

### Property 9: Chronological ordering
*For any* shared section with dated entries, the entries should be ordered chronologically with the most recent entry first
**Validates: Requirements 4.4**

### Property 10: Required fields presence
*For any* displayed entry in shared sections, all required fields (organization, role, duration, responsibilities) should be present in the rendered output
**Validates: Requirements 4.5**

### Property 11: Project filtering correctness
*For any* active resume mode, all displayed projects should have that mode included in their modes array (projects with 'datascience' in DS mode, projects with 'aerospace' in aerospace mode)
**Validates: Requirements 5.1, 5.2**

### Property 12: Project required fields
*For any* displayed project, all required fields (name, technologies, outcomes) should be present in the rendered output
**Validates: Requirements 5.5**

### Property 13: Semantic HTML usage
*For any* major content section, the HTML should use appropriate semantic elements (header, main, section, article, nav, footer) rather than generic div elements
**Validates: Requirements 8.1**

### Property 14: Non-text content accessibility
*For any* non-text content element (images, icons, interactive controls), there should be appropriate alternative text or ARIA labels
**Validates: Requirements 8.3**

### Property 15: Typography consistency
*For any* two sections of the same type, the typography properties (font-family, font-size, line-height) should be identical
**Validates: Requirements 7.2**

## Error Handling

### Content Loading Errors

**Scenario**: Content markdown/text file fails to load or is malformed

**Handling Strategy**:
1. Display user-friendly error message indicating which content file failed to load
2. Log detailed error information to browser console for debugging
3. Provide fallback content or graceful degradation where possible
4. Implement retry mechanism for network-related failures

**Implementation**:
```typescript
async function loadContent(): Promise<ResumeContent> {
  try {
    const files = [
      'content/personal.md',
      'content/education.md',
      'content/experience.md',
      'content/positions.md',
      'content/projects-ds.md',
      'content/projects-aero.md',
      'content/skills.md'
    ];
    
    const contentPromises = files.map(file => 
      fetch(file).then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
    );
    
    const [personal, education, experience, positions, projectsDS, projectsAero, skills] = 
      await Promise.all(contentPromises);
    
    return {
      personal: parsePersonalInfo(personal),
      education: parseEducation(education),
      experience: parseExperience(experience),
      positions: parsePositions(positions),
      projectsDS: parseProjects(projectsDS),
      projectsAero: parseProjects(projectsAero),
      skills: parseSkills(skills)
    };
  } catch (error) {
    console.error('Failed to load resume content:', error);
    showErrorMessage('Unable to load resume content. Please refresh the page.');
    return getFallbackContent();
  }
}
```

### Theme Application Errors

**Scenario**: Theme fails to apply or CSS variables are not supported

**Handling Strategy**:
1. Detect CSS custom property support
2. Fall back to inline styles or predefined CSS classes if unsupported
3. Ensure content remains readable even if theming fails

**Implementation**:
```typescript
function applyTheme(theme: Theme): void {
  try {
    if (CSS.supports('color', 'var(--primary)')) {
      // Modern browsers - use CSS variables
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
      });
    } else {
      // Fallback for older browsers
      applyThemeFallback(theme);
    }
  } catch (error) {
    console.error('Theme application failed:', error);
    // Ensure default readable theme
    applyDefaultTheme();
  }
}
```

### Mode Toggle Errors

**Scenario**: Mode switch fails or gets into inconsistent state

**Handling Strategy**:
1. Validate mode value before applying
2. Maintain previous valid state if new state is invalid
3. Log errors but don't break user experience

**Implementation**:
```typescript
function setMode(newMode: string): void {
  if (newMode !== 'datascience' && newMode !== 'aerospace') {
    console.error(`Invalid mode: ${newMode}`);
    return; // Keep current mode
  }
  
  try {
    currentMode = newMode;
    applyTheme(getTheme(newMode));
    filterAndDisplayProjects(newMode);
    updateToggleUI(newMode);
    updateURL(newMode);
  } catch (error) {
    console.error('Mode switch failed:', error);
    // Attempt to restore previous mode
    currentMode = previousMode;
    showErrorMessage('Failed to switch mode. Please try again.');
  }
}
```

### Responsive Design Failures

**Scenario**: Layout breaks on certain screen sizes or devices

**Handling Strategy**:
1. Use mobile-first responsive design approach
2. Test breakpoints thoroughly
3. Implement CSS fallbacks for unsupported features
4. Use feature detection rather than browser detection

**Implementation**:
```css
/* Mobile-first base styles */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

/* Fallback for browsers without CSS Grid */
@supports not (display: grid) {
  .grid-container {
    display: flex;
    flex-wrap: wrap;
  }
}
```

### Accessibility Failures

**Scenario**: Keyboard navigation or screen reader access fails

**Handling Strategy**:
1. Ensure all interactive elements are keyboard accessible
2. Provide skip links for navigation
3. Test with actual assistive technologies
4. Implement ARIA live regions for dynamic content updates

**Implementation**:
```html
<!-- Skip link for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Accessible toggle button -->
<button 
  type="button"
  aria-pressed="false"
  aria-label="Switch to Aerospace mode"
  onclick="toggleMode()"
>
  <span aria-hidden="true">Toggle Mode</span>
</button>

<!-- Live region for mode changes -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  <span id="mode-announcement"></span>
</div>
```

## Testing Strategy

### Unit Testing

Unit tests will verify individual functions and components in isolation:

**Content Management**:
- Test content loading from Markdown/text files
- Test Markdown parsing and conversion to structured data
- Test project filtering logic for each mode
- Test chronological sorting of dated entries
- Test handling of malformed Markdown content

**Theme Management**:
- Test theme object structure and completeness
- Test theme selection based on mode
- Test CSS variable application

**Component Rendering**:
- Test that each component renders with valid props
- Test conditional rendering based on mode
- Test that required fields are displayed

**Example Unit Tests**:
```typescript
describe('ContentManager', () => {
  test('filterProjects returns only datascience projects in DS mode', () => {
    const projects = [
      { id: '1', modes: ['datascience'] },
      { id: '2', modes: ['aerospace'] },
      { id: '3', modes: ['datascience', 'aerospace'] }
    ];
    const filtered = filterProjects(projects, 'datascience');
    expect(filtered).toHaveLength(2);
    expect(filtered.every(p => p.modes.includes('datascience'))).toBe(true);
  });

  test('sortChronologically orders entries by date descending', () => {
    const entries = [
      { date: '2022-01-01' },
      { date: '2024-01-01' },
      { date: '2023-01-01' }
    ];
    const sorted = sortChronologically(entries);
    expect(sorted[0].date).toBe('2024-01-01');
    expect(sorted[2].date).toBe('2022-01-01');
  });
});
```

### Property-Based Testing

Property-based tests will verify universal properties across many generated inputs using a PBT library (fast-check for JavaScript/TypeScript):

**Testing Framework**: fast-check (https://github.com/dubzzz/fast-check)

**Configuration**: Each property test should run a minimum of 100 iterations to ensure thorough coverage of the input space.

**Property Test Examples**:

```typescript
import fc from 'fast-check';

describe('Property-Based Tests', () => {
  test('Property 1: Mode toggle alternation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('datascience', 'aerospace'),
        (currentMode) => {
          const newMode = toggleMode(currentMode);
          const expected = currentMode === 'datascience' ? 'aerospace' : 'datascience';
          return newMode === expected;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 11: Project filtering correctness', () => {
    // Generator for projects with random mode assignments
    const projectGen = fc.array(
      fc.record({
        id: fc.string(),
        title: fc.string(),
        modes: fc.subarray(['datascience', 'aerospace'], { minLength: 1 })
      })
    );

    fc.assert(
      fc.property(
        projectGen,
        fc.constantFrom('datascience', 'aerospace'),
        (projects, mode) => {
          const filtered = filterProjects(projects, mode);
          return filtered.every(project => project.modes.includes(mode));
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 8: Shared sections invariance', () => {
    const contentGen = fc.record({
      education: fc.array(fc.object()),
      experience: fc.array(fc.object()),
      positions: fc.array(fc.object())
    });

    fc.assert(
      fc.property(contentGen, (content) => {
        const dsMode = renderSharedSections(content, 'datascience');
        const aeroMode = renderSharedSections(content, 'aerospace');
        return JSON.stringify(dsMode) === JSON.stringify(aeroMode);
      }),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

Integration tests will verify that components work together correctly:

- Test full mode switching flow (toggle click → theme change → project filter → UI update)
- Test content loading and rendering pipeline
- Test responsive behavior at different viewport sizes
- Test keyboard navigation through all interactive elements
- Test URL state management and deep linking

### Accessibility Testing

- Automated accessibility testing using axe-core or similar tools
- Manual testing with keyboard navigation
- Manual testing with screen readers (NVDA, JAWS, VoiceOver)
- Color contrast verification using automated tools
- Focus management testing

### Performance Testing

- Measure initial page load time
- Measure mode switch transition time
- Test with throttled network conditions
- Verify asset optimization (image compression, minification)

### Cross-Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment Strategy

### Build Process

1. **Content Validation**: Validate JSON/YAML content files against schema
2. **Asset Optimization**: Compress images, minify CSS/JS, optimize fonts
3. **Static Generation**: Build static HTML/CSS/JS files
4. **Testing**: Run unit tests and property-based tests
5. **Bundle**: Create deployment-ready bundle

### GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Rollback Strategy

- Maintain previous deployment in separate branch
- Use GitHub Pages deployment history for quick rollback
- Tag releases for easy version identification

## Future Enhancements

### Phase 2 Features

1. **PDF Export**: Generate downloadable PDF versions of each resume mode
2. **Print Optimization**: Enhanced print stylesheets for professional printing
3. **Analytics**: Track which mode is viewed more frequently
4. **Dark Mode**: Add dark theme option for both resume modes
5. **Animations**: Smooth transitions and micro-interactions
6. **Internationalization**: Support for multiple languages

### Phase 3 Features

1. **CMS Integration**: Admin interface for content editing
2. **A/B Testing**: Test different layouts and content presentations
3. **Custom Themes**: Allow theme customization beyond two presets
4. **Skills Visualization**: Interactive charts for skills proficiency
5. **Timeline View**: Visual timeline of career progression
