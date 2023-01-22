// Constants
import { mediaStrings } from '@/constants';

const initializeDeviceTypes = () => {
  return {
    isMobile: window.matchMedia(mediaStrings.mobile).matches,
    isTablet: window.matchMedia(mediaStrings.tablet).matches,
    isSmallDesktop: window.matchMedia(mediaStrings.smallDesktop).matches,
    isDesktop: window.matchMedia(mediaStrings.desktop).matches,
  };
};

export default initializeDeviceTypes;
