export function generateMarketData(days: number = 200) {
  const data = [];
  let time = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  let basePrice = 100;
  const volatility = 0.1;

  for (let i = 0; i < days; i++) {
    const open = basePrice * (1 + (Math.random() - 0.5) * volatility);
    const close = basePrice * (1 + (Math.random() - 0.5) * volatility);
    const high = Math.max(open, close) * (1 + Math.random() * volatility);
    const low = Math.min(open, close) * (1 - Math.random() * volatility);
    const volume = Math.floor(Math.random() * 1000000);

    data.push({
      time: time.getTime() / 1000,
      open,
      high,
      low,
      close,
      volume
    });

    basePrice = close;
    time = new Date(time.getTime() + 24 * 60 * 60 * 1000);
  }

  return data;
}

export async function fetchMarketData(symbol: string, interval: string) {
  // In a real application, this would fetch from your API
  return generateMarketData();
}