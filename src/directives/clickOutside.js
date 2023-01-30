const clickOutside = {
  mounted: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        if (binding?.value) {
          binding.value();
        }
      }
    };

    setTimeout(() => {
      document.addEventListener('click', el.clickOutsideEvent);
    }, 100);
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};

export default clickOutside;
