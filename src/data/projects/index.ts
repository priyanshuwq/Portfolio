import { audoraContent } from "./audora";
import { vibechatContent } from "./vibechat";
import { porscheContent } from "./porsche-911";
import { authentiscanContent } from "./authentiscan";

export interface ProjectContent {
  overview: string;
  features: string[];
  techStack: string[];
  highlights?: string[];
}

export const projectContent: Record<string, ProjectContent> = {
  "audora": audoraContent,
  "vibechat": vibechatContent,
  "porsche-911": porscheContent,
  "authentiscan": authentiscanContent,
};

export { audoraContent, vibechatContent, porscheContent, authentiscanContent };
