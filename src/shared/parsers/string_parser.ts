import { DocumentType } from '../document_type';

export default class StringParser {
  parserOptions: Record<string, any>;
  lineSeparator: string;
  valueSeparator: string;

  constructor(parserOptions: Record<string, any>) {
    this.parserOptions = parserOptions;
    this.lineSeparator = parserOptions['line_separator'] as string;
    this.valueSeparator = parserOptions['value_separator'] as string;
  }

  parse(input: string): DocumentType {
    const doc: DocumentType = {};

    const lines = input.split(this.lineSeparator);
    for (let i = 0; i < lines.length; i++) {
      const lineParts = lines[i].split(this.valueSeparator);
      const key = lineParts[0];
      if (!key.trim()) {
        continue;
      }

      const values = lineParts.slice(1);
      if (!doc[key]) {
        doc[key] = [];
      }
      doc[key].push(values);
    }

    return doc;
  }
}
