export const roundOff = num => Math.round((num + Number.EPSILON) * 100) / 100;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const toMoney = num => formatter.format(num);