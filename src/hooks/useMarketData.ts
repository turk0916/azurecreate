import { useEffect } from 'react';
import { webSocketService, useWebSocketStore } from '../services/websocket';

export function useMarketData() {
  const marketData = useWebSocketStore((state) => state.marketData);

  useEffect(() => {
    webSocketService.connect();
    return () => webSocketService.disconnect();
  }, []);

  return marketData;
}