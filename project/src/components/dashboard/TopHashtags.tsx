import React from 'react';
import { Hash, TrendingUp } from 'lucide-react';

const TopHashtags: React.FC = () => {
  const hashtags = [
    { tag: 'rotinamatinal', count: 125000, trend: '+12%', growth: 'up' },
    { tag: 'fitness', count: 98000, trend: '+8%', growth: 'up' },
    { tag: 'alimentacaosaudavel', count: 87000, trend: '+15%', growth: 'up' },
    { tag: 'produtividade', count: 76000, trend: '+5%', growth: 'up' },
    { tag: 'autocuidado', count: 65000, trend: '-2%', growth: 'down' },
    { tag: 'motivacao', count: 58000, trend: '+18%', growth: 'up' },
    { tag: 'estilodevida', count: 52000, trend: '+7%', growth: 'up' },
    { tag: 'bemestar', count: 48000, trend: '+22%', growth: 'up' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">Top Hashtags</h3>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          Explorar Mais
        </button>
      </div>

      <div className="space-y-3">
        {hashtags.map((hashtag, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <Hash className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                  #{hashtag.tag}
                </p>
                <p className="text-xs text-slate-500">
                  {(hashtag.count / 1000).toFixed(0)}K posts
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 text-xs font-medium ${
                hashtag.growth === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-3 h-3 ${
                  hashtag.growth === 'down' ? 'transform rotate-180' : ''
                }`} />
                {hashtag.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-white" />
          </div>
          <h4 className="font-semibold text-slate-800">Dica de Hashtag</h4>
        </div>
        <p className="text-sm text-slate-600">
          Misture hashtags em alta com hashtags específicas do seu nicho para melhor alcance e engajamento.
        </p>
      </div>
    </div>
  );
};

export default TopHashtags;