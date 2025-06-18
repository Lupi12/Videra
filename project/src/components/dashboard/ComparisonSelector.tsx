import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

interface ComparisonSelectorProps {
  period: string;
  setPeriod: (period: string) => void;
  type: string;
  setType: (type: string) => void;
}

const ComparisonSelector: React.FC<ComparisonSelectorProps> = ({
  period,
  setPeriod,
  type,
  setType
}) => {
  return (
    <div className="flex gap-3">
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <select 
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="pl-10 pr-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
        >
          <option value="7days">Últimos 7 dias</option>
          <option value="30days">Últimos 30 dias</option>
          <option value="90days">Últimos 90 dias</option>
        </select>
      </div>
      
      <div className="relative">
        <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <select 
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="pl-10 pr-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white"
        >
          <option value="previous">vs. período anterior</option>
          <option value="same_last_month">vs. mesmo período mês passado</option>
          <option value="same_last_year">vs. mesmo período ano passado</option>
        </select>
      </div>
    </div>
  );
};

export default ComparisonSelector;