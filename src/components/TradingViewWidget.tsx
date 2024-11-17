import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  width?: string | number;
  height?: string | number;
  interval?: string;
}

function TradingViewWidget({
  symbol = 'BIST:XU100',
  theme = 'light',
  width = '100%',
  height = '600',
  interval = 'D'
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (container.current && window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: interval,
          timezone: 'Europe/Istanbul',
          theme: theme,
          style: '1',
          locale: 'tr',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id,
          hide_side_toolbar: false,
          studies: [
            'MASimple@tv-basicstudies',
            'RSI@tv-basicstudies',
            'MACD@tv-basicstudies'
          ],
          width: width,
          height: height,
          save_image: true,
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650'
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, theme, width, height, interval]);

  return (
    <div className="tradingview-widget-container" style={{ height }}>
      <div id="tradingview_widget" ref={container} style={{ height: '100%' }} />
    </div>
  );
}

export default TradingViewWidget;