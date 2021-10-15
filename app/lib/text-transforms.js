function capitalize(input) {
  if (typeof input !== "string" && !Number.isFinite(input)) return "";
  const str = `${input}`;
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

function getUserFriendlyStatusLabel(status) {
  const s = status === "REQUESTED_CHANGES" ? "CHANGES REQUESTED" : status;
  return `${capitalize(s).replace(/_/g, " ")}`;
}

export { getUserFriendlyStatusLabel, capitalize };
