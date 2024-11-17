import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, TrendingUp, Shield, Wallet, BarChart2, Users, Award, Zap, Globe, Clock, Target } from 'lucide-react';

function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f')] bg-cover bg-center opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Yapay Zeka ile<br />
                <span className="text-blue-300">Borsa Trading</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                Gelişmiş AI trading botlarımızla trading potansiyelinizi maksimuma çıkarın
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center"
                >
                  Hemen Başla
                </Link>
                <Link
                  to="/bots"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition text-center"
                >
                  Trading Botları
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1642790551116-18e90f27688d" 
                alt="Trading Dashboard"
                className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Özellikleri</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En gelişmiş trading araçları ve yapay zeka teknolojileri ile kazançlarınızı maksimize edin
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Bot className="w-8 h-8" />}
            title="AI Trading Botları"
            description="Gelişmiş algoritmalar ile otomatik trading stratejileri"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Gerçek Zamanlı Analiz"
            description="Kapsamlı piyasa analizi ve performans takibi"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Güvenli Platform"
            description="Kurumsal seviye güvenlik önlemleri"
          />
          <FeatureCard
            icon={<Wallet className="w-8 h-8" />}
            title="Kolay Ödemeler"
            description="Hızlı para yatırma ve çekme işlemleri"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard value="₺2.5M+" label="İşlem Hacmi" />
            <StatCard value="50B+" label="Aktif Kullanıcı" />
            <StatCard value="%99.9" label="Çalışma Süresi" />
            <StatCard value="24/7" label="Teknik Destek" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nasıl Çalışır?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sadece üç adımda trading dünyasına adım atın
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            icon={<Users className="w-12 h-12" />}
            step="1"
            title="Hesap Oluşturun"
            description="Ücretsiz hesap oluşturun ve platformumuza katılın"
          />
          <StepCard
            icon={<Wallet className="w-12 h-12" />}
            step="2"
            title="Bakiye Yükleyin"
            description="Minimum 5000 TL ile yatırıma başlayın"
          />
          <StepCard
            icon={<BarChart2 className="w-12 h-12" />}
            step="3"
            title="Trading Yapın"
            description="AI botlarımızla otomatik trading başlasın"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1642790551116-18e90f27688d')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Trading Yolculuğunuza Bugün Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Yapay zeka destekli trading botlarımızla tanışın ve kazançlarınızı artırın
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            <Zap className="w-5 h-5" />
            Ücretsiz Hesap Oluştur
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group">
      <div className="text-blue-600 mb-4 transform group-hover:scale-110 transition">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg">
      <div className="text-4xl font-bold text-blue-400">{value}</div>
      <div className="mt-2 text-gray-300">{label}</div>
    </div>
  );
}

function StepCard({ icon, step, title, description }: { 
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4 transform group-hover:scale-110 transition">
        {icon}
      </div>
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-lg font-bold mb-4">
        {step}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;