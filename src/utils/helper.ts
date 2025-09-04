import { marked } from "marked";

export const renderedMarkdown = (text: string) => marked.parse(text);