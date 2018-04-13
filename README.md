# jest-vs-mocha
Small repo to test the differences between jest and mocha on a node app

### TL;DR Comparisons
jest
- pros
    - one library opposed to 4
    - easier to read syntax
    - all mocks act as spies and stubs
    - only code covers src files (by default)
- cons
    - much slower

mocha
- pros
    - very fast
- cons
    - 4 libraries to update and keep in sync
    - clunky syntax
    - stubs / spies / mocks
    - code covers actual test files (by default)

### Expectations Syntax
<pre>
jest
- expect().toBe();          // this will compare primitives such as strings and numbers
- expect().toEqual();       // this compares objects such as {} or []

mocha
- expect().to.equal();      // this will compare primitives such as strings and numbers
- expect().to.deep.equal(); // this compares objects such as {} or []
</pre>

### Mocking Syntax
<pre>
jest
- axios
  .get
  .mockResolvedValue({ status: 200 });
- expect(axios.get).toBeCalledWith(`yoursite.com/user/${id}?activities=programming`);

mocha
- const getMock = sandbox
  .mock(axios)
  .expects('get')
  .withArgs(`yoursite.com/user/${id}?activities=programming`)
  .returns(Promise.resolve({ status: 200 }));

- getMock.verify();
</pre>

### Executing tests
<pre>
jest
- $ jest ./src/*.test.*

mocha
- $ mocha ./src/*.spec.*
</pre>

### Watching Files for change
Both of these are equal as you just need a `--watch` at the end of your npm script

### Code coverage
<pre>
jest
- Add the `--coverage` flag at the end of your npm script
- $ jest ./src/*.test.* --coverage

mocha + istanbul
- Run Istanbul AND mocha
- $ node node_modules/.bin/istanbul cover node_modules/.bin/_mocha -- ./src/*.spec.*

Interesting note
- By default, this command will include the actual test files in the overall code coverage scan
</pre>

### Run time for a single run
<pre>
This is only a time test on the 9 tests in this repo.  YMMV

jest
- The tests run on average ~825ms

mocha
- The test run on average ~18ms 
</pre>

### Run time for a tests being watched
<pre>
This is only a time test on the 9 tests in this repo.  YMMV

jest
- The tests run on average ~200ms

mocha
- The test run on average ~6ms 
</pre>

### Opinion
A major win for jest is that it wraps everything you need into one library.  With mocha, you have 4 different libraries being updated and to maintain.  Jest also allows you to mock one object with multiple properties.  With mocha, you have to create a separate stub/mock for each property.  

