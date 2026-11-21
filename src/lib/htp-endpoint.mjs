/** Validate public routing configuration; the actual host and form are provisioned separately.
 * @param {string} endpoint
 */
export function validateHtpEndpoint(endpoint) {
  let url;
  try { url = new URL(endpoint); } catch { throw new Error('Invalid PUBLIC_HTP_FORM_ENDPOINT'); }
  if (endpoint !== url.href || url.protocol !== 'https:' || url.username || url.password || url.port ||
      /(^|\.)supabase\.co\.?$/i.test(url.hostname) || /[?#]/.test(endpoint) ||
      !/^\/public\/forms\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(url.pathname)) {
    throw new Error('Invalid PUBLIC_HTP_FORM_ENDPOINT');
  }
}
