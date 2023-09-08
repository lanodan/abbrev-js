const abbrev = require('abbrev')
const t = require('node:test')
const assert = require('assert');
const util = require('util')

function test (list, expect) {
  t.test(() => {
    let actual = abbrev(list);
    assert.deepStrictEqual(actual, expect);

    actual = abbrev(...list);
    assert.deepStrictEqual(actual, expect);
  });
}

test(['ruby', 'ruby', 'rules', 'rules', 'rules'],
  { rub: 'ruby',
    ruby: 'ruby',
    rul: 'rules',
    rule: 'rules',
    rules: 'rules',
  })
test(['fool', 'foom', 'pool', { toString: () => 'pope' }],
  { fool: 'fool',
    foom: 'foom',
    poo: 'pool',
    pool: 'pool',
    pop: 'pope',
    pope: 'pope',
  })
test(['a', 'ab', 'abc', 'abcd', 'abcde', 'acde'],
  { a: 'a',
    ab: 'ab',
    abc: 'abc',
    abcd: 'abcd',
    abcde: 'abcde',
    ac: 'acde',
    acd: 'acde',
    acde: 'acde',
  })
test(['a', 'ab', 'abc', 'abcd', 'abcde', 'acde'].reverse(),
  { a: 'a',
    ab: 'ab',
    abc: 'abc',
    abcd: 'abcd',
    abcde: 'abcde',
    ac: 'acde',
    acd: 'acde',
    acde: 'acde',
  })

t.test(() => assert(![].abbrev))
t.test(() => assert(!{}.abbrev))
