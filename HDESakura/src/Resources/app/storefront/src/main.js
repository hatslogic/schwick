window.PluginManager.register(
    'WishlistStickyCounterSync',
    () => import('./plugin/wishlist-sticky-counter-sync.plugin'),
    '[data-wishlist-sticky-counter]'
);

document.addEventListener('DOMContentLoaded', () => {

    let productBoxQuantityBox = document.querySelectorAll('.quantity-select-container');

    productBoxQuantityBox.forEach(box => {
        const minusBtn = box.querySelector('.buy_quantity_minus');
        const plusButton = box.querySelector('.buy_quantity_plus');
        const input = box.querySelector('.product-detail-quantity-select');

        minusBtn.addEventListener('click', event => {
            console.log('minus button clicked');
            if (minusBtn) {
                if (input && Number(input.value) > 0) {
                    input.value = Number(input.value) - 1;
                }
            }
        });

        plusButton.addEventListener('click', event => {
            console.log('plus button clicked');
            if (plusButton) {
                if (input && Number(input.value) >= 0) {
                    input.value = Number(input.value) + 1;
                }
            }
        });

    });

    console.log("hello from main.js");

    // Logic for 2 types of registration
    if (
        window.location.href.includes('account/login') ||
        window.location.href.includes('checkout/register') ||
        window.location.href.includes('account/register')
    ) {
        document.querySelectorAll('.register-guest-control').forEach(el => {
            el.style.display = 'none';
        });

        changeRegistrationType();
        console.log('registration type logic executed');
    }

    // Show text on top of form
    if (window.location.href.includes('checkout/register')) {
        document.querySelectorAll('.hde-registration-smallbusiness').forEach(el => {
            el.style.display = 'block';
        });
    }

    // Hide empty tech info blocks
    document.querySelectorAll('.hde-tech-info-add-list').forEach(el => {
        if (!el.innerHTML.trim()) {
            const parent = el.parentElement?.parentElement?.parentElement;

            if (parent) {
                parent.style.display = 'none';
            }
        }
    });
});





function changeRegistrationType() {
     console.log('registration type logic started');
    let group = getUrlParameter('group');

    if (window.location.href.includes('checkout/register')) {
        group = 'smallbusiness';
    }

    const smallbusinessGroupID = '28df66ad5b754d62be2ba02d5115decf';
    const distributorGroupID = '91e80d36381c4b6796eb685c719abe46';
    const germanySelectID = 'edcd2f8760d74eaa9b864a1ced422262';

    const accountType = getAccountTypeSelect();
    const changeEvent = new Event('change');

    const billingCountry = document.getElementById('billingAddressAddressCountry');
    const shippingCountry = document.getElementById('shippingAddressAddressCountry');

    const originalSelectOptions = Array.from(
        document.querySelectorAll('#billingAddressAddressCountry option')
    )
        .map(option => option.outerHTML)
        .join('');

    const germanyOption =
        document.querySelector(
            `#billingAddressAddressCountry option[value="${germanySelectID}"]`
        )?.outerHTML || '';

    const placeholderOption =
        document.querySelector(
            "#billingAddressAddressCountry option[disabled='disabled']"
        )?.outerHTML || '';

    const smallBusinessOptions = placeholderOption + germanyOption;

    if (group === 'smallbusiness') {
        document.querySelectorAll('.register-card').forEach(el => {
            el.style.display = 'block';
            if (el.parentElement) {
                el.parentElement.style.display = 'block';
            }
        });

        document.querySelectorAll('.hde-registration-smallbusiness').forEach(el => {
            el.style.display = 'block';
        });

        document.querySelectorAll('.hde-registration-distributor').forEach(el => {
            el.style.display = 'none';
        });

        const option = accountType?.querySelector(
            `option[value="${smallbusinessGroupID}"]`
        );

        if (option) {
            option.selected = true;
        }

        accountType?.dispatchEvent(changeEvent);

        document.querySelectorAll('.login-card').forEach(el => {
            if (el.parentElement) {
                el.parentElement.style.display = 'none';
            }
        });

        if (billingCountry) {
            billingCountry.innerHTML = smallBusinessOptions;
        }

        if (shippingCountry) {
            shippingCountry.innerHTML = smallBusinessOptions;
        }
    } else if (group === 'distributor') {
        document.querySelectorAll('.register-card').forEach(el => {
            el.style.display = 'block';
            if (el.parentElement) {
                el.parentElement.style.display = 'block';
            }
        });

        document.querySelectorAll('.hde-registration-smallbusiness').forEach(el => {
            el.style.display = 'none';
        });

        document.querySelectorAll('.hde-registration-distributor').forEach(el => {
            el.style.display = 'block';
        });

        const option = accountType?.querySelector(
            `option[value="${distributorGroupID}"]`
        );

        if (option) {
            option.selected = true;
        }

        accountType?.dispatchEvent(changeEvent);

        const companyLabel = document.querySelector(
            'label[for="billingAddresscompany"]'
        );

        if (companyLabel && !companyLabel.querySelector('span')) {
            companyLabel.insertAdjacentHTML('beforeend', '<span>*</span>');
        }

        document.getElementById('billingAddresscompany')?.setAttribute(
            'required',
            ''
        );

        document.querySelectorAll('.login-card').forEach(el => {
            if (el.parentElement) {
                el.parentElement.style.display = 'none';
            }
        });
    } else {
        document.querySelectorAll('.login-card').forEach(el => {
            el.style.display = 'block';
        });

        if (window.location.href.includes('checkout/register')) {
            document.querySelectorAll('.register-card').forEach(el => {
                el.style.display = 'block';
                if (el.parentElement) {
                    el.parentElement.style.display = 'block';
                }
            });
        }
    }

    accountType?.addEventListener('change', function () {
        if (this.value === smallbusinessGroupID) {
            document.querySelectorAll('.hde-registration-smallbusiness').forEach(el => {
                el.style.display = 'block';
            });

            document.querySelectorAll('.hde-registration-distributor').forEach(el => {
                el.style.display = 'none';
            });

            if (billingCountry) {
                billingCountry.innerHTML = smallBusinessOptions;
            }

            if (shippingCountry) {
                shippingCountry.innerHTML = smallBusinessOptions;
            }

            const companyField = document.getElementById('billingAddresscompany');

            if (companyField) {
                companyField.required = false;
            }
        } else {
            document.querySelectorAll('.hde-registration-smallbusiness').forEach(el => {
                el.style.display = 'none';
            });

            document.querySelectorAll('.hde-registration-distributor').forEach(el => {
                el.style.display = 'block';
            });

            if (billingCountry) {
                billingCountry.innerHTML = originalSelectOptions;
            }

            if (shippingCountry) {
                shippingCountry.innerHTML = originalSelectOptions;
            }

            const companyLabel = document.querySelector(
                'label[for="billingAddresscompany"]'
            );

            if (companyLabel && !companyLabel.querySelector('span')) {
                companyLabel.insertAdjacentHTML('beforeend', '<span>*</span>');
            }

            const companyField = document.getElementById('billingAddresscompany');

            if (companyField) {
                companyField.required = true;
            }
        }
    });
}

function setVatIdRequired() {
    const vatInput = document.getElementById('vatIds');

    if (!vatInput) {
        return;
    }

    vatInput.required = true;

    const label = document.querySelector('label[for="vatIds"]');

    if (label && !label.querySelector('.required-mark')) {
        label.insertAdjacentHTML(
            'beforeend',
            '<span class="required-mark">*</span>'
        );
    }

    const submitBtn = document.querySelector('button[type="submit"]');

    vatInput.addEventListener('keyup', function () {
        const value = this.value;

        let alertMsg = '';

        if (!value.includes('DE')) {
            alertMsg = `
                <span style="color:red;">
                    Bitte gib eine gültige deutsche VAT ein.
                    Wenn dein Unternehmen nicht in Deutschland ansässig ist,
                    benutze bitte das
                    <a href="/Registrierungsformular-Grosskundenregistrierung">
                        Großkundenregistrierung Formular
                    </a>
                </span>
            `;

            submitBtn?.setAttribute('disabled', '');
        } else {
            submitBtn?.removeAttribute('disabled');
        }

        label?.querySelector('.alert-msg')?.remove();

        if (label) {
            label.insertAdjacentHTML(
                'beforeend',
                `<span class="alert-msg">${alertMsg}</span>`
            );
        }
    });
}

function removeRequired() {
    const label = document.querySelector(
        "label[for='billingAddresscompany']"
    );

    if (label) {
        label.textContent = label.textContent.replace('*', '');
    }

    document
        .querySelector('input#billingAddresscompany')
        ?.removeAttribute('required');
}

function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);

    return params.get(name) || false;
}

function getAccountTypeSelect() {
    return document.querySelector('#-accountType')
        || document.querySelector('#accountType')
        || document.querySelector('select[name="accountType"]');
}