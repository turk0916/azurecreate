import React, { useState } from 'react';
import { Search } from 'lucide-react';
import TradingViewWidget from '../components/TradingViewWidget';
import MarketOverview from '../components/MarketOverview';
import MarketNews from '../components/MarketNews';

function Markets() {
  const [selectedSymbol, setSelectedSymbol] = useState('BIST:XU100');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Piyasa Özeti */}
      <div className="mb-8">
        <MarketOverview />
      </div>

      {/* Ana Grafik ve Filtreler */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Teknik Analiz</h2>
          <div className="flex gap-4">
            <select
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="BIST:XU100">BIST 100</option>
              <option value="BIST:THYAO">Türk Hava Yolları</option>
              <option value="BIST:GARAN">Garanti Bankası</option>
              <option value="BIST:EREGL">Ereğli Demir Çelik</option>
              <option value="BIST:KCHOL">Koç Holding</option>
            </select>
          </div>
        </div>
        
        <div style={{ height: '600px' }}>
          <TradingViewWidget 
            symbol={selectedSymbol}
            height={600}
          />
        </div>
      </div>

      {/* Piyasa Haberleri */}
      <div>
        <MarketNews />
      </div>
    </div>
  );
}

export default Markets;