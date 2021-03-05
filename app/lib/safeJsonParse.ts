// Function takes a string as a parameter & returns a parsed JSON object if valid JSON, {} if not valid.
// Prevents app crash on invalid querystring.
export default function safeJsonParse(toParse: string) {
  try {
    return JSON.parse(toParse);
  } catch (e) {
    return {};
  }
}
