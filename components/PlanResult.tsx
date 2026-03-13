
import React from 'react';
import { SupermanPlan, AIPoint } from '../types.ts';

interface PlanResultProps {
  plan: SupermanPlan;
  onReset: () => void;
}

const PointCard: React.FC<{ icon: string; color: string; data: AIPoint; index: number }> = ({ icon, color, data, index }) => (
  <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col h-full transform transition-all hover:-translate-y-1">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
      <i className={`fas ${icon} text-white text-2xl`}></i>
    </div>
    <div className="flex-grow">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">维度 {index + 1}</span>
        <h3 className="text-xl font-bold text-slate-800">{data?.title || '未命名维度'}</h3>
      </div>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{data?.description || '暂无详细描述'}</p>
      
      <div className="mb-4">
        <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">推荐工具/方案</h4>
        <div className="flex flex-wrap gap-2">
          {(data?.tools || []).map((tool, i) => (
            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">
              {tool}
            </span>
          ))}
          {(!data?.tools || data.tools.length === 0) && <span className="text-xs text-slate-400">暂无推荐工具</span>}
        </div>
      </div>
    </div>
    <div className="pt-4 border-t border-slate-50">
      <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">落地执行建议</h4>
      <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl italic">
        {data?.implementation || '正在努力思考具体方案...'}
      </p>
    </div>
  </div>
);

const PlanResult: React.FC<PlanResultProps> = ({ plan, onReset }) => {
  return (
    <div className="animate-fadeIn pb-12">
      {/* Header Info */}
      <div className="superman-gradient rounded-3xl p-8 mb-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
          <i className="fas fa-rocket text-[300px]"></i>
        </div>
        <div className="relative z-10">
          <button
            onClick={onReset}
            className="mb-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all backdrop-blur-sm flex items-center space-x-2"
          >
            <i className="fas fa-arrow-left"></i>
            <span>返回修改</span>
          </button>
          <h2 className="text-4xl font-extrabold mb-4">AI 超人升级方案</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-white/20 px-4 py-2 rounded-xl font-bold text-sm">
              <i className="fas fa-briefcase mr-2"></i> {plan.role}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-xl font-bold text-sm">
              <i className="fas fa-building mr-2"></i> {plan.department}
            </span>
          </div>
          <p className="text-lg opacity-90 leading-relaxed max-w-3xl">
            {plan.summary}
          </p>
        </div>
      </div>

      {/* Grid of Points */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {plan.points?.thinking && (
          <PointCard 
            index={0} 
            icon="fa-brain" 
            color="bg-blue-600" 
            data={plan.points.thinking} 
          />
        )}
        {plan.points?.resources && (
          <PointCard 
            index={1} 
            icon="fa-search" 
            color="bg-red-500" 
            data={plan.points.resources} 
          />
        )}
        {plan.points?.assistant && (
          <PointCard 
            index={2} 
            icon="fa-magic" 
            color="bg-amber-500" 
            data={plan.points.assistant} 
          />
        )}
        {plan.points?.accumulation && (
          <PointCard 
            index={3} 
            icon="fa-archive" 
            color="bg-emerald-500" 
            data={plan.points.accumulation} 
          />
        )}
        {plan.points?.management && (
          <PointCard 
            index={4} 
            icon="fa-list-check" 
            color="bg-purple-600" 
            data={plan.points.management} 
          />
        )}
        
        {/* Call to action card */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center shadow-2xl border border-slate-700">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-microchip text-blue-400 text-2xl animate-pulse"></i>
          </div>
          <h3 className="text-2xl font-bold mb-4">深度进化引擎已就绪</h3>
          <p className="text-slate-400 text-sm mb-6">
            下方是 DeepSeek 为您挖掘的岗位“降维打击”建议，实现数十倍提效。
          </p>
          <div className="text-xs text-blue-400 font-mono">SYSTEM READY // OPTIMIZING...</div>
        </div>
      </div>

      {/* 新增：AI 进阶建议部分 */}
      {plan.extraInsights && plan.extraInsights.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">AI 进化进阶建议 (EX-MODE)</h3>
            <div className="h-1 flex-grow bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-[loading_2s_infinite]" style={{width: '30%'}}></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plan.extraInsights.map((insight, idx) => (
              <div key={idx} className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <i className="fas fa-bolt text-6xl"></i>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold py-1 px-2 bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">INSIGHT {idx + 1}</span>
                  <span className="text-xs font-bold text-emerald-400">
                    <i className="fas fa-arrow-trend-up mr-1"></i>
                    {insight?.impact || '大幅提升'}
                  </span>
                </div>
                <h4 className="text-lg font-bold mb-3 text-blue-100">{insight?.title || '进阶优化点'}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {insight?.content || '暂无具体建议内容。'}
                </p>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Evolution Strategy Enabled
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Bottom Quote */}
      <div className="text-center italic text-slate-400 mb-8">
        "AI 不会取代人类，但使用 AI 的人将取代不使用 AI 的人。"
      </div>
    </div>
  );
};

export default PlanResult;
