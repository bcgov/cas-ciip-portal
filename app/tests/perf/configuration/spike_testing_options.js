// We have 1000 facilities

export default {
  scenarios: {
    mutations_spike: {
      vus: 3,
      iterations: 3,
      executor: 'per-vu-iterations'
    }
  }
};
