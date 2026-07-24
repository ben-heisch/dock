// Cloudflare Pages Function — first-party click "pixel".
// Answers any /px/... request (e.g. /px/whatsapp/hero) with 204 No Content.
// The request itself is what counts: it appears in the Cloudflare dashboard
// under Analytics → HTTP Traffic, filterable by path "/px/".
// No cookies, no third party, no consent banner needed.
export function onRequest() {
  return new Response(null, {
    status: 204,
    headers: {
      "cache-control": "no-store",
      "access-control-allow-origin": "*"
    }
  });
}
