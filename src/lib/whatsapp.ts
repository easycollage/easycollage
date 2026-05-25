export function buildWhatsAppUrl(message: string) {
  const rawNumber = (
    process.env.WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    ""
  ).replace(/\D/g, "");
  const number = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;
  const encodedMessage = encodeURIComponent(message);

  if (!number) {
    return `https://wa.me/?text=${encodedMessage}`;
  }

  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export function buildWhatsAppRedirectUrl(message: string) {
  return `/api/whatsapp?message=${encodeURIComponent(message)}`;
}
