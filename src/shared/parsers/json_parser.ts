import { DocumentType } from '../document_type';

export default class JsonParser {
  parserOptions: Record<string, any>;
  constructor(parserOptions: Record<string, any>) {
    this.parserOptions = parserOptions;
  }

  parse(inputStr: string): DocumentType {
    const json: Record<string, any> = JSON.parse(inputStr);
    const doc: DocumentType = {};

    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const jsonVal: Array<Record<string, string>> = json[key];
      if (!doc[key]) {
        doc[key] = [];
      }
      const values = jsonVal.map((v) => Object.values(v));
      for (let j = 0; j < values.length; j++) {
        doc[key].push(values[j]);
      }
    }

    return doc;
  }
}
