
export const popBack = () => {
  if (window.opener && window.opener.addNewGoldenLayoutComponent) {
    // TODO: OpenFin blocks this due to CORS
    window.opener.addNewGoldenLayoutComponent({
      childUrl: window.location.pathname.replace('/container-url/golden-layout/popout', ''),
    });
  }

  window.close();
}
