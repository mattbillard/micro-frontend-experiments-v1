
export const popBack = () => {
  if (window.opener) {
    // TODO: OpenFin blocks this due to CORS
    window.opener.addNewGoldenLayoutComponent({
      childUrl: window.location.pathname.replace('/container-url/golden-layout/popout', ''),
    });
  }

  window.close();
}
