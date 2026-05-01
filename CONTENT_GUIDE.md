# Content Editing Guide

This guide explains how to edit the content files for your dual-mode resume. All content is stored in simple Markdown files in the `content/` directory, making it easy to update without touching any code.

## Overview

Your resume content is organized into separate files:

- `personal.md` - Your name, contact information, and mode-specific summaries
- `education.md` - Your educational background
- `experience.md` - Your work experience
- `positions.md` - Leadership positions and responsibilities
- `projects-ds.md` - Data Science and Machine Learning projects
- `projects-aero.md` - Aerospace and Rocketry projects
- `skills.md` - Your technical and soft skills

## File Structure and Format

### personal.md

This file contains your basic information and two mode-specific summaries.

**Format:**
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

**Key Points:**
- Use `**Field:**` format for contact information
- Include two separate summaries: one for Data Science mode, one for Aerospace mode
- The summaries will be displayed based on which mode is active

### education.md

List your educational qualifications in reverse chronological order (most recent first).

**Format:**
```markdown
# Education

## Degree Name
**Institution:** University or School Name
**Location:** City, Country
**Duration:** Start Date - End Date
**GPA:** X.X/4.0 (or Grade: XX%)

**Achievements:**
- Achievement 1
- Achievement 2
- Achievement 3

---

## Next Degree
**Institution:** ...
```

**Key Points:**
- Use `## Heading` for each degree/qualification
- Separate entries with `---` (horizontal rule)
- Include all relevant details: institution, location, duration, GPA/grade
- List achievements as bullet points under `**Achievements:**`

### experience.md

List your work experience in reverse chronological order.

**Format:**
```markdown
# Work Experience

## Job Title
**Company:** Company Name
**Location:** City, Country
**Duration:** Start Date - End Date

**Responsibilities:**
- Responsibility 1
- Responsibility 2
- Responsibility 3

**Achievements:**
- Achievement 1
- Achievement 2

---

## Next Job
**Company:** ...
```

**Key Points:**
- Use `## Heading` for each position
- Separate entries with `---`
- Include responsibilities and achievements as separate sections
- Use bullet points for easy reading

### positions.md

List leadership positions and responsibilities.

**Format:**
```markdown
# Positions of Responsibility

## Position Title
**Organization:** Organization Name
**Duration:** Start Date - End Date

**Responsibilities:**
- Responsibility 1
- Responsibility 2
- Responsibility 3

---

## Next Position
**Organization:** ...
```

**Key Points:**
- Similar format to experience.md
- Focus on leadership roles, club positions, volunteer work
- Separate entries with `---`

### projects-ds.md

List your Data Science and Machine Learning projects. These will only appear when the resume is in Data Science mode.

**Format:**
```markdown
# Data Science & Machine Learning Projects

## Project Name
**Technologies:** Tech1, Tech2, Tech3, Tech4

**Description:**
A detailed description of your project. You can use multiple paragraphs if needed.

Explain what the project does, what problem it solves, and any interesting technical details.

**Model Components:** (optional, for complex ML projects)
1. **Component 1:** Description
2. **Component 2:** Description
3. **Component 3:** Description

**Outcomes:**
- Outcome 1
- Outcome 2
- Outcome 3

**Recognition:** (optional)
Any awards, presentations, or recognition received

**Status:** (optional)
Current status of the project (e.g., "In development", "Completed", "Deployed")

---

## Next Project
**Technologies:** ...
```

**Key Points:**
- Use `## Heading` for each project
- Separate projects with `---`
- Technologies should be comma-separated
- Use bullet points for outcomes
- Optional sections can be omitted if not applicable

### projects-aero.md

List your Aerospace and Rocketry projects. These will only appear when the resume is in Aerospace mode.

**Format:**
```markdown
# Aerospace & Rocketry Projects

## Project Name
**Technologies:** Tech1, Tech2, Tech3, Tech4

**Description:**
A detailed description of your project...

**Outcomes:**
- Outcome 1
- Outcome 2

**Recognition:** (optional)
Any awards or recognition

---

## Next Project
**Technologies:** ...
```

**Key Points:**
- Same format as projects-ds.md
- These projects appear only in Aerospace mode
- Include technical details relevant to aerospace/rocketry

### skills.md

Organize your skills into categories.

**Format:**
```markdown
# Skills

## Data Science & Machine Learning
**Programming Languages:** Python, R, SQL, Julia
**ML Frameworks:** TensorFlow, PyTorch, Scikit-learn
**Data Tools:** Pandas, NumPy, Matplotlib
**Databases:** PostgreSQL, MongoDB

## Aerospace & Engineering
**Programming Languages:** Python, C++, MATLAB
**CAD & Simulation:** SolidWorks, ANSYS
**Hardware:** IoT Sensors, Microcontrollers
**Domains:** Rocketry, Propulsion Systems

## General Technical Skills
**Version Control:** Git, GitHub
**Development Tools:** VS Code, Jupyter Notebook
**Cloud Platforms:** AWS, Google Cloud

## Soft Skills
- Problem Solving & Analytical Thinking
- Team Leadership & Collaboration
- Technical Writing & Documentation
```

**Key Points:**
- Organize skills into logical categories
- Use `**Category:**` format for skill groups
- Separate skills with commas
- Soft skills can use bullet points

## Adding New Entries

### To add a new education entry:

1. Open `content/education.md`
2. Add a new section at the top (after `# Education`) for most recent, or in chronological order
3. Use the format shown above
4. Separate from other entries with `---`

### To add a new work experience:

1. Open `content/experience.md`
2. Add a new section at the top for most recent position
3. Follow the format with company, location, duration, responsibilities, and achievements
4. Separate with `---`

### To add a new project:

1. Decide which mode it belongs to (Data Science or Aerospace)
2. Open the appropriate file (`projects-ds.md` or `projects-aero.md`)
3. Add a new project section
4. Include technologies, description, outcomes, and optional recognition
5. Separate with `---`

**Note:** If a project is relevant to both modes, you can add it to both files with appropriate descriptions for each audience.

### To update personal information:

1. Open `content/personal.md`
2. Update the relevant fields (name, email, phone, etc.)
3. Update the mode-specific summaries to reflect your current focus

### To add new skills:

1. Open `content/skills.md`
2. Add skills to existing categories or create new categories
3. Use the `**Category:**` format
4. Separate skills with commas

## Markdown Formatting Tips

### Bold Text
Use `**text**` to make text bold:
```markdown
**Institution:** University Name
```

### Bullet Points
Use `-` or `*` for bullet points:
```markdown
- Point 1
- Point 2
```

### Headings
Use `#` for headings (more `#` = smaller heading):
```markdown
# Main Heading (H1)
## Section Heading (H2)
### Subsection (H3)
```

### Horizontal Rules
Use `---` to create a separator between entries:
```markdown
## First Entry
Content here...

---

## Second Entry
Content here...
```

### Line Breaks
Leave a blank line between paragraphs for proper spacing.

## Best Practices

1. **Keep it concise**: Use clear, concise language
2. **Use action verbs**: Start bullet points with strong action verbs (Developed, Led, Implemented, etc.)
3. **Quantify achievements**: Include numbers and metrics when possible (e.g., "Improved accuracy by 15%")
4. **Stay consistent**: Use the same format for similar entries
5. **Proofread**: Check for spelling and grammar errors
6. **Update regularly**: Keep your resume current with new projects and experiences

## Testing Your Changes

After editing content files:

1. Save your changes
2. Rebuild the site (the build process will automatically parse your markdown files)
3. View the resume in both modes to ensure everything displays correctly
4. Check that formatting looks good on mobile, tablet, and desktop

## Troubleshooting

### Content not displaying?
- Check that you're using the correct markdown format
- Ensure all required fields are present (e.g., `**Institution:**` for education)
- Verify that you've saved the file

### Formatting looks wrong?
- Make sure you have blank lines between sections
- Check that you're using `**Field:**` format correctly
- Ensure bullet points start with `-` or `*`

### Projects not showing in correct mode?
- Verify you've added the project to the correct file (`projects-ds.md` or `projects-aero.md`)
- Check that the file is saved

## Need Help?

If you encounter issues or need to add new types of content not covered here, refer to the existing examples in the content files or consult the project documentation.
