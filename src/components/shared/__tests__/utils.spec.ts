import { getOption } from '../utils';

describe('getOption', () => {
  const option1 = {
    option: 'option1',
    label: 'label1',
  };
  const option2 = {
    option: 'option2',
    label: 'label2',
  };
  const options = [option1, option2];

  it('returns option based on option value', () => {
    const actual = getOption('option1')(options);
    const expected = option1;
    expect(actual).toEqual(expected);
  });

  it('returns undefined if not found', () => {
    const actual = getOption('option3')(options);
    const expected = undefined;
    expect(actual).toEqual(expected);
  });
});
