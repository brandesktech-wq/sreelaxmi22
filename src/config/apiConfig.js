/**
 * Centralized API & Data Access Configuration
 * ---------------------------------------------------------------------------
 * Isolates backend endpoint configuration so the static website operates
 * cleanly on Hostinger static hosting (`public_html`) now and can be connected
 * to an Express + MongoDB API later simply by setting `VITE_API_BASE_URL`.
 */

const rawBaseUrl =
  typeof import.meta !== 'undefined' && import.meta.env
    ? String(import.meta.env.VITE_API_BASE_URL || '').trim()
    : '';

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

export const IS_BACKEND_CONFIGURED = Boolean(API_BASE_URL);

export const API_ENDPOINTS = {
  enquiries: IS_BACKEND_CONFIGURED ? `${API_BASE_URL}/api/enquiries` : null,
  projects: IS_BACKEND_CONFIGURED ? `${API_BASE_URL}/api/projects` : null,
  blogs: IS_BACKEND_CONFIGURED ? `${API_BASE_URL}/api/blogs` : null,
};

export const BACKEND_PENDING_MESSAGE =
  'Enquiry submission will be enabled after backend and database integration. Please contact us directly via Phone or WhatsApp at +91 98498 35455 or email contact@sreelaxmidevelopers.com.';

/**
 * Isolated enquiry submission service.
 * Never fabricates a false submission-success message when no backend is connected.
 */
export async function submitEnquiryRequest(payload, customHandler = null) {
  if (typeof customHandler === 'function') {
    return customHandler(payload);
  }

  if (!IS_BACKEND_CONFIGURED || !API_ENDPOINTS.enquiries) {
    return {
      ok: false,
      backendConnected: false,
      message: BACKEND_PENDING_MESSAGE,
    };
  }

  const response = await fetch(API_ENDPOINTS.enquiries, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(BACKEND_PENDING_MESSAGE);
  }

  const data = await response.json();
  if (!response.ok || data.ok === false) {
    throw new Error(
      data.message ||
        'Unable to submit your enquiry right now. Please contact us directly via WhatsApp or email.'
    );
  }

  return {
    ok: true,
    backendConnected: true,
    message:
      data.message ||
      'Thank you. Your enquiry has been received by Sree Laxmi Developers.',
  };
}
