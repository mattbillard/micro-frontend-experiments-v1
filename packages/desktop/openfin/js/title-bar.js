import { html, render } from '../node_modules/lit-html/lit-html.js';

class TitleBar extends HTMLElement {
  constructor() {
    super();
    this.LIGHT_THEME = 'light-theme';
    this.DARK_THEME = 'dark';

    this.render();

    fin.me.on('layout-ready', async () => {
      // Whenever a new layout is ready on this window (on init, replace, or applyPreset)
      const { settings } = await fin.Platform.Layout.getCurrentSync().getConfig();

      if (settings.hasHeaders && settings.reorderEnabled) {
        document.getElementById('lock-button').classList.remove('layout-locked');
      } else {
        document.getElementById('lock-button').classList.add('layout-locked');
      }
    });
  }

  render = async () => {
    const titleBar = html` <div class="title-bar-draggable">
        <div id="title"></div>
      </div>
      <div id="buttons-wrapper">
        <div
          class="button"
          title="Toggle Layout Lock"
          id="lock-button"
          @click=${this.toggleLockedLayout}
        ></div>
        <div
          class="button"
          title="Minimize Window"
          id="minimize-button"
          @click=${() => fin.me.minimize().catch(console.error)}
        ></div>
        <div
          class="button"
          title="Maximize Window"
          id="expand-button"
          @click=${() => this.maxOrRestore().catch(console.error)}
        ></div>
        <div
          class="button"
          title="Close Window"
          id="close-button"
          @click=${() => fin.me.close().catch(console.error)}
        ></div>
      </div>`;
    return render(titleBar, this);
  };

  maxOrRestore = async () => {
    if ((await fin.me.getState()) === 'normal') {
      return await fin.me.maximize();
    }

    return fin.me.restore();
  };

  toggleLockedLayout = async () => {
    const oldLayout = await fin.Platform.Layout.getCurrentSync().getConfig();
    const { settings, dimensions } = oldLayout;
    if (settings.hasHeaders && settings.reorderEnabled) {
      fin.Platform.Layout.getCurrentSync().replace({
        ...oldLayout,
        settings: {
          ...settings,
          hasHeaders: false,
          reorderEnabled: false,
        },
      });
    } else {
      fin.Platform.Layout.getCurrentSync().replace({
        ...oldLayout,
        settings: {
          ...settings,
          hasHeaders: true,
          reorderEnabled: true,
        },
        dimensions: {
          ...dimensions,
          headerHeight: 25,
        },
      });
    }
  };
}

customElements.define('title-bar', TitleBar);
