
import React, { useState, useEffect } from 'react';
import { CompanyProfile, AppTab } from './types.ts';
import AdminPanel from './components/AdminPanel.tsx';
import UserPanel from './components/UserPanel.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.USER);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    name: '零克云',
    description: '零克云是中国最专业的AI托管平台之一。主要产品为AI应用托管平台，开发者可以通过平台提供的AI应用智能部署引擎将自己的应用托管到平台上来，用户可以一个账号体验千种应用，并且可以选择采用云上私有部署的模式构建自己的专有AI应用集。平台同时还提供了模型市场功能，开发者可以选择国内外的几乎所有主流模型，不仅全面灵活而且价格优惠。平台同时也提供了MCP、数据集、灵活算力租赁等AI应用的支撑资源。',
    goals: '在一年内实现全员AI化，通过零克云平台能力提升生产力200%，打造超级个人进化矩阵。',
    apiKey: ''
  });

  // Load from localStorage if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai_superman_company');
      if (saved) {
        setCompanyProfile(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load company profile", e);
    }
  }, []);

  const handleUpdateCompany = (profile: CompanyProfile) => {
    setCompanyProfile(profile);
    localStorage.setItem('ai_superman_company', JSON.stringify(profile));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="superman-gradient text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5 rounded-lg shadow-inner">
              <i className="fas fa-bolt text-blue-600 text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">AI超人计划</h1>
              <p className="text-xs opacity-80 font-medium">SUPERMAN PROJECT</p>
            </div>
          </div>
          <nav className="flex space-x-1 bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab(AppTab.USER)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === AppTab.USER ? 'bg-white text-blue-700 shadow-sm' : 'hover:bg-white/20'
              }`}
            >
              个人升级计划
            </button>
            <button
              onClick={() => setActiveTab(AppTab.ADMIN)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === AppTab.ADMIN ? 'bg-white text-blue-700 shadow-sm' : 'hover:bg-white/20'
              }`}
            >
              系统设置
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeTab === AppTab.ADMIN ? (
          <AdminPanel profile={companyProfile} onUpdate={handleUpdateCompany} />
        ) : (
          <UserPanel company={companyProfile} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2024 AI超人计划 | 赋能每一个职场人为超级个人 | Powered by 零克云</p>
          <div className="mt-4 flex justify-center space-x-6 text-xs uppercase tracking-widest opacity-60">
            <span>Thinking</span>
            <span>Resources</span>
            <span>Assistant</span>
            <span>Accumulation</span>
            <span>Management</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
