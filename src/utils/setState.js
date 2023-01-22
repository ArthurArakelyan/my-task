const setState = (state, payload) => {
  for (const key in state) {
    state[key] = payload[key];
  }
};

export default setState;
