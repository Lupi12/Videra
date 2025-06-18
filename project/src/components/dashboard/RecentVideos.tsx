import React from 'react';
import { Play, Eye, Heart, Share2, MoreHorizontal } from 'lucide-react';

const RecentVideos: React.FC = () => {
  const videos = [
    {
      id: 1,
      title: 'Dicas de Rotina Matinal Que Mudaram Minha Vida',
      platform: 'TikTok',
      thumbnail: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      views: 245000,
      likes: 18500,
      shares: 2300,
      duration: '00:58',
      posted: 'há 2 horas',
      performance: 'trending',
    },
    {
      id: 2,
      title: 'Ideias de Café da Manhã Saudável e Rápido',
      platform: 'Instagram',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      views: 125000,
      likes: 9200,
      shares: 1100,
      duration: '00:45',
      posted: 'há 1 dia',
      performance: 'good',
    },
    {
      id: 3,
      title: 'Treino em Casa Sem Equipamentos',
      platform: 'YouTube',
      thumbnail: 'https://images.pexels.com/photos/4753990/pexels-photo-4753990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      views: 89000,
      likes: 6800,
      shares: 890,
      duration: '01:24',
      posted: 'há 3 dias',
      performance: 'average',
    },
  ];

  const performanceColors = {
    trending: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    average: 'bg-yellow-100 text-yellow-800',
  };

  const performanceLabels = {
    trending: 'Em alta',
    good: 'Bom',
    average: 'Médio',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">Vídeos Recentes</h3>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          Ver Todos
        </button>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-20 h-14 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-slate-800 text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {video.title}
                </h4>
                <button className="p-1 hover:bg-slate-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500">{video.platform}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${performanceColors[video.performance as keyof typeof performanceColors]}`}>
                  {performanceLabels[video.performance as keyof typeof performanceLabels]}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {(video.views / 1000).toFixed(0)}K
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {(video.likes / 1000).toFixed(1)}K
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-3 h-3" />
                  {(video.shares / 1000).toFixed(1)}K
                </div>
                <span className="ml-auto">{video.posted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVideos;