import { DocumentType } from '../document_type';
import JsonSerializer from './json_serializer';

describe('JsonSerializer', () => {
  describe('serialize()', () => {
    let doc: DocumentType;
    let serializer: JsonSerializer;

    it('returns the serialized string', () => {
      doc = {
        ProductID: [
          ['4', '8', '15'],
          ['a', 'b'],
        ],
        AddressID: [['3', '14']],
        ContactID: [['59', '26']],
      };
      serializer = new JsonSerializer();
      const jsonString = serializer.serialize(doc);

      expect(jsonString).toEqual(
        JSON.stringify({
          ProductID: [
            {
              ProductID1: '4',
              ProductID2: '8',
              ProductID3: '15',
            },
            {
              ProductID1: 'a',
              ProductID2: 'b',
            },
          ],
          AddressID: [
            {
              AddressID1: '3',
              AddressID2: '14',
            },
          ],
          ContactID: [
            {
              ContactID1: '59',
              ContactID2: '26',
            },
          ],
        }),
      );
    });
  });
});
