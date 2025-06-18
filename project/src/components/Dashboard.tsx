import React, { useState } from 'react';
import StatsCards from './dashboard/StatsCards';
import PerformanceChart from './dashboard/PerformanceChart';
import RecentVideos from './dashboard/RecentVideos';
import TopHashtags from './dashboard/TopHashtags';
import PlatformBreakdown from './dashboard/PlatformBreakdown';
import DetailedMetricModal from './dashboard/DetailedMetricModal';
import ComparisonSelector from './dashboard/ComparisonSelector';
import AchievementsBanner from './dashboard/AchievementsBanner';
import AIInsights from './dashboard/AIInsights';

const Dashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [comparisonPeriod, setComparisonPeriod] = useState('7days');
  const [comparisonType, setComparisonType] = useState('previous');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Painel</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Acompanhe o desempenho do seu conteúdo em todas as plataformas</p>
        </div>
        <ComparisonSelector 
          period={comparisonPeriod}
          setPeriod={setComparisonPeriod}
          type={comparisonType}
          setType={setComparisonType}
        />
      </div>

      {/* Achievements Banner */}
      <AchievementsBanner />

      {/* AI Insights */}
      <AIInsights />

      {/* Interactive Stats Cards - Tour Target */}
      <div data-tour="dashboard-stats">
        <StatsCards onCardClick={setSelectedMetric} />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PerformanceChart comparisonPeriod={comparisonPeriod} comparisonType={comparisonType} />
        </div>
        <div>
          <PlatformBreakdown />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentVideos />
        <TopHashtags />
      </div>

      {/* Detailed Metric Modal */}
      {selectedMetric && (
        <DetailedMetricModal 
          metric={selectedMetric} 
          onClose={() => setSelectedMetric(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;