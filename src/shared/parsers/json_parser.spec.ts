import JsonParser from './json_parser';

describe('JsonParser', () => {
  describe('parse()', () => {
    let inputStr: string;
    let jsonParser: JsonParser;
    describe('when input string is valid', () => {
      it('converts it to a DocumentType', () => {
        inputStr = JSON.stringify({
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
              AddressID3: '3',
              AddressID4: '14',
            },
          ],
          ContactID: [
            {
              ContactID1: '59',
              ContactID2: '26',
            },
          ],
        });
        jsonParser = new JsonParser();

        const doc = jsonParser.parse(inputStr);
        expect(JSON.stringify(doc)).toEqual(
          JSON.stringify({
            ProductID: [
              ['4', '8', '15'],
              ['a', 'b'],
            ],
            AddressID: [['3', '14']],
            ContactID: [['59', '26']],
          }),
        );
      });
    });

    describe('when input string is invalid', () => {
      it('throws an exception', () => {
        inputStr = 'This is an invalid string';
        jsonParser = new JsonParser();

        try {
          jsonParser.parse(inputStr);
        } catch (e) {
          expect(e.message).toEqual('Invalid JSON data');
        }
      });
    });
  });
});
