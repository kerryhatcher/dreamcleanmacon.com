type InquiryEvent = 'generate_lead' | 'phone_click';
type EventProperties = Record<string, string>;

declare global {
  interface Window {
    zaraz?: { track: (event: string, properties: EventProperties) => unknown };
  }
}

const services: Record<string, string> = {
  '/': 'property_cleaning',
  '/housekeeping/': 'housekeeping',
  '/move-in-move-out-cleaning/': 'move_in_move_out',
};

export function trackInquiry(event: InquiryEvent, properties: EventProperties = {}) {
  // Preview and localhost interactions must never become production leads.
  if (window.location.hostname !== 'www.dreamcleanmacon.com') return;
  const pagePath = window.location.pathname;
  const service = services[pagePath];
  if (!service) return;

  try {
    // Never include form values, query strings, or free-form link text.
    const result = window.zaraz?.track(event, {
      page_path: pagePath,
      service_type: service,
      ...properties,
    });
    // Analytics failures must not interrupt an accepted quote or a phone link.
    void Promise.resolve(result).catch(() => {});
  } catch {
    // Zaraz can be unavailable or blocked; contact methods still work.
  }
}

document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>('a[href^="tel:"]');
  if (!link || event.defaultPrevented) return;
  const location = link.closest('header') ? 'header'
    : link.closest('footer') ? 'footer'
    : link.closest('#quote') ? 'quote'
    : 'content';
  trackInquiry('phone_click', { link_location: location });
});
