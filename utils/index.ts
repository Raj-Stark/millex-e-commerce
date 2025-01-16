export function getWhatsappLink(
  phoneNumber: string,
  searchParams?: {
    text: string;
  },
) {
  const url = new URL(`https://wa.me/${phoneNumber}`);
  if (searchParams?.text) {
    url.searchParams.append("text", searchParams.text);
  }
  return url.toString();
}

export function truncateTextWithEllipsis(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}
