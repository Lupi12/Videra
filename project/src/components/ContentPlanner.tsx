import React, { useState } from 'react';
import { Calendar, Plus, Clock, Video, Upload, Image, Type, Hash, Send, Save, X, Edit3 } from 'lucide-react';

const ContentPlanner: React.FC = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [postContent, setPostContent] = useState({
    caption: '',
    hashtags: '',
    mediaType: 'video' as 'video' | 'image',
    mediaFile: null as File | null
  });

  const scheduledContent = [
    {
      id: 1,
      title: 'Rotina de Exercícios Matinais',
      platform: 'TikTok',
      scheduledTime: '2024-01-15 08:00',
      status: 'scheduled',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/4753990/pexels-photo-4753990.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Ideias de Café da Manhã Saudável',
      platform: 'Instagram',
      scheduledTime: '2024-01-15 12:00',
      status: 'draft',
      type: 'reel',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      title: 'Dicas de Produtividade',
      platform: 'YouTube',
      scheduledTime: '2024-01-16 10:00',
      status: 'scheduled',
      type: 'short',
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const platforms = [
    { id: 'tiktok', name: 'TikTok', color: 'from-pink-500 to-rose-500', icon: '🎵' },
    { id: 'instagram', name: 'Instagram', color: 'from-purple-500 to-pink-500', icon: '📸' },
    { id: 'youtube', name: 'YouTube', color: 'from-red-500 to-red-600', icon: '▶️' },
  ];

  const statusLabels = {
    scheduled: 'Agendado',
    draft: 'Rascunho',
    publishing: 'Publicando',
    published: 'Publicado',
    failed: 'Falhou'
  };

  const statusColors = {
    scheduled: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    publishing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    published: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  };

  const handleSchedulePost = () => {
    setShowScheduleModal(true);
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedTime('12:00');
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPostContent(prev => ({ ...prev, mediaFile: file }));
    }
  };

  const handleSavePost = () => {
    // Aqui você implementaria a lógica para salvar o post agendado
    console.log('Salvando post:', {
      ...postContent,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      platforms: selectedPlatforms
    });
    
    // Fechar modal e resetar formulário
    setShowScheduleModal(false);
    setPostContent({
      caption: '',
      hashtags: '',
      mediaType: 'video',
      mediaFile: null
    });
    setSelectedPlatforms([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Planejador de Conteúdo</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Agende e publique automaticamente em todas as plataformas</p>
        </div>
        <button 
          onClick={handleSchedulePost}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Agendar Conteúdo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário Principal */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Calendário de Publicações</h3>
            </div>
            
            {/* Calendário Interativo */}
            <div className="h-96 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center z-10">
                <Calendar className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-2">Calendário Interativo</p>
                <p className="text-slate-500 dark:text-slate-500">Interface de agendamento com arrastar e soltar</p>
                <button 
                  onClick={handleSchedulePost}
                  className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Agendar Primeiro Post
                </button>
              </div>
              
              {/* Efeitos visuais de fundo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-8 w-6 h-6 bg-pink-500 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-8 left-12 w-10 h-10 bg-blue-500 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar com Posts Agendados */}
        <div className="space-y-6">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Próximas Publicações</h3>
            <div className="space-y-3">
              {scheduledContent.map((content) => (
                <div key={content.id} className="p-3 border border-slate-200/50 dark:border-slate-700/50 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors group">
                  <div className="flex items-start gap-3">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-2">{content.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[content.status as keyof typeof statusColors]}`}>
                          {statusLabels[content.status as keyof typeof statusLabels]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Video className="w-3 h-3" />
                        <span>{content.platform}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{new Date(content.scheduledTime).toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
                          <Edit3 className="w-3 h-3 text-slate-500" />
                        </button>
                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
                          <X className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dica Pro */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-400/20 dark:to-pink-400/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Dica Pro</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Publique consistentemente nos horários ideais para cada plataforma para maximizar o engajamento. 
              TikTok performa melhor às 6-10h e 19-21h.
            </p>
            <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
              Ver Horários Ideais →
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Agendamento */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Agendar Publicação</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Upload de Mídia */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Mídia
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      {postContent.mediaType === 'video' ? (
                        <Video className="w-8 h-8 text-slate-400" />
                      ) : (
                        <Image className="w-8 h-8 text-slate-400" />
                      )}
                      <p className="text-slate-600 dark:text-slate-400">
                        {postContent.mediaFile ? postContent.mediaFile.name : 'Clique para fazer upload ou arraste aqui'}
                      </p>
                      <p className="text-xs text-slate-500">Vídeo ou imagem até 100MB</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Legenda */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Legenda
                </label>
                <div className="relative">
                  <Type className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    value={postContent.caption}
                    onChange={(e) => setPostContent(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="Escreva uma legenda envolvente..."
                    className="pl-10 pr-4 py-3 w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white resize-none"
                    rows={4}
                  />
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Hashtags
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={postContent.hashtags}
                    onChange={(e) => setPostContent(prev => ({ ...prev, hashtags: e.target.value }))}
                    placeholder="#videra #conteudo #criador"
                    className="pl-10 pr-4 py-3 w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Plataformas */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Plataformas
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPlatforms.includes(platform.id)
                          ? `border-purple-300 bg-gradient-to-r ${platform.color} text-white`
                          : 'border-slate-300 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{platform.icon}</div>
                      <div className="text-sm font-medium">{platform.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data e Hora */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Hora
                  </label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-3 px-6 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePost}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar Rascunho
                </button>
                <button
                  onClick={handleSavePost}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPlanner;