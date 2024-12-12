import { DocumentType } from '../document_type';
import { documentTypeToJsonDoc } from '../utils';

export default class JsonSerializer {
  serializerOptions: Record<string, any>;
  constructor(serializerOptions: Record<string, any>) {
    this.serializerOptions = serializerOptions;
  }

  serialize(doc: DocumentType): string {
    const jsonDoc: Record<string, any> = documentTypeToJsonDoc(doc);

    return JSON.stringify(jsonDoc);
  }
}
