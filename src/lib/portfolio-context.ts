// Portfolio context for AI chatbot - optimized for token efficiency
import { DATA } from "@/data/resume";
import { languages, tools, allTech } from "@/data/tools";

/**
 * Generates dynamic portfolio context from resume data
 * This ensures chatbot always has the latest information
 */
export function generatePortfolioContext(): string {
  // Extract projects data
  const projectsSection = DATA.projects
    .map((project) => {
      const websiteLink = project.links.find((l) => l.type === "Website")?.href || "#";
      const sourceLink = project.links.find((l) => l.type === "Source")?.href || "#";
      const status = project.active ? "" : ` | ${project.status || "In Progress"}`;
      const techStack = project.technologies.join(", ");
      
      return `### ${project.title} | ${websiteLink} | ${sourceLink}${status}
${project.description} Stack: ${techStack}`;
    })
    .join("\n\n");

  // Extract skills from DATA.skills (basic list)
  const basicSkillsList = DATA.skills.join(", ");
  
  // Extract ALL tools and technologies from tools-marquee
  const languagesList = languages.map(l => l.name).join(", ");
  const toolsList = tools.map(t => t.name).join(", ");
  const allToolsList = allTech.map(t => t.name).join(", ");

  // Extract social links
  const socialLinks = Object.entries(DATA.contact.social)
    .filter(([_, social]) => social.navbar)
    .map(([_, social]) => `${social.name}: ${social.url}`)
    .join(" | ");

  // Build work experience section (if exists in DATA)
  const workSection = (DATA as any).work
    ? "\n\n## Work Experience\n" +
      (DATA as any).work
        .map((job: any) => `**${job.company}** | ${job.title} (${job.start} - ${job.end || "Present"})\n${job.description}`)
        .join("\n\n")
    : "\n\n## Experience\nFreelance Full-Stack Developer (2025-Present) - Building production-ready apps with React, Next.js, TypeScript";

  // Build education section (if exists in DATA)
  const educationSection = (DATA as any).education
    ? "\n\n## Education\n" +
      (DATA as any).education
        .map((edu: any) => `${edu.degree} (${edu.start} - ${edu.end}) | ${edu.school} | ${edu.location || ""}`)
        .join("\n")
    : "\n\n## Education\nBCA (2023-2026) | GGSIPU, New Delhi | SGPA: 8.78 | 3rd Year";

  // Build certifications section (if exists in DATA)
  const certificationsSection = (DATA as any).certifications
    ? "\n\n## Certifications\n" +
      (DATA as any).certifications.map((cert: any) => `- ${cert}`).join("\n")
    : "\n\n## Certifications\n- Smart India Hackathon - State Level Participant\n- MERN Stack Course by Hitesh Chaudhary\n- Open Source Contributor on GitHub";

  return `You are ${DATA.name}'s portfolio assistant. Be conversational yet professional. Help recruiters understand his skills and projects.

## About
**Name**: Priyanshu Shekhar Singh (refer as "${DATA.name}" unless full name is specifically requested)
**Role**: FullStack Developer
**Location**: ${DATA.location}
**Website**: ${DATA.url}
**Email**: ${DATA.contact.email}
**Status**: Actively seeking full-time opportunities and freelance projects
**Bio**: ${DATA.description}
${educationSection}
${workSection}
${certificationsSection}

## Skills & Technologies

**Programming Languages**: ${languagesList}

**Frameworks & Libraries**: ${toolsList}

**Complete Tech Stack**: ${allToolsList}

**Setup & Environment**: Uses Arch Linux as primary operating system for development

## Projects

${projectsSection}

## Links
${socialLinks}
Resume: ${DATA.url}/resume/Priyanshu_Resume.pdf?v=2
Resume Template: https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs (Jake's Resume - LaTeX template used for Priyanshu's resume)`;
}

export const COMMON_INSTRUCTIONS = `
## Instructions
1. **Name Usage**: Use "${DATA.name}" by default. Only provide full name "Priyanshu Shekhar Singh" when specifically asked (e.g., "What's his full name?")
2. **Match response length to query**: Simple greetings = 1-2 sentences. Complex questions = detailed but concise (max 150 words)
2. **Be exact and specific**: If asked for resume, provide ONLY resume link. If asked for GitHub, provide ONLY GitHub link. Don't add extra information
3. **Greetings & Cultural Respect**: 
   - Respond to "hello/hi" briefly: "Hi! How can I help you learn about ${DATA.name}'s work?"
   - Hindi/religious greetings (Namaste, Jai Shree Ram, etc.): Respond respectfully in same language/tone, then offer help
   - Example: "Jai Shree Ram! How can I assist you with ${DATA.name}'s portfolio today?"
5. **Accuracy First**: NEVER invent information. Only use data from this context. If unsure, say "I don't have that specific information"
6. **Out-of-scope questions**: If asked about unrelated topics (weather, politics, general advice), politely redirect: "I'm focused on ${DATA.name}'s work and skills. Can I help with his projects, experience, or tech stack?"
6. **Use markdown links**: [text](url)
7. **For hiring inquiries**: Confirm he's actively seeking opportunities and direct to ${DATA.contact.email}
8. **Real-time data** (if provided with "--- REAL-TIME DATA ---"): Use it for Spotify/GitHub/visitor questions`;

export const INITIAL_MESSAGE = `Hi! I'm ${DATA.name}'s portfolio assistant. 
What would you like to know?`;

export function generateQuickSummary(): string {
  const topProjects = DATA.projects
    .filter(p => p.active)
    .slice(0, 4)
    .map(p => {
      const link = p.links.find(l => l.type === "Website")?.href || "#";
      return `• [${p.title}](${link}) - ${p.description.split('.')[0]}`;
    })
    .join("\n");

  const socialLinksFormatted = Object.entries(DATA.contact.social)
    .filter(([_, social]) => social.navbar)
    .map(([_, social]) => `[${social.name}](${social.url})`)
    .join(" | ");
  
  // Get top skills from the complete tech stack
  const topSkills = allTech.slice(0, 10).map(t => t.name).join(", ");

  return `**${DATA.name}** | FullStack Developer | ${DATA.location}

**Stack**: ${topSkills}, and more

**Projects**:
${topProjects}

**Contact**: [Email](mailto:${DATA.contact.email}) | [Resume](${DATA.url}/resume/Priyanshu_Resume.pdf?v=2) | ${socialLinksFormatted}`;
}

// Export dynamic context (generated on-demand)
export const PORTFOLIO_CONTEXT = generatePortfolioContext() + COMMON_INSTRUCTIONS;
export const QUICK_SUMMARY = generateQuickSummary();
