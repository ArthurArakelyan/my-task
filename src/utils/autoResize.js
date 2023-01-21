const autoResize = (element) => {
  element.style.cssText = 'height:auto';
  element.style.cssText = `height: ${element.scrollHeight}px; max-height: unset`;
};

export default autoResize;
