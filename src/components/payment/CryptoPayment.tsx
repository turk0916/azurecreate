import React, { useState } from 'react';
import { Bitcoin, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import QRCode from 'qrcode.react';

interface CryptoPaymentProps {
  address: string;
  amount: number;
  currency: string;
  onSuccess: () => void;
}

function CryptoPayment({ address, amount, currency, onSuccess }: CryptoPaymentProps) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Bitcoin className="w-8 h-8 text-blue-600" />
        <h2 className="text-xl font-semibold">Kripto Para ile Ödeme</h2>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-1">
            {amount} {currency}
          </div>
          <div className="text-gray-500">Ödenecek Tutar</div>
        </div>

        <div className="flex justify-center">
          <QRCode value={`${currency}:${address}?amount=${amount}`} size={200} />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm break-all">{address}</span>
            <button
              onClick={handleCopyAddress}
              className="text-blue-600 hover:text-blue-700 ml-2"
            >
              {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Önemli Bilgiler</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Sadece {currency} ağını kullanın</li>
                <li>Minimum transfer tutarı: {amount} {currency}</li>
                <li>İşlem 15-30 dakika içinde onaylanacaktır</li>
                <li>Yanlış ağ kullanımında fonlar kaybolabilir</li>
              </ul>
            </div>
          </div>
        </div>

        {status === 'pending' && (
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent" />
            <span>İşlem bekleniyor...</span>
          </div>
        )}

        {status === 'confirmed' && (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>Ödeme onaylandı!</span>
          </div>
        )}

        {status === 'failed' && (
          <div className="flex items-center justify-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Ödeme başarısız oldu. Lütfen tekrar deneyin.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CryptoPayment;