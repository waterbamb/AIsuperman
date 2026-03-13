
import React, { useState } from 'react';
import { CompanyProfile, UserInput, SupermanPlan } from '../types.ts';
import { generateSupermanPlan } from '../geminiService.ts';
import PlanResult from './PlanResult.tsx';

interface UserPanelProps {
  company: CompanyProfile;
}

const UserPanel: React.FC<UserPanelProps> = ({ company }) => {
  const [userInput, setUserInput] = useState<UserInput>({ department: '', role: '' });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<SupermanPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hasApiKey = !!company.apiKey;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.department || !userInput.role) return;
    if (!hasApiKey) {
      setError("授权配置缺失：请先在‘系统设置’中填入零克云 API Key。");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generateSupermanPlan(company, userInput);
      setPlan(result);
    } catch (err: any) {
      console.error("Generate Error:", err);
      setError(err.message || "连接 AI 引擎失败，请检查 API Key 或网络环境。");
    } finally {
      setLoading(false);
    }
  };

  if (plan) {
    return <PlanResult plan={plan} onReset={() => setPlan(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn px-4">
      {/* 核心介绍区 */}
      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase">
          Empowering Super Individuals
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          AI超人计划：开启职场进化的新纪元
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            在这个AI重塑生产力的时代，“AI超人计划”是为您量身打造的<span className="text-blue-600 font-bold">“职场数字化外骨骼”</span>。
          </p>
          <div className="text-sm text-slate-500 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm inline-block">
            <i className="fas fa-quote-left text-blue-300 mr-2"></i>
            依托 <span className="font-bold text-slate-800">{company.name}</span> 的业务底座，为您提供全方位的智能进化蓝图。
          </div>
        </div>
      </div>

      {!hasApiKey && (
        <div className="max-w-2xl mx-auto mb-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3 text-amber-800 shadow-sm">
          <i className="fas fa-exclamation-triangle mt-1 text-xl"></i>
          <div>
            <p className="font-bold text-sm">系统未激活</p>
            <p className="text-xs opacity-90">请点击右上角「系统设置」，输入来自 gpulink.cc 的 API Key 以启用 DeepSeek-V3.2 引擎。</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-10 items-stretch">
        {/* 输入表单 */}
        <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <i className="fas fa-user-astronaut mr-3 text-blue-600"></i>
            身份识别与录入
          </h3>
          
          <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">所属部门</label>
              <input
                type="text"
                autoComplete="off"
                required
                value={userInput.department}
                onChange={(e) => setUserInput(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-800"
                placeholder="输入您所在的具体部门"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">当前岗位/职务</label>
              <input
                type="text"
                autoComplete="off"
                required
                value={userInput.role}
                onChange={(e) => setUserInput(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-800"
                placeholder="例如：运营主管、研发工程师"
              />
            </div>
            
            <button
              disabled={loading || !hasApiKey}
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center space-x-3 text-lg ${
                (loading || !hasApiKey) ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
              }`}
            >
              {loading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>正在调配 AI 专家资源...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-bolt text-yellow-300"></i>
                  <span>开启超人升级蓝图</span>
                </>
              )}
            </button>
            
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-center space-x-3 border border-red-100 animate-shake">
                <i className="fas fa-exclamation-circle flex-shrink-0"></i>
                <span className="font-medium">{error}</span>
              </div>
            )}
          </form>
          
          {/* 装饰性背景 */}
          <div className="absolute -bottom-10 -right-10 p-10 opacity-5 pointer-events-none">
            <i className="fas fa-rocket text-[120px] text-blue-900"></i>
          </div>
        </div>

        {/* 维度快览 */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: 'fa-brain', color: 'bg-indigo-600', title: '思维升级', desc: 'AI共创决策，突破既往认知边界' },
            { icon: 'fa-globe', color: 'bg-rose-500', title: '全球资源', desc: '实时情报抓取，建立独特信息差' },
            { icon: 'fa-robot', color: 'bg-amber-500', title: '全能助手', desc: '全自动工作流，从琐碎中解放' },
            { icon: 'fa-seedling', color: 'bg-emerald-500', title: '知识沉淀', desc: '构建第二大脑，加速经验复利' },
            { icon: 'fa-tasks', color: 'bg-violet-600', title: '敏捷管理', desc: 'AI动态追踪，确保目标精准达成' },
            { icon: 'fa-microchip', color: 'bg-slate-800', title: '进化算法', desc: '岗位深度调优，实现指数级提效' }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${item.color} text-white rounded-xl flex items-center justify-center mb-4`}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
