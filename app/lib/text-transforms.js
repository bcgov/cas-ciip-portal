function getUserFriendlyStatusLabel(status) {
  const s = status === 'REQUESTED_CHANGES' ? 'CHANGES REQUESTED' : status;
  return `${s[0].toUpperCase()}${s.slice(1).toLowerCase()}`;
}

export {getUserFriendlyStatusLabel};
