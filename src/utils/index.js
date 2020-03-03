export const roundOff = num => Math.round((num + Number.EPSILON) * 100) / 100;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const toMoney = num => formatter.format(num);

export const encodeAsQueryString = params =>
  Object.keys(params)
    .reduce(
      (acc, key) =>
        params.hasOwnProperty(key)
          ? [
              ...acc,
              encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
            ]
          : acc,
      []
    )
    .join('&');
