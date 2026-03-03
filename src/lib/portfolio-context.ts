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

  // Build work experience section (only if present in DATA)
  const workSection = (DATA as any).work
    ? "\n\n## Work Experience\n" +
      (DATA as any).work
        .map((job: any) => `**${job.company}** | ${job.title} (${job.start} - ${job.end || "Present"})\n${job.description}`)
        .join("\n\n")
    : "";

  // Build education section (only if present in DATA)
  const educationSection = (DATA as any).education
    ? "\n\n## Education\n" +
      (DATA as any).education
        .map((edu: any) => `${edu.degree} (${edu.start} - ${edu.end}) | ${edu.school} | ${edu.location || ""}`)
        .join("\n")
    : "";

  // Build certifications section (only if present in DATA)
  const certificationsSection = (DATA as any).certifications
    ? "\n\n## Certifications\n" +
      (DATA as any).certifications.map((cert: any) => `- ${cert}`).join("\n")
    : "";

  return `You are ${DATA.name}'s portfolio assistant. Be extremely brief and accurate. Only answer what is asked — nothing more.

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
## Rules (follow strictly)
1. **Brevity above all**: Match response exactly to the question. One link asked = one link. One fact asked = one sentence.
2. **No extra info**: Never volunteer unrequested details. If asked for resume, reply with ONLY the resume link. If asked for GitHub, reply with ONLY the GitHub link.
3. **Unknown info**: If the context doesn't have an answer, say: "I don't have that information."
4. **No invented data**: Only use facts present in this context. Never guess or infer.
5. **Links**: Always use markdown format [label](url) so they are clickable.
6. **Greetings**: Reply briefly — "Hi! Ask me anything about ${DATA.name}'s work."
7. **Off-topic**: Politely decline — "I can only help with ${DATA.name}'s portfolio."
8. **Hiring**: He is open to opportunities. Direct to [${DATA.contact.email}](mailto:${DATA.contact.email}).
9. **Real-time data**: If provided under "--- REAL-TIME DATA ---", use it for music/Last.fm/GitHub/visitor questions.
10. **Max length**: Never exceed 120 words unless the user explicitly asks for a detailed explanation.`;

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
