import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

function MarketNews() {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'TCMB Para Politikası Kurulu Toplantısı Sonuçlandı',
      description: 'Merkez Bankası politika faizini %45 seviyesinde sabit tuttu. Enflasyonla mücadele kararlılığı vurgulandı.',
      source: 'TCMB',
      url: 'https://www.tcmb.gov.tr',
      publishedAt: new Date().toISOString(),
      sentiment: 'neutral'
    },
    {
      id: '2',
      title: 'BIST 100 Endeksi Yeni Rekor Seviyede',
      description: 'Borsa İstanbul\'da BIST 100 endeksi, bankacılık ve holding hisselerindeki alımlarla yeni zirve noktasına ulaştı.',
      source: 'Borsa İstanbul',
      url: 'https://www.borsaistanbul.com',
      publishedAt: new Date().toISOString(),
      sentiment: 'positive'
    },
    {
      id: '3',
      title: 'Dolar/TL\'de Son Durum',
      description: 'Küresel piyasalardaki gelişmeler ve yurt içi veriler sonrası döviz kurlarında dalgalı seyir devam ediyor.',
      source: 'Finans Haberleri',
      url: '#',
      publishedAt: new Date().toISOString(),
      sentiment: 'neutral'
    },
    {
      id: '4',
      title: 'Bankacılık Sektörü Verileri Açıklandı',
      description: 'BDDK verilerine göre bankacılık sektörünün net kârı geçen yılın aynı dönemine göre %85 artış gösterdi.',
      source: 'BDDK',
      url: '#',
      publishedAt: new Date().toISOString(),
      sentiment: 'positive'
    },
    {
      id: '5',
      title: 'Altın Fiyatları Rekor Tazeledi',
      description: 'Ons altın küresel belirsizlikler nedeniyle yeni rekor seviyeye ulaştı. Gram altın da tarihi zirvesini yeniledi.',
      source: 'Altın Piyasası',
      url: '#',
      publishedAt: new Date().toISOString(),
      sentiment: 'positive'
    }
  ]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Piyasa Haberleri</h2>
      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDate(item.publishedAt)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(item.sentiment)}`}>
                    {item.sentiment === 'positive' ? 'Olumlu' : 
                     item.sentiment === 'negative' ? 'Olumsuz' : 'Nötr'}
                  </span>
                </div>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketNews;