
import { CompanyProfile, UserInput, SupermanPlan, AIPoint } from "./types.ts";

export async function generateSupermanPlan(
  company: CompanyProfile,
  user: UserInput
): Promise<SupermanPlan> {
  const envKey = typeof process !== 'undefined' ? process.env.API_KEY : "";
  const apiKey = company.apiKey || envKey || "";
  
  if (!apiKey) {
    throw new Error("API Key 未配置，请前往‘系统设置’完成授权。");
  }

  const baseUrl = "https://gpulink.cc/v1/chat/completions";
  const model = "DeepSeek-V3.2";
  
  const systemInstruction = `你是一位顶级的企业AI数字化转型专家。你需要为员工定制“AI超人计划”。
  公司背景：${company.description}
  公司目标：${company.goals}
  
  任务要求：
  你必须严格按照以下 JSON 格式输出数据，不要包含任何解释文字。
  
  {
    "role": "岗位名称",
    "department": "部门名称",
    "summary": "计划总述（100字以内）",
    "points": {
      "thinking": { "title": "思维升级标题", "description": "详细描述", "tools": ["工具1", "工具2"], "implementation": "落地建议" },
      "resources": { "title": "全球资源标题", "description": "详细描述", "tools": ["工具1", "工具2"], "implementation": "落地建议" },
      "assistant": { "title": "全能助手标题", "description": "详细描述", "tools": ["工具1", "工具2"], "implementation": "落地建议" },
      "accumulation": { "title": "知识沉淀标题", "description": "详细描述", "tools": ["工具1", "工具2"], "implementation": "落地建议" },
      "management": { "title": "敏捷管理标题", "description": "详细描述", "tools": ["工具1", "工具2"], "implementation": "落地建议" }
    },
    "extraInsights": [
      { "title": "进阶建议标题", "content": "具体实施方案", "impact": "预计效率提升倍数，如：10x" }
    ]
  }

  注意：
  1. 所有 points 下的维度必须包含 title, description, tools (数组), implementation 四个字段。
  2. extraInsights 数组必须包含 3 条建议。
  3. 严禁改变 JSON 的层级结构。`;

  const userPrompt = `员工部门：${user.department}，职务：${user.role}。请生成其专属的AI超人计划。`;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.6 // 降低温度以提高结构的稳定性
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("401 未授权：API Key 无效。");
      }
      throw new Error(`请求失败 (Status: ${response.status})`);
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI 引擎未返回有效内容。");
    }

    // 清理 Markdown 代码块
    content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    
    let rawJson: any;
    try {
      rawJson = JSON.parse(content);
    } catch (e) {
      console.error("JSON Parse Error. Content:", content);
      throw new Error("数据格式解析失败。");
    }

    // --- 结构归一化处理 (Normalization) ---
    // 处理 AI 可能会直接把维度放在根部而不是在 points 里的情况
    const keys: (keyof SupermanPlan['points'])[] = ['thinking', 'resources', 'assistant', 'accumulation', 'management'];
    
    const normalizedPoints: any = {};
    const sourcePoints = rawJson.points || rawJson; // 兼容 points 缺失

    keys.forEach(key => {
      const p = sourcePoints[key] || {};
      normalizedPoints[key] = {
        title: p.title || (key === 'thinking' ? '思维升级' : key === 'resources' ? '全球资源' : key === 'assistant' ? '全能助手' : key === 'accumulation' ? '知识沉淀' : '敏捷管理'),
        description: p.description || p.desc || '暂无描述',
        tools: Array.isArray(p.tools) ? p.tools : (Array.isArray(p.actions) ? p.actions : (Array.isArray(p.keyPoints) ? p.keyPoints : [])),
        implementation: p.implementation || p.howTo || '建议在日常工作中逐步尝试。'
      };
    });

    const normalizedPlan: SupermanPlan = {
      role: rawJson.role || user.role,
      department: rawJson.department || user.department,
      summary: rawJson.summary || 'AI 进化方案已生成。',
      points: normalizedPoints,
      extraInsights: (rawJson.extraInsights || []).map((item: any) => ({
        title: item.title || '进化策略',
        content: item.content || item.description || '建议深耕 AI 应用。',
        impact: item.impact || '显著提升'
      }))
    };

    return normalizedPlan;
  } catch (error: any) {
    console.error("Service Error:", error);
    throw error;
  }
}
