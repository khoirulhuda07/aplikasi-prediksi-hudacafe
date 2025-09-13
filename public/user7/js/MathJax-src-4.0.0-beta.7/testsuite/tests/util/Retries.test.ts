import { describe, test, expect } from '@jest/globals';
import {handleRetriesFor, retryAfter} from '#js/util/Retries.js';
import {MathJax as MJX, MathJaxObject} from '#js/components/global.js';

/**
 * Add the legacy MathJax.CallBack for teting v2-style restarts
 */
type MathJaxGlobal = MathJaxObject & {
  Callback: {
    After(code: Function): void,
    mock(): Function
  }
};
const MathJax: MathJaxGlobal = Object.assign(MJX, {
  Callback: {
    After(code: Function) {
      setTimeout(code, 10);
    },
    mock() {return Object.assign(() => {}, {isCallback: true})}
  }
});

describe('handleRetriesFor() and retryAfter()', () => {

  test('handleRetriesFor() then/catch getting called', () => {
    expect(handleRetriesFor(() => 'success')).resolves.toBe('success');
    expect(handleRetriesFor(() => {throw Error('failed')})).rejects.toThrow('failed');
  });

  test('handleRetriesFor().then called after 3 retries', () => {
    let n = 0;
    expect(
      handleRetriesFor(() => {
        if (++n < 3) {
          let p = new Promise<void>((ok, _fail) => {
            setTimeout(() => ok(), 10);
          });
          retryAfter(p);
        }
        return 'success';
      }).then((result: string) => {
        expect(result).toBe('success');
        expect(n).toBe(3);
      })
    )
  });

  test('handleRetriesFor().catch called for fail on 3rd retry', () => {
    let n = 0;
    expect(
      handleRetriesFor(() => {
        if (++n < 3) {
          let p = new Promise<void>((ok, fail) => {
            setTimeout(() => n < 2 ? ok() : fail('fail'), 10);
          });
          retryAfter(p);
        }
        return 'success';
      }).catch((result: string) => {
        expect(result).toBe('fail');
        expect(n).toBe(2);
      })
    )
  });

  test('handleRetriesFor().catch called for error on 3rd retry', () => {
    let n = 0;
    expect(
      handleRetriesFor(() => {
        if (++n < 3) {
          let p = new Promise<void>((ok, _fail) => {
            setTimeout(() => ok(), 10);
          });
          retryAfter(p);
        }
        throw Error('fail');
      }).catch((err: Error) => {
        expect(err.message).toBe('fail');
        expect(n).toBe(3);
      })
    )
  });

  test('v2 retry', () => {
    let n = 0;
    expect(handleRetriesFor(() => {
        if (++n < 3) {
          throw Object.assign(new Error('restart'), {
            restart: MathJax.Callback.mock()  // mark this error as a v2 restart
          });
        }
        return 'success';
      }).then((result: string) => {
        expect(result).toBe('success');
        expect(n).toBe(3);
      })
    )
  });

});
