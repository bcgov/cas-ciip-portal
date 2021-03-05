export default function safeJsonParse(toParse: string) {
  try {
    return JSON.parse(toParse);
  } catch (e) {
    return {};
  }
}
