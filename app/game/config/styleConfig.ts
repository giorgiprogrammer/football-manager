export const styleConfig = {
  Desktop: {
    menuScene: {
      sleectorsPercentY: 26,
    },
  },
  Mobile: {
    menuScene: {
      sleectorsPercentY: 21,
    },
  },
};

export function getStyleConfig() {
  if (window.innerWidth > 768) {
    return styleConfig.Desktop;
  } else {
    return styleConfig.Mobile;
  }
}
