const CURRENCY_FORMAT = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'sek',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}