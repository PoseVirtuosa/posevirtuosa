import { useState } from "react";

const T = {
  bg:'#07090F', surface:'#0C1120', card:'#101726', border:'#1A2438',
  gold:'#C4A252', goldDim:'rgba(196,162,82,0.12)', goldBorder:'rgba(196,162,82,0.28)',
  blue:'#4A80F0', blueDim:'rgba(74,128,240,0.12)',
  green:'#58BF8A', greenDim:'rgba(88,191,138,0.12)',
  rose:'#E87878', roseDim:'rgba(232,120,120,0.12)',
  purple:'#A888E0', purpleDim:'rgba(168,136,224,0.12)',
  text:'#EAE4D8', textMd:'#A8A09A', muted:'#6B7280', dim:'#2D3548',
};

const MODS = [
  { id:'dash', icon:'⊞', label:'Dashboard', sub:'Visão geral' },
  {
    id:'ester', num:'01', icon:'◎', label:'Ester',
    sub:'Diagnóstico', tag:'Diagnóstico & Posicionamento',
    accent:T.gold, accentDim:T.goldDim,
    desc:'Diagnóstico completo de identidade, ICP e posicionamento estratégico da marca.',
    fields:[
      {k:'nome',l:'Nome da empresa',p:'Ex: Studio da Ana'},
      {k:'segmento',l:'Segmento / nicho',p:'Ex: Estética, moda, consultoria...'},
      {k:'publico',l:'Público-alvo',p:'Ex: Mulheres 30-50, classe B, SP'},
      {k:'produto',l:'Produto ou serviço principal',p:'Ex: Pacote de harmonização facial'},
      {k:'dificuldade',l:'Principal dificuldade',p:'Ex: Tenho seguidores mas não consigo vender'},
      {k:'presenca',l:'Presença digital atual',p:'Ex: Instagram 3k, sem site'},
      {k:'ticket',l:'Ticket médio',p:'Ex: R$800 por procedimento'},
    ],
    buildPrompt:(d)=>`Você é especialista em marketing estratégico e posicionamento de marca. Faça um diagnóstico completo para esta empresa e responda em português:

Nome: ${d.nome||'não informado'}
Segmento: ${d.segmento||'não informado'}
Público: ${d.publico||'não informado'}
Produto: ${d.produto||'não informado'}
Dificuldade: ${d.dificuldade||'não informado'}
Presença digital: ${d.presenca||'não informado'}
Ticket: ${d.ticket||'não informado'}

Entregue:
1. DIAGNÓSTICO DE POSICIONAMENTO - o que está errado
2. IDENTIDADE RECOMENDADA - como se posicionar
3. PÚBLICO IDEAL (ICP) - perfil detalhado
4. PROPOSTA DE VALOR - frase de posicionamento pronta
5. PRÓXIMOS 3 PASSOS - ações concretas e imediatas`,
  },
  {
    id:'debora', num:'02', icon:'◇', label:'Débora',
    sub:'Estratégia', tag:'Estratégia de Marketing',
    accent:T.blue, accentDim:T.blueDim,
    desc:'Plano estratégico completo com canais, fases, metas e distribuição de investimento.',
    fields:[
      {k:'empresa',l:'Nome da empresa',p:'Ex: Clínica Bem Estar'},
      {k:'segmento',l:'Segmento',p:'Ex: Saúde e bem-estar feminino'},
      {k:'objetivo',l:'Objetivo principal',p:'Ex: 10 novos clientes/mês em 90 dias'},
      {k:'orcamento',l:'Orçamento mensal',p:'Ex: R$2.000/mês'},
      {k:'prazo',l:'Prazo para resultado',p:'Ex: 3 meses'},
      {k:'canais',l:'Canais atuais',p:'Ex: Instagram, WhatsApp'},
      {k:'diferencial',l:'Diferencial',p:'Ex: Atendimento humanizado'},
    ],
    buildPrompt:(d)=>`Você é diretora estratégica de marketing digital. Crie um plano estratégico completo em português:

Empresa: ${d.empresa||'não informado'}
Segmento: ${d.segmento||'não informado'}
Objetivo: ${d.objetivo||'não informado'}
Orçamento: ${d.orcamento||'não informado'}
Prazo: ${d.prazo||'não informado'}
Canais atuais: ${d.canais||'não informado'}
Diferencial: ${d.diferencial||'não informado'}

Entregue:
1. DIAGNÓSTICO RÁPIDO
2. OBJETIVO SMART
3. CANAIS PRIORITÁRIOS - quais usar e por quê
4. PLANO DE AÇÃO - semana a semana no primeiro mês
5. MÉTRICAS - KPIs com metas para 30, 60 e 90 dias
6. ORÇAMENTO - como distribuir por canal
7. ALERTAS E RISCOS`,
  },
  {
    id:'rute', num:'03', icon:'◉', label:'Rute',
    sub:'Conteúdo', tag:'Criação de Conteúdo',
    accent:T.green, accentDim:T.greenDim,
    desc:'Calendário editorial completo e posts prontos para publicação no Instagram.',
    fields:[
      {k:'empresa',l:'Nome da empresa',p:'Ex: Advocacia da Juliana'},
      {k:'segmento',l:'Segmento',p:'Ex: Advocacia trabalhista'},
      {k:'publico',l:'Público-alvo',p:'Ex: Pequenos empresários, 35-55 anos'},
      {k:'tema',l:'Tema do mês',p:'Ex: Direitos trabalhistas que o empresário não conhece'},
      {k:'tom',l:'Tom de voz',p:'Ex: Educativo, acessível, sem juridiquês'},
      {k:'objetivo',l:'Objetivo do conteúdo',p:'Ex: Gerar leads para consulta inicial'},
    ],
    buildPrompt:(d)=>`Você é especialista em marketing de conteúdo e copywriting para Instagram. Crie conteúdo completo em português:

Empresa: ${d.empresa||'não informado'}
Segmento: ${d.segmento||'não informado'}
Público: ${d.publico||'não informado'}
Tema: ${d.tema||'não informado'}
Tom: ${d.tom||'não informado'}
Objetivo: ${d.objetivo||'não informado'}

Entregue:
1. CALENDÁRIO DA SEMANA - 7 dias com formato e tema
2. CARROSSEL COMPLETO - título + 6 slides + legenda com CTA
3. ROTEIRO DE REEL - 30-60 segundos com gancho e CTA
4. POST FEED - texto longo 300 palavras pronto para publicar
5. STORIES - sequência de 5 frames narrativos
6. HASHTAGS - 30 tags organizadas por grupo`,
  },
  {
    id:'abigail', num:'04', icon:'▷', label:'Abigail',
    sub:'Comercial', tag:'Processo Comercial',
    accent:T.rose, accentDim:T.roseDim,
    desc:'Scripts de venda, SDR, follow-up e fechamento prontos para usar.',
    fields:[
      {k:'empresa',l:'Nome da empresa',p:'Ex: Nutrição com a Carol'},
      {k:'produto',l:'Produto ou serviço',p:'Ex: Acompanhamento nutricional online, 3 meses'},
      {k:'ticket',l:'Ticket',p:'Ex: R$1.200 à vista ou 3x R$450'},
      {k:'publico',l:'Público',p:'Ex: Mulheres 25-40 que querem emagrecer'},
      {k:'canal',l:'Canal de venda',p:'Ex: Instagram DM + WhatsApp'},
      {k:'objecao',l:'Principal objeção',p:'Ex: Está caro'},
      {k:'diferencial',l:'Diferencial',p:'Ex: Acompanhamento diário'},
    ],
    buildPrompt:(d)=>`Você é especialista em vendas B2B/B2C e social selling. Crie processo comercial completo em português:

Empresa: ${d.empresa||'não informado'}
Produto: ${d.produto||'não informado'}
Ticket: ${d.ticket||'não informado'}
Público: ${d.publico||'não informado'}
Canal: ${d.canal||'não informado'}
Objeção principal: ${d.objecao||'não informado'}
Diferencial: ${d.diferencial||'não informado'}

Entregue:
1. ABORDAGEM INICIAL - mensagem de primeiro contato frio
2. QUALIFICAÇÃO SDR - 3 perguntas para qualificar o lead
3. ROTEIRO DE CALL - estrutura de 30-45 minutos
4. QUEBRA DE OBJEÇÃO - script para a objeção informada
5. FOLLOW-UP - mensagem para lead que sumiu 3 dias
6. FECHAMENTO - mensagem para lead quente
7. BOAS-VINDAS - onboarding do novo cliente`,
  },
  {
    id:'priscila', num:'05', icon:'✦', label:'Priscila',
    sub:'Relatório', tag:'Relatório & Autoridade',
    accent:T.purple, accentDim:T.purpleDim,
    desc:'Relatório executivo narrativo com análise de performance e plano de ação.',
    fields:[
      {k:'empresa',l:'Nome da empresa',p:'Ex: Moda da Bruna'},
      {k:'periodo',l:'Período',p:'Ex: Maio 2026'},
      {k:'seguidores',l:'Seguidores início → fim',p:'Ex: 2.400 → 2.850'},
      {k:'alcance',l:'Alcance total',p:'Ex: 48.000 pessoas'},
      {k:'engajamento',l:'Engajamento médio',p:'Ex: 4,2%'},
      {k:'leads',l:'Leads gerados',p:'Ex: 23 formulário + 14 DM'},
      {k:'vendas',l:'Vendas fechadas',p:'Ex: 7 vendas'},
      {k:'faturamento',l:'Faturamento',p:'Ex: R$8.400'},
      {k:'acoes',l:'Ações realizadas',p:'Ex: 20 posts, 3 reels, tráfego R$500'},
      {k:'dificuldade',l:'Principal dificuldade',p:'Ex: Baixa conversão'},
    ],
    buildPrompt:(d)=>`Você é analista sênior de marketing digital. Crie relatório executivo completo em português:

Empresa: ${d.empresa||'não informado'}
Período: ${d.periodo||'não informado'}
Seguidores: ${d.seguidores||'não informado'}
Alcance: ${d.alcance||'não informado'}
Engajamento: ${d.engajamento||'não informado'}
Leads: ${d.leads||'não informado'}
Vendas: ${d.vendas||'não informado'}
Faturamento: ${d.faturamento||'não informado'}
Ações: ${d.acoes||'não informado'}
Dificuldade: ${d.dificuldade||'não informado'}

Entregue:
1. RESUMO EXECUTIVO - 2-3 parágrafos narrativos
2. ANÁLISE DE PERFORMANCE - o que funcionou e o que não funcionou
3. CONQUISTAS - maiores vitórias do período
4. PONTOS DE ATENÇÃO - o que precisa melhorar
5. PLANO DE AÇÃO - 5 prioridades para o próximo mês
6. MENSAGEM ESTRATÉGICA - fecho para a cliente`,
  },
];

async function callClaude(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  if (data?.content?.[0]?.text) return data.content[0].text;
  throw new Error(data?.error?.message || JSON.stringify(data).slice(0,300));
}

function renderMD(text) {
  if (!text) return null;
  return text.split('\n').map((line,i) => {
    if (/^\d+\.\s/.test(line) && line.length < 60) return (
      <div key={i} style={{fontSize:11,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:T.gold,marginTop:i===0?0:24,marginBottom:8,paddingBottom:6,borderBottom:`1px solid ${T.goldBorder}`}}>
        {line}
      </div>
    );
    if (line.startsWith('- ') || line.startsWith('• ')) return (
      <div key={i} style={{display:'flex',gap:10,marginBottom:5,paddingLeft:4}}>
        <span style={{color:T.gold,flexShrink:0,marginTop:3,fontSize:10}}>◆</span>
        <span style={{color:T.textMd,lineHeight:1.65,fontSize:13}}>{line.slice(2)}</span>
      </div>
    );
    if (line.trim()==='') return <div key={i} style={{height:6}}/>;
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} style={{color:T.textMd,lineHeight:1.7,marginBottom:4,fontSize:13}}>
        {parts.map((p,j)=>j%2===1?<strong key={j} style={{color:T.text,fontWeight:600}}>{p}</strong>:p)}
      </p>
    );
  });
}

function Dashboard({onSelect}) {
  return (
    <div style={{maxWidth:860}}>
      <div style={{marginBottom:40}}>
        <div style={{fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',color:T.gold,marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
          <span style={{display:'inline-block',width:24,height:1,background:T.gold}}/>
          Pose Virtuosa · Agência de IA
        </div>
        <h1 style={{fontSize:'clamp(26px,4vw,44px)',fontFamily:'"Playfair Display",serif',fontWeight:700,color:T.text,lineHeight:1.15,marginBottom:14}}>
          Agência de Marketing<br/><em style={{color:T.gold}}>Inteiramente com IA</em>
        </h1>
        <p style={{color:T.muted,fontSize:14,lineHeight:1.7,maxWidth:520}}>
          A Metodologia das 5 Virtudes operada por inteligência artificial. Do diagnóstico ao relatório — ciclo completo.
        </p>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:0,marginBottom:32,overflowX:'auto',paddingBottom:4}}>
        {MODS.filter(m=>m.id!=='dash').map((m,i)=>(
          <div key={m.id} style={{display:'flex',alignItems:'center',flexShrink:0}}>
            <button onClick={()=>onSelect(m.id)} style={{display:'flex',alignItems:'center',gap:7,padding:'7px 14px',borderRadius:20,background:m.accentDim,border:`1px solid ${m.accent}40`,color:m.accent,cursor:'pointer',fontSize:12,fontWeight:600,whiteSpace:'nowrap',transition:'all 0.2s'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.05)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)'}}>
              {m.icon} {m.num} {m.label}
            </button>
            {i<4&&<div style={{padding:'0 5px',color:T.dim,fontSize:12}}>→</div>}
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:14,marginBottom:24}}>
        {MODS.filter(m=>m.id!=='dash').map(m=>(
          <button key={m.id} onClick={()=>onSelect(m.id)} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:'20px',textAlign:'left',cursor:'pointer',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=m.accent;e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:9,background:m.accentDim,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:m.accent,flexShrink:0}}>
                {m.icon}
              </div>
              <div>
                <div style={{fontSize:10,color:T.muted,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:2}}>Virtude {m.num}</div>
                <div style={{fontSize:14,fontWeight:700,color:T.text,fontFamily:'"Playfair Display",serif'}}>{m.label}</div>
              </div>
            </div>
            <div style={{fontSize:10,fontWeight:700,color:m.accent,marginBottom:6,letterSpacing:'0.05em',textTransform:'uppercase'}}>{m.tag}</div>
            <div style={{fontSize:12,color:T.muted,lineHeight:1.6}}>{m.desc}</div>
          </button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',background:T.card,border:`1px solid ${T.border}`,borderRadius:12,overflow:'hidden'}}>
        {[{v:'5',l:'Virtudes',s:'Módulos ativos'},{v:'100%',l:'Gerado por IA',s:'Claude Sonnet'},{v:'∞',l:'Escala',s:'Sem limite'},{v:'Bíblico',l:'Método',s:'5 Virtudes'}].map((s,i)=>(
          <div key={i} style={{textAlign:'center',padding:'18px 8px',borderRight:i<3?`1px solid ${T.border}`:'none'}}>
            <div style={{fontSize:20,fontWeight:800,color:T.gold,fontFamily:'"Playfair Display",serif',marginBottom:3}}>{s.v}</div>
            <div style={{fontSize:11,fontWeight:700,color:T.text,marginBottom:1}}>{s.l}</div>
            <div style={{fontSize:10,color:T.muted}}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Module({mod}) {
  const [form,setForm]=useState({});
  const [loading,setLoading]=useState(false);
  const [output,setOutput]=useState('');
  const [error,setError]=useState('');
  const [copied,setCopied]=useState(false);

  const generate=async()=>{
    setLoading(true);setError('');setOutput('');
    try {
      const result = await callClaude(mod.buildPrompt(form));
      setOutput(result);
    } catch(e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy=()=>{navigator.clipboard?.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),2000)};
  const reset=()=>{setForm({});setOutput('');setError('')};

  return (
    <div style={{maxWidth:1060}}>
      <div style={{display:'flex',alignItems:'flex-start',gap:14,marginBottom:28}}>
        <div style={{width:50,height:50,borderRadius:12,background:mod.accentDim,border:`1px solid ${mod.accent}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,color:mod.accent,flexShrink:0}}>{mod.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:mod.accent,marginBottom:4}}>Virtude {mod.num} · IA Operacional</div>
          <h2 style={{fontSize:'clamp(20px,3vw,30px)',fontFamily:'"Playfair Display",serif',fontWeight:700,color:T.text,lineHeight:1.1,marginBottom:6}}>{mod.label}</h2>
          <p style={{color:T.muted,fontSize:13,lineHeight:1.6}}><span style={{color:mod.accent,fontWeight:600}}>{mod.tag}</span> — {mod.desc}</p>
        </div>
        {(output||Object.values(form).some(v=>v))&&(
          <button onClick={reset} style={{background:'transparent',border:`1px solid ${T.border}`,borderRadius:7,padding:'7px 14px',color:T.muted,fontSize:11,cursor:'pointer',letterSpacing:'0.06em',textTransform:'uppercase',flexShrink:0}}>Nova geração</button>
        )}
      </div>

      <div style={{display:'grid',gridTemplateColumns:output?'360px 1fr':'460px',gap:18,alignItems:'start'}}>
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:22,position:'sticky',top:24}}>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:T.muted,marginBottom:18}}>Dados da Cliente</div>
          <div style={{display:'flex',flexDirection:'column',gap:13}}>
            {mod.fields.map(f=>(
              <div key={f.k}>
                <label style={{display:'block',fontSize:11,fontWeight:700,color:T.textMd,marginBottom:5,letterSpacing:'0.04em',textTransform:'uppercase'}}>{f.l}</label>
                <input type="text" placeholder={f.p} value={form[f.k]||''} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                  style={{width:'100%',background:T.surface,border:`1px solid ${T.border}`,borderRadius:7,padding:'9px 11px',color:T.text,fontSize:13,outline:'none',transition:'border-color 0.2s',boxSizing:'border-box'}}
                  onFocus={e=>e.target.style.borderColor=mod.accent} onBlur={e=>e.target.style.borderColor=T.border}/>
              </div>
            ))}
          </div>
          <button onClick={generate} disabled={loading} style={{width:'100%',marginTop:20,padding:'13px',background:loading?T.border:mod.accent,color:loading?T.muted:'#06080F',border:'none',borderRadius:9,fontSize:12,fontWeight:800,letterSpacing:'0.08em',textTransform:'uppercase',cursor:loading?'not-allowed':'pointer',transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            {loading?<><span style={{animation:'spin 1s linear infinite',display:'inline-block'}}>◈</span>Gerando...</>:`◈ Gerar com ${mod.label}`}
          </button>
          {error&&(
            <div style={{marginTop:12,padding:12,background:'rgba(232,120,120,0.1)',border:'1px solid rgba(232,120,120,0.3)',borderRadius:8,fontSize:12,color:'#E87878',lineHeight:1.6,wordBreak:'break-all'}}>
              <strong>Erro:</strong> {error}
            </div>
          )}
        </div>

        {output&&(
          <div style={{background:T.card,border:`1px solid ${mod.accent}35`,borderRadius:12,padding:22}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${T.border}`}}>
              <span style={{fontSize:11,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:mod.accent}}>◈ Resultado Gerado</span>
              <button onClick={copy} style={{background:copied?`${mod.accent}25`:'transparent',border:`1px solid ${copied?mod.accent:T.border}`,borderRadius:6,padding:'4px 12px',color:copied?mod.accent:T.muted,fontSize:11,cursor:'pointer',transition:'all 0.2s'}}>
                {copied?'✓ COPIADO':'COPIAR'}
              </button>
            </div>
            <div>{renderMD(output)}</div>
          </div>
        )}

        {loading&&!output&&(
          <div style={{background:T.card,border:`1px solid ${mod.accent}35`,borderRadius:12,padding:40,textAlign:'center'}}>
            <div style={{fontSize:30,color:mod.accent,marginBottom:10,animation:'pulse 1.5s ease-in-out infinite'}}>◈</div>
            <div style={{color:T.text,fontSize:14,fontWeight:600,marginBottom:5}}>IA processando...</div>
            <div style={{color:T.muted,fontSize:12}}>Claude Sonnet gerando seu conteúdo</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PoseAI() {
  const [active,setActive]=useState('dash');
  const mod=MODS.find(m=>m.id===active);

  return (
    <div style={{minHeight:'100vh',background:T.bg,display:'flex',fontFamily:'"DM Sans",system-ui,sans-serif',color:T.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:${T.surface}}::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px}
        input::placeholder{color:${T.dim};font-size:12px}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div style={{width:210,flexShrink:0,background:T.surface,borderRight:`1px solid ${T.border}`,display:'flex',flexDirection:'column',padding:'26px 14px',position:'sticky',top:0,height:'100vh',overflowY:'auto'}}>
        <div style={{marginBottom:32,paddingLeft:8}}>
          <div style={{fontSize:9,letterSpacing:'0.18em',textTransform:'uppercase',color:T.muted,marginBottom:5}}>Pose Virtuosa</div>
          <div style={{fontSize:20,fontFamily:'"Playfair Display",serif',fontWeight:800,color:T.text}}>POSE<span style={{color:T.gold}}>·AI</span></div>
          <div style={{fontSize:10,color:T.dim,marginTop:3,letterSpacing:'0.06em'}}>AGÊNCIA DE INTELIGÊNCIA</div>
        </div>
        <nav style={{flex:1,display:'flex',flexDirection:'column',gap:2}}>
          {MODS.map(m=>{
            const isActive=active===m.id;
            const accent=m.accent||T.gold;
            const accentDim=m.accentDim||T.goldDim;
            return (
              <button key={m.id} onClick={()=>setActive(m.id)} style={{display:'flex',alignItems:'center',gap:9,padding:'9px 11px',borderRadius:9,border:'none',width:'100%',textAlign:'left',cursor:'pointer',background:isActive?accentDim:'transparent',color:isActive?accent:T.muted,transition:'all 0.15s',borderLeft:isActive?`2px solid ${accent}`:'2px solid transparent'}}
                onMouseEnter={e=>{if(!isActive){e.currentTarget.style.background=T.card;e.currentTarget.style.color=T.textMd}}}
                onMouseLeave={e=>{if(!isActive){e.currentTarget.style.background='transparent';e.currentTarget.style.color=T.muted}}}>
                <span style={{fontSize:14,width:20,textAlign:'center',flexShrink:0}}>{m.icon}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:isActive?700:400,lineHeight:1.2}}>{m.label}</div>
                  {m.num&&<div style={{fontSize:10,opacity:0.6,marginTop:1}}>{m.sub}</div>}
                </div>
              </button>
            );
          })}
        </nav>
        <div style={{paddingTop:18,borderTop:`1px solid ${T.border}`}}>
          <div style={{fontSize:10,color:T.gold,marginBottom:2,fontWeight:600}}>◈ Claude Sonnet</div>
          <div style={{fontSize:10,color:T.dim}}>Powered by Anthropic</div>
          <div style={{fontSize:10,color:T.dim,marginTop:1}}>posevirtuosa.com</div>
        </div>
      </div>

      <div style={{flex:1,overflowY:'auto',padding:'36px clamp(16px,4vw,44px) 72px',minWidth:0,animation:'fadeIn 0.3s ease'}}>
        {active==='dash'?<Dashboard onSelect={setActive}/>:<Module mod={mod} key={active}/>}
      </div>
    </div>
  );
}
