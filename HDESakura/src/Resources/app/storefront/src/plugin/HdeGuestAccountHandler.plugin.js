import Plugin from 'src/plugin-system/plugin.class';

export default class HdeGuestAccountHandlerPlugin extends Plugin {
    // Unfortunately npm is not available in the server - i had to put it on storefront/component/account/register.html.twig
    init() {
        const guestAccountCheckbox = document.getElementById("personalGuest");
        if (!guestAccountCheckbox) {
            return;
        }

        // guestAccountCheckbox.click();
        guestAccountCheckbox.checked = true;
        const changeEvent = new Event("change");
        guestAccountCheckbox.dispatchEvent(changeEvent);
    }
}