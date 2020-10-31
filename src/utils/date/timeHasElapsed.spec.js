const timeHasElapsed = require('./timeHasElapsed');

// Sample data
const _sampleOldTimestamp = '2010-03-04 11:32:26';
const _sampleNewTimestamp = '2910-03-04 11:32:26';

//
test('Should return true if an old timestamp is provided', () => {
    expect(timeHasElapsed(_sampleOldTimestamp)).toBe(true);
});

//
test('Should return false if a new timestamp is provided', () => {
    expect(timeHasElapsed(_sampleNewTimestamp)).toBe(false);
});