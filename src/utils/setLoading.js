const setLoading = (state, payload) => {
    state.loading[payload.name] = payload.value;
};

export default setLoading;
