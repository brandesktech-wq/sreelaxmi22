/**
 * Centralized Brochure Enquiry Validation, Submission & Download Service
 *
 * Keeps form validation, future backend API lead capture, and PDF brochure
 * download logic cleanly separated.
 */

const INDIAN_MOBILE_REGEX = /^(?:\+91[\s-]?|91[\s-]?|0)?([6-9]\d{9})$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Normalizes an Indian phone number input and checks if it is a valid
 * 10-digit Indian mobile number (with optional +91 country code).
 */
export function validateIndianPhone(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') {
    return { valid: false, normalized: '' };
  }
  const compact = rawPhone.trim().replace(/[\s()-]/g, '');
  const match = compact.match(INDIAN_MOBILE_REGEX);
  if (!match) {
    return { valid: false, normalized: '' };
  }
  return {
    valid: true,
    normalized: `+91 ${match[1]}`,
  };
}

/**
 * Pure validation function for the Brochure Enquiry Form.
 * Kept separate from download and submission logic.
 */
export function validateBrochureEnquiry(values) {
  const errors = {};
  const fullName =
    typeof values?.fullName === 'string' ? values.fullName.trim() : '';
  const phone = typeof values?.phone === 'string' ? values.phone.trim() : '';
  const email = typeof values?.email === 'string' ? values.email.trim() : '';

  if (!fullName) {
    errors.fullName = 'Please enter your full name.';
  } else if (fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  if (!phone) {
    errors.phone = 'Please enter your phone number.';
  } else {
    const phoneCheck = validateIndianPhone(phone);
    if (!phoneCheck.valid) {
      errors.phone =
        'Please enter a valid 10-digit Indian mobile number (optional +91).';
    }
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Centralized brochure enquiry submission handler.
 *
 * Future Backend Integration Point:
 * - Set `VITE_BROCHURE_LEAD_API_URL` in environment configuration when a backend
 *   endpoint is connected to persist lead details in a database.
 * - When no backend endpoint is configured (current static frontend mode),
 *   completes client-side validation transparently without pretending the lead
 *   was stored on a server or saving personal data in localStorage/URLs.
 */
export async function submitBrochureEnquiry({
  projectId,
  projectName,
  fullName,
  phone,
  email,
}) {
  const configuredEndpoint =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    typeof import.meta.env.VITE_BROCHURE_LEAD_API_URL === 'string'
      ? import.meta.env.VITE_BROCHURE_LEAD_API_URL.trim()
      : '';

  const phoneCheck = validateIndianPhone(phone);
  const sanitizedPayload = {
    projectId: projectId || '',
    projectName: projectName || '',
    fullName: fullName.trim(),
    phone: phoneCheck.normalized || phone.trim(),
    email: email.trim(),
  };

  if (configuredEndpoint) {
    const response = await fetch(configuredEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedPayload),
    });

    if (!response.ok) {
      throw new Error(
        'Unable to process your request at the moment. Please try again.'
      );
    }

    return {
      ok: true,
      mode: 'backend',
      message: 'Thank you! Your brochure download has started.',
      integrationNote: '',
    };
  }

  // Temporary frontend-only mode (no backend connected yet):
  // Do not store personal details in localStorage or expose them in the URL.
  return {
    ok: true,
    mode: 'frontend-only',
    message: 'Thank you! Your brochure download has started.',
    integrationNote: 'Lead recording will be enabled after backend integration.',
  };
}

/**
 * Checks whether an ArrayBuffer begins with the standard PDF magic signature `%PDF-`.
 */
function hasValidPdfSignature(buffer) {
  if (!buffer || buffer.byteLength < 5) {
    return false;
  }
  const bytes = new Uint8Array(buffer, 0, 5);
  // '%PDF-' in ASCII: 0x25, 0x50, 0x44, 0x46, 0x2D
  return (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  );
}

/**
 * Builds ordered candidate URLs for the project's brochure PDF so that both
 * GitHub Pages (`/sreelaxmi22/brochures/...`) and root-domain hosts like
 * Hostinger (`/brochures/...`) resolve to the actual PDF binary.
 */
export function buildCandidateBrochureUrls(brochureUrl) {
  if (!brochureUrl || typeof brochureUrl !== 'string') {
    return [];
  }

  const trimmed = brochureUrl.trim();
  if (!trimmed) {
    return [];
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return [trimmed];
  }

  const rawBase =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    typeof import.meta.env.BASE_URL === 'string'
      ? import.meta.env.BASE_URL
      : '/sreelaxmi22/';

  const normalizedBase =
    rawBase && rawBase !== '/' && rawBase !== './'
      ? `/${rawBase.replace(/^\/+|\/+$/g, '')}/`
      : '/';

  // Strip any leading `/sreelaxmi22/` or `/` to get the clean relative path (e.g. `brochures/sree-laxmi-gardenia-brochure.pdf`)
  let relativePath = trimmed.replace(/^\.?\//, '');
  if (
    normalizedBase !== '/' &&
    trimmed.startsWith(normalizedBase)
  ) {
    relativePath = trimmed.slice(normalizedBase.length).replace(/^\/+/, '');
  }

  const fileNameOnly = relativePath.split('/').filter(Boolean).pop() || '';

  const candidates = [
    `${normalizedBase}${relativePath}`,
    `/${relativePath}`,
  ];

  if (fileNameOnly) {
    candidates.push(
      `${normalizedBase}brochures/${fileNameOnly}`,
      `/brochures/${fileNameOnly}`,
      `${normalizedBase}assets/brochures/${fileNameOnly}`,
      `/assets/brochures/${fileNameOnly}`
    );
  }

  return Array.from(new Set(candidates));
}

/**
 * Initiates the browser download of the project's actual PDF brochure.
 *
 * Verifies HTTP 200 status, rejects HTML/JSON fallback responses, and checks
 * the `%PDF-` binary signature before creating a `Blob` URL and triggering a
 * single anchor download.
 */
export async function triggerBrochureDownload(brochureUrl, brochureFileName) {
  const candidates = buildCandidateBrochureUrls(brochureUrl);
  if (candidates.length === 0) {
    return false;
  }

  const fallbackName =
    candidates[0].split('/').filter(Boolean).pop() || 'Project-Brochure.pdf';
  const downloadName =
    brochureFileName &&
    typeof brochureFileName === 'string' &&
    brochureFileName.trim()
      ? brochureFileName.trim()
      : fallbackName;

  for (const candidateUrl of candidates) {
    try {
      const response = await fetch(candidateUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
        },
      });

      if (!response.ok) {
        continue;
      }

      const contentType = (
        response.headers.get('content-type') || ''
      ).toLowerCase();

      // Never allow an HTML error/SPA fallback page or JSON payload to be saved as a .pdf
      if (
        contentType.includes('text/html') ||
        contentType.includes('application/json')
      ) {
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      if (!hasValidPdfSignature(arrayBuffer)) {
        continue;
      }

      const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(pdfBlob);

      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.setAttribute('download', downloadName);
      anchor.rel = 'noopener noreferrer';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      // Revoke the Blob URL only after the download has been initiated
      window.setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 60000);

      return true;
    } catch {
      // Try next candidate path if network fetch fails
    }
  }

  return false;
}
