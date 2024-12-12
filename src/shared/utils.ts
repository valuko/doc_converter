import { DocumentType } from './document_type';

const generateValuesObj = (
  values: string[],
  key: string,
): Record<string, string> => {
  const valuesObj: Record<string, string> = {};
  for (let i = 0; i < values.length; i++) {
    const keyIdx = i + 1;
    valuesObj[`${key}${keyIdx}`] = values[i];
  }

  return valuesObj;
};

export const documentTypeToJsonDoc = (
  doc: DocumentType,
): Record<string, any> => {
  const jsonDoc: Record<string, any> = {};

  const keys = Object.keys(doc);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const values = doc[key];
    jsonDoc[key] = values.map((value) => generateValuesObj(value, key));
  }

  return jsonDoc;
};
