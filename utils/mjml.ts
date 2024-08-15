import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as mjml from 'mjml';

export function renderMjmlFileToHtml(mjmlFilePath: string, data: any): string {
  try {
    const mjmlTemplate = fs.readFileSync(mjmlFilePath, 'utf-8');

    const template = Handlebars.compile(mjmlTemplate);

    const filledMjml = template(data);

    const renderedMjml = mjml(filledMjml);

    return renderedMjml.html;
  } catch (error) {
    console.error('Error rendering MJML:', error);
    throw error;
  }
}
