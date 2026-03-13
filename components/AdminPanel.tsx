
import React, { useState } from 'react';
import { CompanyProfile } from '../types.ts';

interface AdminPanelProps {
  profile: CompanyProfile;
  onUpdate: (profile: CompanyProfile) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState<CompanyProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-indigo-100 p-3 rounded-xl">
            <i className="fas fa-cogs text-indigo-600 text-2xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">系统设置后台</h2>
            <p className="text-slate-500">定义公司基因及零克云 API 授权</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
            <div className="flex items-center space-x-2 text-blue-800 font-bold mb-1 text-sm">
              <i className="fas fa-server"></i>
              <span>零克云 DeepSeek 配置</span>
            </div>
            <p className="text-xs text-blue-700 mb-3">
              系统当前使用 <b>DeepSeek-V3.2</b> 模型。请填入您的 API Key 以激活服务。
            </p>
            <div className="relative mb-2">
              <input
                type={showKey ? "text" : "password"}
                value={formData.apiKey || ''}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                className="w-full px-4 py-2 text-sm rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                placeholder="在此粘贴来自 gpulink.cc 的 API Key"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
              >
                <i className={`fas ${showKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <div className="bg-blue-100/50 p-3 rounded-lg border border-blue-200/50">
              <p className="text-[11px] leading-relaxed text-blue-800">
                <i className="fas fa-info-circle mr-1"></i>
                <strong>获取 Key 说明：</strong><br />
                进入 <a href="https://gpulink.cc/model-market/model-center/modelCenter" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-blue-600">零克云模型中心</a> 页面，选择 <b>deepseek-V3.2</b>，点击 <b>API调用</b>，复制 <b>API_KEY</b> 即可。
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">公司名称</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="输入公司全称"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">公司介绍</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="简述公司业务、规模及行业地位..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">公司目标</label>
            <textarea
              rows={4}
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="未来的发展方向、核心价值观及具体目标..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2"
          >
            <i className="fas fa-save"></i>
            <span>{isSaved ? '已保存设置' : '保存系统设置'}</span>
          </button>
        </form>

        {isSaved && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2 text-green-700 animate-bounce">
            <i className="fas fa-check-circle"></i>
            <span className="text-sm font-medium">设置更新成功！已切换至零克云最新引擎。</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
