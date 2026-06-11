export default class DvaccessPositionOverridePlugin extends window.PluginBaseClass {
    static options = {
        left: '20px',
        bottom: '24px',
        maxAttempts: 50,
        retryDelayMs: 200,
    };

    init() {
        this._attempt = 0;
        this._tryApply();
    }

    _tryApply() {
        if (this._injectStyles()) {
            return;
        }

        this._attempt += 1;

        if (this._attempt >= this.options.maxAttempts) {
            return;
        }

        window.setTimeout(() => this._tryApply(), this.options.retryDelayMs);
    }

    _injectStyles() {
        const host = document.querySelector('.dvaccess-shadow-root');

        if (!host?.shadowRoot) {
            return false;
        }

        const styleId = 'hde-dvaccess-position-override';

        if (!host.shadowRoot.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .dvaccess .dvaccess-toggle {
                    left: ${this.options.left} !important;
                    right: auto !important;
                    bottom: ${this.options.bottom} !important;
                    top: auto !important;
                    transform: none !important;
                }
            `;
            host.shadowRoot.appendChild(style);
        }

        const widget = host.shadowRoot.querySelector('.dvaccess');

        if (!widget) {
            return false;
        }

        widget.classList.forEach((className) => {
            if (className.startsWith('dvaccess-pos-')) {
                widget.classList.remove(className);
            }
        });
        widget.classList.add('dvaccess-pos-lb');

        return true;
    }
}
