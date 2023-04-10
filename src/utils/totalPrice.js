export const getTotalPrice = (items) => items.reduce((sum, el) => {
    return el.price * el.count + sum;
  }, 0);