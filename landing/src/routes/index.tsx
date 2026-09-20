import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Copy,
  ExternalLink,
  FileCode2,
  GitBranch,
  Github,
  Linkedin,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

import profileAssetUrl from "../assets/anthero-profile.jpg";

const GITHUB = "https://github.com/theroverse/zeus";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zeus — saiba quais arquivos importam antes de tocar no código" },
      {
        name: "description",
        content:
          "Descreva uma tarefa em linguagem natural e receba um plano revisável — objetivo, arquivos, passos e riscos — antes de qualquer mudança de código.",
      },
      { property: "og:title", content: "Zeus — um plano antes de código" },
      {
        property: "og:description",
        content: "Zeus cruza sua tarefa com o índice da Athena e escreve um plano verificável em Markdown.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://theroverse.github.io/zeus/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://theroverse.github.io/zeus/" }],
  }),
  component: Index,
});

const features = [
  ["Plano em 4 seções fixas", "Objetivo, arquivos selecionados, passo a passo e riscos — sempre no mesmo formato"],
  ["Nunca lê código bruto", "Decide a partir dos resumos da Athena, não reabrindo o projeto inteiro"],
  ["athena index automático", "Roda antes de cada plano, aproveitando o cache incremental por hash"],
  ["Resolução de dependência em 3 níveis", "Variável de ambiente, pasta irmã no monorepo ou clone gerenciado"],
  ["Escrita atômica com backup", "Grava em arquivo temporário e faz backup do plano anterior antes de sobrescrever"],
  ["Ciente de agentes de IA", "Pula confirmações bloqueantes quando roda em sessão não-interativa"],
  ["Zero dependências externas", "Só stdlib do Python 3.10+ e o próprio Claude Code"],
  ["Ponto de partida, não verdade absoluta", "Você sempre revisa o plano antes de pedir a execução"],
];

function CopyCommand({ command, compact = false }: { command: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={`command ${compact ? "command-compact" : ""}`}>
      <code><span>$</span> {command}</code>
      <button type="button" onClick={copy} aria-label="Copiar comando" title="Copiar comando">
        {copied ? <Check size={17} /> : <Copy size={17} />}
      </button>
    </div>
  );
}

// Glifo real do Zeus (mesmo de theroverse/src/components/icons/
// EcosystemIcon.tsx e das cores oficiais em ecosystem.ts: #A3E635/#D9F99D)
// - antes essa marca usava o icone generico Zap do lucide, sem nenhuma
// relacao com a identidade visual real do resto do ecossistema.
function ZeusMark({ size = 40 }: { size?: number }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 64 64" width={Math.round(size * 0.85)} height={Math.round(size * 0.85)}>
        <path d="M24 10 H20 A 4 4 0 0 0 16 14 V18" fill="none" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M40 10 H44 A 4 4 0 0 1 48 14 V18" fill="none" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M48 46 V50 A 4 4 0 0 1 44 54 H40" fill="none" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M16 46 V50 A 4 4 0 0 0 20 54 H24" fill="none" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        <path d="M37 11 L22 32 H33 L26 53 L45 28 H33 Z" fill="#A3E635" fillOpacity="0.22" stroke="#A3E635" strokeWidth="3.25" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M32 5 V8 M32 56 V59 M5 32 H8 M56 32 H59" stroke="#D9F99D" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.5" />
      </svg>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Zeus, início">
        <ZeusMark size={40} />
        <span>zeus</span>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <a href="#suite">A suíte</a>
        <a href="#recursos">Recursos</a>
        <a href="#comparativo">Comparativo</a>
        <a href="#autor">Autor</a>
      </nav>
      <a className="header-cta" href={GITHUB} target="_blank" rel="noreferrer">
        <Github size={17} /> GitHub <ExternalLink size={13} />
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"}>
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav className="mobile-nav" aria-label="Navegação móvel">
          <a href="#suite" onClick={() => setOpen(false)}>A suíte</a>
          <a href="#recursos" onClick={() => setOpen(false)}>Recursos</a>
          <a href="#comparativo" onClick={() => setOpen(false)}>Comparativo</a>
          <a href="#autor" onClick={() => setOpen(false)}>Autor</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">Abrir no GitHub</a>
        </nav>
      )}
    </header>
  );
}

function Index() {
  return (
    <main id="top">
      <Header />

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Open source · Python 3.10+ · Stdlib only</div>
          <h1>Antes de tocar no código,<br /><em>saiba o que realmente importa.</em></h1>
          <p className="hero-lede">
            Descreva a tarefa em linguagem natural. O Zeus cruza seu pedido com o índice que a Athena já mapeou e escreve um plano revisável — objetivo, arquivos, passos e riscos — antes de qualquer linha mudar.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#instalar">Instalar o Zeus <ArrowDown size={18} /></a>
            <a className="button button-secondary" href={GITHUB} target="_blank" rel="noreferrer"><Github size={18} /> Ver código</a>
          </div>
          <div className="hero-proof">
            <span><CircleCheck size={16} /> Zero dependências Python</span>
            <span><CircleCheck size={16} /> Nunca edita código sozinho</span>
            <span><CircleCheck size={16} /> Plano em Markdown revisável</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Demonstração do fluxo de planejamento do Zeus">
          <div className="terminal-window">
            <div className="terminal-bar"><i /><i /><i /><span>~/seu-projeto — zeus</span></div>
            <div className="terminal-body">
              <p><b>$</b> python zeus.py plan "adicionar campo de telefone no cadastro de usuario"</p>
              <p className="muted">Executando athena index (cache incremental)...</p>
              <p><span className="athena-dot">●</span> Athena forneceu o contexto</p>
              <div className="terminal-divider" />
              <p><strong>✓</strong> Objetivo definido</p>
              <p><strong>✓</strong> Arquivos selecionados</p>
              <p><strong>✓</strong> Passo a passo gerado</p>
              <p><strong>✓</strong> Riscos mapeados</p>
              <p className="ready">Plano salvo em .claude/zeus-plan.md <span className="cursor" /></p>
            </div>
          </div>
          <div className="floating-chip chip-one"><FileCode2 size={15} /> plano em 4 seções</div>
          <div className="floating-chip chip-two"><ShieldCheck size={15} /> nunca aplica sozinho</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Benefícios principais">
        <div className="shell trust-grid">
          <div><strong>1 comando</strong><span>transforma tarefa em plano</span></div>
          <div><strong>4 seções fixas</strong><span>objetivo, arquivos, passos, riscos</span></div>
          <div><strong>Cache incremental</strong><span>reindexar de graça quando nada muda</span></div>
          <div><strong>Zero autoaplicação</strong><span>você sempre revisa antes de agir</span></div>
        </div>
      </section>

      <section className="problem-section shell">
        <div className="section-kicker">O risco não é o código, é começar no lugar errado</div>
        <div className="problem-heading">
          <h2>Abrir 15 arquivos<br />para achar o certo é caro.</h2>
          <p>Sem mapa, cada tarefa nova começa com uma busca às cegas pelo projeto — e cada suposição errada custa tempo e contexto.</p>
        </div>
        <div className="before-after">
          <article className="pain-column">
            <span className="state-label">Sem Zeus</span>
            <ul>
              <li><X size={16} /> Você abre arquivos até achar por instinto</li>
              <li><X size={16} /> Decisões de escopo ficam implícitas, ninguém revisa</li>
              <li><X size={16} /> A IA edita direto, sem plano prévio</li>
              <li><X size={16} /> Erros de escopo só aparecem depois de aplicado</li>
            </ul>
          </article>
          <div className="transformation-arrow"><ArrowRight /></div>
          <article className="gain-column">
            <span className="state-label">Com Zeus</span>
            <ul>
              <li><Check size={16} /> Plano objetivo antes da primeira edição</li>
              <li><Check size={16} /> Arquivos selecionados com justificativa</li>
              <li><Check size={16} /> Passo a passo e riscos documentados</li>
              <li><Check size={16} /> Você aprova (ou ajusta) antes de qualquer mudança</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="suite" className="suite-section">
        <div className="shell">
          <div className="section-head light">
            <div><span className="section-kicker">Uma suíte. Três responsabilidades.</span><h2>Prepare. Entenda. Planeje.</h2></div>
            <p>O Zeus é a camada de decisão: usa o que a Athena já mapeou para dizer exatamente onde e como agir.</p>
          </div>
          <div className="suite-flow">
            <article className="suite-item thero-item">
              <div className="suite-number">01</div>
              <div className="suite-icon"><Terminal /></div>
              <div className="suite-copy"><span>Prepare</span><h3>Thero</h3><p>Instala skills, consolida suas regras, preserva configurações existentes, cria backups e audita sem alterar código.</p></div>
              <a href="https://theroverse.github.io/thero/" target="_blank" rel="noreferrer">Conhecer o Thero <ArrowRight size={16} /></a>
            </article>
            <article className="suite-item athena-item">
              <div className="suite-number">02</div>
              <div className="suite-icon"><Network /></div>
              <div className="suite-copy"><span>Entenda</span><h3>Athena</h3><p>Transforma o repositório em uma planta baixa: resumos de arquivos e pastas, de baixo para cima, com cache incremental por hash.</p></div>
              <a href="https://theroverse.github.io/athena/" target="_blank" rel="noreferrer">Conhecer a Athena <ArrowRight size={16} /></a>
            </article>
            <article className="suite-item zeus-item">
              <div className="suite-number">03</div>
              <div className="suite-icon"><Zap /></div>
              <div className="suite-copy"><span>Planeje</span><h3>Zeus <span className="suite-current-badge">Você está aqui</span></h3><p>Cruza sua tarefa com o índice da Athena, identifica arquivos relevantes, riscos e passos antes de pedir a execução.</p></div>
              <a href={GITHUB} target="_blank" rel="noreferrer">Ver o código <ArrowRight size={16} /></a>
            </article>
          </div>
          <div className="flow-diagram" aria-label="Fluxo de planejamento do Zeus">
            <div className="flow-step"><span className="flow-index">01</span><strong>Tarefa em linguagem natural</strong><p>"adicionar campo de telefone no cadastro"</p></div>
            <ChevronRight className="flow-arrow" />
            <div className="flow-step"><span className="flow-index">02</span><strong>athena index</strong><p>cache incremental, roda automaticamente</p></div>
            <ChevronRight className="flow-arrow" />
            <div className="flow-step"><span className="flow-index">03</span><strong>summary.md + tree/**</strong><p>contexto: resumos, não código bruto</p></div>
            <ChevronRight className="flow-arrow" />
            <div className="flow-step"><span className="flow-index">04</span><strong>claude -p</strong><p>objetivo, arquivos, passos, riscos</p></div>
            <ChevronRight className="flow-arrow" />
            <div className="flow-step"><span className="flow-index">05</span><strong>zeus-plan.md</strong><p>pronto para você revisar</p></div>
          </div>
        </div>
      </section>

      <section id="comparativo" className="comparison-section shell">
        <div className="section-head">
          <div><span className="section-kicker">Menos desperdício por design</span><h2>O plano evita retrabalho,<br />não promete mágica.</h2></div>
          <p>Sem plano, cada tentativa errada custa uma rodada inteira de contexto. Com Zeus, a decisão de onde mexer já vem pronta.</p>
        </div>
        <div className="scenario-note"><Sparkles size={15} /> Cenário ilustrativo — os números abaixo demonstram o mecanismo, não um benchmark universal.</div>
        <div className="comparison-grid">
          <div className="comparison-card without">
            <div className="comparison-title"><span>Uma tarefa sem plano</span><small>fluxo reativo</small></div>
            <div className="metric"><div><span>Arquivos abertos até achar o certo</span><strong>9</strong><small>ilustrativo</small></div><div className="meter"><i style={{ width: "80%" }} /></div></div>
            <div className="metric"><div><span>Rodadas até acertar o escopo</span><strong>3</strong><small>tentativas</small></div><div className="meter"><i style={{ width: "65%" }} /></div></div>
            <div className="timeline"><Clock3 /><span>abrir → ler → tentar → corrigir → repetir</span></div>
          </div>
          <div className="comparison-card with">
            <div className="comparison-title"><span>A mesma tarefa com Zeus</span><small>fluxo orientado</small></div>
            <div className="metric"><div><span>Arquivos abertos até achar o certo</span><strong>2</strong><small>ilustrativo</small></div><div className="meter"><i style={{ width: "20%" }} /></div></div>
            <div className="metric"><div><span>Rodadas até acertar o escopo</span><strong>1</strong><small>tentativa</small></div><div className="meter"><i style={{ width: "15%" }} /></div></div>
            <div className="timeline"><Zap /><span>planejar → revisar → executar → verificar</span></div>
          </div>
        </div>
        <div className="mechanism-row">
          <div><Network /><strong>Athena</strong><span>mapeia a arquitetura primeiro</span></div>
          <div><FileCode2 /><strong>Zeus</strong><span>escolhe arquivos e riscos</span></div>
          <div><ShieldCheck /><strong>Você</strong><span>revisa antes de aplicar</span></div>
        </div>
      </section>

      <section id="recursos" className="skills-section">
        <div className="shell skills-layout">
          <div className="skills-copy">
            <span className="section-kicker">O plano, não a adivinhação</span>
            <h2>Recursos pensados para reduzir risco.</h2>
            <p>Cada plano do Zeus segue a mesma estrutura previsível — fácil de revisar, fácil de confiar.</p>
            <div className="context-rule"><Terminal /><div><strong>Nunca edita sozinho</strong><span>Zeus escreve o plano. Você (ou o Claude) decide aplicar.</span></div></div>
          </div>
          <div className="skills-list">
            {features.map(([name, description]) => (
              <div className="skill-row" key={name}><span className="skill-check"><Check size={14} /></span><div><strong>{name}</strong><span>{description}</span></div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="instalar" className="install-section shell">
        <div className="install-grid">
          <div>
            <span className="section-kicker">Comece em minutos</span>
            <h2>Descreva a tarefa.<br />Receba um plano.</h2>
            <p>Clone o projeto e rode plan com a tarefa que você quer resolver. O Zeus cuida de indexar, cruzar contexto e escrever o plano.</p>
            <div className="requirements"><span><Check /> Python 3.10+</span><span><Check /> Claude Code autenticado</span><span><GitBranch size={14} /> Git, só se a Athena precisar ser clonada</span></div>
          </div>
          <div className="install-terminal">
            <div className="terminal-bar"><i /><i /><i /><span>instalação</span></div>
            <div className="install-commands">
              <CopyCommand command="git clone https://github.com/theroverse/zeus.git" compact />
              <CopyCommand command="cd zeus" compact />
              <CopyCommand command='python zeus.py plan "descreva a tarefa aqui"' compact />
            </div>
            <div className="install-result"><CircleCheck /> Índice atualizado · Plano gerado · .claude/zeus-plan.md pronto</div>
          </div>
        </div>
        <div className="mode-grid">
          <div><code>zeus.py plan "tarefa"</code><span>Planeja no diretório atual</span></div>
          <div><code>zeus.py plan "tarefa" caminho</code><span>Planeja em outro projeto</span></div>
          <div><code>ZEUS_ATHENA_PATH=...</code><span>Aponta para uma Athena específica</span></div>
          <div><code>thero --plan "tarefa"</code><span>Usa o Zeus a partir do Thero</span></div>
        </div>
      </section>

      <section id="autor" className="author-section">
        <div className="shell author-grid">
          <div className="author-photo-wrap"><img src={profileAssetUrl} alt="Anthero Vieira Neto" width={200} height={200} loading="lazy" /><span>18 anos<br />construindo<br />software</span></div>
          <div className="author-copy">
            <span className="section-kicker">Código nascido de experiência real</span>
            <h2>Construído por quem já viveu o problema.</h2>
            <p className="author-lede">Sou <strong>Anthero Vieira Neto</strong>, arquiteto de software sênior e DevOps Engineer. Trabalho com TypeScript, Python, Kubernetes e IA aplicada a produtos reais — do código à cultura de entrega.</p>
            <p>O Zeus nasceu da mesma necessidade que gerou o Thero e a Athena: decidir onde mexer no código sem gastar tempo, tokens ou confiança em suposições erradas. Esta suíte transforma esse aprendizado em ferramentas abertas para qualquer developer.</p>
            <div className="author-links">
              <a href="https://www.linkedin.com/in/anthero-vieira-neto-aa7a6b8a" target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ExternalLink size={13} /></a>
              <a href="https://github.com/netovieira" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ExternalLink size={13} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-inner">
          <ZeusMark size={72} />
          <span className="section-kicker">Seu próximo passo já pode ter um plano</span>
          <h2>Decida com contexto,<br />não com pressa.</h2>
          <p>Open source, transparente e pronto para seu próximo projeto.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={GITHUB} target="_blank" rel="noreferrer"><Github size={18} /> Começar no GitHub</a>
            <a className="button button-dark-outline" href="https://github.com/theroverse/zeus/blob/master/README.md" target="_blank" rel="noreferrer">Ler documentação <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="final-cta theroverse-cta">
        <div className="shell final-inner">
          <span className="section-kicker">Parte de um ecossistema maior</span>
          <h2>Zeus é uma peça do <em>Theroverse</em>.</h2>
          <p>Thero comanda, Athena mapeia o projeto, Zeus planeja antes de qualquer mudança — conheça as outras ferramentas abertas do ecossistema.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://theroverse.github.io/" target="_blank" rel="noreferrer">Explorar o Theroverse <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <a href="#top" className="brand"><ZeusMark size={36} /><span>zeus</span></a>
          <p>Planeje antes de tocar no código.</p>
          <div><a href="https://theroverse.github.io/" target="_blank" rel="noreferrer">Theroverse</a><a href="https://theroverse.github.io/thero/" target="_blank" rel="noreferrer">Thero</a><a href="https://theroverse.github.io/athena/" target="_blank" rel="noreferrer">Athena</a><a href="https://github.com/theroverse/zeus/blob/master/LICENSE" target="_blank" rel="noreferrer">MIT License</a></div>
          <small>© 2026 Anthero Vieira Neto</small>
        </div>
      </footer>
    </main>
  );
}
