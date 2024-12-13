import { DocumentType } from '../document_type';
import StringSerializer from './string_serializer';

describe('StringSerializer', () => {
  describe('serialize()', () => {
    let doc: DocumentType;
    let serializer: StringSerializer;

    it('returns the serialized string', () => {
      doc = {
        ProductID: [
          ['4', '8', '15'],
          ['a', 'b'],
        ],
        AddressID: [['3', '14']],
        ContactID: [['59', '26']],
      };
      serializer = new StringSerializer({
        line_separator: '~',
        value_separator: ',',
      });
      const outputString = serializer.serialize(doc);
      expect(outputString).toEqual(
        'ProductID,4,8,15~ProductID,a,b~AddressID,3,14~ContactID,59,26~',
      );
    });
  });
});
