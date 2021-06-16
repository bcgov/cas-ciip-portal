// We have 1000 facilities.
// This scenario will start a spike of 100 VUs,
// each creating 10 applications and updating a form result
export default {
  scenarios: {
    mutations_spike: {
      vus: 2,
      iterations: 2,
      executor: 'per-vu-iterations'
    }
  }
};
