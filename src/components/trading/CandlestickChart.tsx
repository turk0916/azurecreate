import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { ChartConfig } from './types';

interface CandlestickChartProps {
  data: any[];
  config: ChartConfig;
  onChartReady?: (chart: IChartApi) => void;
}

function CandlestickChart({ data, config, onChartReady }: CandlestickChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const chart = createChart(container.current, {
      layout: {
        background: { 
          type: ColorType.Solid, 
          color: config.theme === 'light' ? '#ffffff' : '#131722' 
        },
        textColor: config.theme === 'light' ? '#333333' : '#d1d4dc',
      },
      width: container.current.clientWidth,
      height: config.height || 600,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        vertLines: { color: config.theme === 'light' ? '#e6e6e6' : '#232323' },
        horzLines: { color: config.theme === 'light' ? '#e6e6e6' : '#232323' },
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: config.upColor || '#26a69a',
      downColor: config.downColor || '#ef5350',
      borderVisible: false,
      wickUpColor: config.upColor || '#26a69a',
      wickDownColor: config.downColor || '#ef5350'
    });

    candlestickSeries.setData(data);
    chart.timeScale().fitContent();

    if (onChartReady) {
      onChartReady(chart);
    }

    const handleResize = () => {
      if (container.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: container.current.clientWidth
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data, config, onChartReady]);

  return <div ref={container} className="w-full h-full" />;
}

export default CandlestickChart;