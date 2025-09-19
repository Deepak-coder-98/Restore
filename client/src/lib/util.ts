export function currencyFormat(amount: number) {
    return '₹' + (amount / 10).toFixed(2)
}

export function deliveryFees(amount: number) {
    return (amount / 10) <= 1000 ? 2000 : 0
}