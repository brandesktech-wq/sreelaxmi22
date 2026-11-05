import React from 'react';
import './FloatingWhatsApp.css';

export const WHATSAPP_NUMBER = '919849835455';
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello Sree Laxmi Developers, I would like to know more about your projects.';

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE
)}`;

export default function FloatingWhatsApp({
  phoneNumber = WHATSAPP_NUMBER,
  message = WHATSAPP_DEFAULT_MESSAGE,
  tooltipText = 'Chat With Us',
} = {}) {
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="sld-floating-whatsapp">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="sld-floating-whatsapp__btn"
        aria-label="Chat with Sree Laxmi Developers on WhatsApp"
      >
        <span className="sld-floating-whatsapp__pulse" aria-hidden="true" />
        <span className="sld-floating-whatsapp__tooltip" aria-hidden="true">
          {tooltipText}
        </span>
        <svg
          className="sld-floating-whatsapp__icon"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M16.004 3.2c-7.068 0-12.8 5.731-12.8 12.8 0 2.257.59 4.46 1.71 6.404L3.1 28.8l6.565-1.722a12.742 12.742 0 0 0 6.335 1.682h.005c7.067 0 12.795-5.731 12.795-12.8 0-3.42-1.331-6.636-3.749-9.054A12.716 12.716 0 0 0 16.004 3.2Zm0 23.404h-.004a10.614 10.614 0 0 1-5.411-1.482l-.388-.23-3.896 1.022 1.04-3.798-.253-.402a10.606 10.606 0 0 1-1.632-5.654c0-5.869 4.775-10.644 10.648-10.644 2.843 0 5.516 1.108 7.526 3.12a10.577 10.577 0 0 1 3.116 7.528c0 5.87-4.775 10.64-10.746 10.54Zm5.84-7.968c-.32-.16-1.894-.935-2.188-1.042-.293-.107-.507-.16-.72.16-.214.32-.828 1.042-1.014 1.256-.187.213-.374.24-.694.08-.32-.16-1.352-.498-2.575-1.589-.952-.849-1.594-1.898-1.781-2.218-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.214-.32.32-.534.107-.213.054-.4-.026-.56-.08-.16-.72-1.736-.988-2.377-.26-.624-.524-.539-.72-.549-.186-.009-.4-.011-.614-.011-.213 0-.56.08-.854.4-.293.32-1.12 1.095-1.12 2.67 0 1.575 1.147 3.097 1.307 3.311.16.213 2.257 3.446 5.468 4.832.764.33 1.36.527 1.825.674.766.244 1.464.209 2.016.127.615-.092 1.894-.774 2.161-1.522.267-.748.267-1.389.187-1.522-.08-.134-.293-.214-.614-.374Z" />
        </svg>
      </a>
    </div>
  );
}
