export default class WishlistStickyCounterSyncPlugin extends window.PluginBaseClass {
    static options = {
        primaryStorageSelector: '.header-main [data-wishlist-storage]',
    };

    init() {
        this._primaryStorage = this._getPrimaryWishlistStorage();

        if (!this._primaryStorage) {
            return;
        }

        this._renderCounter();
        this._registerEvents();
    }

    _getPrimaryWishlistStorage() {
        const primaryBasket = document.querySelector(this.options.primaryStorageSelector);

        if (!primaryBasket) {
            return null;
        }

        return window.PluginManager.getPluginInstanceFromElement(primaryBasket, 'WishlistStorage');
    }

    _renderCounter() {
        const counter = this._primaryStorage.getCurrentCounter() || '';
        this.el.textContent = counter;
    }

    _registerEvents() {
        const events = [
            'Wishlist/onProductsLoaded',
            'Wishlist/onProductAdded',
            'Wishlist/onProductRemoved',
        ];

        events.forEach((eventName) => {
            this._primaryStorage.$emitter.subscribe(eventName, () => {
                this._renderCounter();
            });
        });
    }
}
