import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { validateHtpEndpoint } from '../src/lib/htp-endpoint.mjs';

const valid = 'https://htp.example.invalid/public/forms/11111111-1111-4111-8111-111111111111';
test('accepts the public HTP API route', () => {
  assert.doesNotThrow(() => validateHtpEndpoint(valid));
  assert.doesNotThrow(() => validateHtpEndpoint(valid.replace('htp.example.invalid', 'htp-api-kerry-hatcher.fly.dev')));
});
test('rejects direct receivers and malformed or non-exact routes', () => {
  for (const value of [
    'https://pilot-test.supabase.co/functions/v1/form-submit?form=11111111-1111-4111-8111-111111111111',
    valid.replace('htp.example.invalid', 'pilot-test.supabase.co'),
    valid.replace('https:', 'http:'), valid.replace('htp.example.invalid', 'user@htp.example.invalid'),
    valid.replace('htp.example.invalid', 'htp.example.invalid:444'),
    valid.replace('/public/forms/', '/other/../public/forms/'), valid + '?', valid + '?form=other', valid + '#', valid + '/', valid + '/extra',
    valid.replace('/public/forms/', '/functions/v1/form-submit/'),
    valid.replace('11111111-1111-4111-8111-111111111111', 'not-a-uuid'),
    ` ${valid}`, 'not a URL',
  ]) assert.throws(() => validateHtpEndpoint(value), /Invalid PUBLIC_HTP_FORM_ENDPOINT/, value);
});
