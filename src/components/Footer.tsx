import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Bot className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Borsa Premium Trade AI</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Yapay zeka destekli gelişmiş borsa trading platformu
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Panel</Link></li>
              <li><Link to="/bots" className="text-gray-400 hover:text-white">Trading Botları</Link></li>
              <li><Link to="/markets" className="text-gray-400 hover:text-white">Piyasalar</Link></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-white">Analizler</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hesap</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-400 hover:text-white">Giriş Yap</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white">Kayıt Ol</Link></li>
              <li><Link to="/account" className="text-gray-400 hover:text-white">Hesabım</Link></li>
              <li><Link to="/settings" className="text-gray-400 hover:text-white">Ayarlar</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Destek</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white">Yardım Merkezi</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">İletişim</Link></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-white">Dokümantasyon</Link></li>
              <li><Link to="/status" className="text-gray-400 hover:text-white">Sistem Durumu</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 Borsa Premium Trade AI. Tüm hakları saklıdır.</p>
            <div className="mt-4 md:mt-0 space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white">Gizlilik Politikası</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Kullanım Koşulları</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;