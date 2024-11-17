import { create } from 'zustand';

interface MarketData {
  price: string;
  change24h: string;
  volume: string;
}

interface WebSocketState {
  marketData: Record<string, MarketData>;
  isConnected: boolean;
  error: string | null;
}

export const useWebSocketStore = create<WebSocketState>(() => ({
  marketData: {},
  isConnected: false,
  error: null
}));

class WebSocketService {
  private mockData = {
    'THYAO': { price: '246.80', change24h: '+4.52', volume: '125.4M' },
    'GARAN': { price: '92.45', change24h: '+3.21', volume: '89.2M' },
    'EREGL': { price: '45.62', change24h: '-2.15', volume: '56.8M' },
    'ASELS': { price: '79.35', change24h: '+2.84', volume: '42.1M' },
    'KCHOL': { price: '122.50', change24h: '+1.75', volume: '78.3M' }
  };

  connect() {
    useWebSocketStore.setState({ isConnected: true, error: null });

    const marketData: Record<string, MarketData> = {};
    Object.entries(this.mockData).forEach(([symbol, data]) => {
      marketData[symbol] = {
        price: data.price,
        change24h: data.change24h,
        volume: data.volume
      };
    });

    useWebSocketStore.setState({ marketData });

    setInterval(() => {
      const updatedData: Record<string, MarketData> = {};
      Object.entries(this.mockData).forEach(([symbol, data]) => {
        const randomChange = (Math.random() * 2 - 1).toFixed(2);
        const currentPrice = parseFloat(data.price);
        const newPrice = (currentPrice * (1 + parseFloat(randomChange) / 100)).toFixed(2);
        
        updatedData[symbol] = {
          price: newPrice,
          change24h: randomChange.startsWith('-') ? randomChange : `+${randomChange}`,
          volume: data.volume
        };
      });

      useWebSocketStore.setState({ marketData: updatedData });
    }, 5000);
  }

  disconnect() {
    useWebSocketStore.setState({ isConnected: false });
  }
}

export const webSocketService = new WebSocketService();