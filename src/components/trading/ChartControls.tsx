import React from 'react';
import { Calendar, Clock, Settings } from 'lucide-react';

interface ChartControlsProps {
  interval: string;
  onIntervalChange: (interval: string) => void;
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

function ChartControls({ 
  interval, 
  onIntervalChange, 
  onThemeToggle,
  theme 
}: ChartControlsProps) {
  const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'];

  return (
    <div className="flex items-center gap-4 p-2 border-b">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <div className="flex gap-1">
          {intervals.map((int) => (
            <button
              key={int}
              onClick={() => onIntervalChange(int)}
              className={`px-3 py-1 text-sm rounded ${
                interval === int
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {int}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onThemeToggle}
        className="p-2 rounded hover:bg-gray-100"
        title="Toggle theme"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
}

export default ChartControls;