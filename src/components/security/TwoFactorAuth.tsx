import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Shield, Copy, CheckCircle } from 'lucide-react';

interface TwoFactorAuthProps {
  secret: string;
  onVerify: (code: string) => Promise<boolean>;
}

function TwoFactorAuth({ secret, onVerify }: TwoFactorAuthProps) {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    try {
      const isValid = await onVerify(code);
      if (!isValid) {
        setError('Geçersiz kod. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      setError('Doğrulama sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-blue-600" />
        <h2 className="text-xl font-semibold">İki Faktörlü Doğrulama</h2>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <QRCode value={`otpauth://totp/TradingAI:${secret}?secret=${secret}&issuer=TradingAI`} />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm">{secret}</span>
            <button
              onClick={handleCopySecret}
              className="text-blue-600 hover:text-blue-700"
            >
              {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Doğrulama Kodu
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="6 haneli kod"
            maxLength={6}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Doğrula ve Aktifleştir
        </button>
      </div>
    </div>
  );
}

export default TwoFactorAuth;