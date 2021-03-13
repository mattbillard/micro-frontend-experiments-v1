declare const window: any;

export const popBack = () => {
  if (window.opener && window.opener.addNewGoldenLayoutComponent) {
    window.opener.addNewGoldenLayoutComponent({
      childUrl: window.location.pathname.replace('/site-url/golden-layout/popout', ''),
    });
  }

  window.close();
};
