# AWS Billing Manager — Site Comercial & Landing Page

Site moderno de apresentação, demonstração e venda do **AWS Billing Manager**: plataforma enterprise de visibilidade financeira (FinOps) e otimização de custos para **AWS Organizations**.

Desenvolvido para atender CTOs, VPs de Engenharia, Tech Leads, Cloud Architects e profissionais de FinOps que precisam de visibilidade consolidada de custos multi-conta sem custos adicionais de API e com total soberania de dados (100% Self-Hosted).

---

## 🚀 Destaques do Site

- **Design Premium & Alta Conversão:** Glassmorphism moderno, paleta com gradientes AWS Orange e Slate Navy, micro-interações fluidas e tipografia corporativa (*Plus Jakarta Sans* e *Inter*).
- **Tema Claro e Escuro Nativo:** Suporte completo a alternância de tema com persistência em `localStorage` e detecção automática de preferência de sistema.
- **Demonstração Interativa ao Vivo (Tour Guiado):**
  - **Visão Consolidada & Contas:** Simulador de dashboard com seletor dinâmico de contas da AWS Organization, KPI cards atualizados em tempo real, gráfico histórico interativo de barras em SVG e breakdown de top 5 serviços.
  - **Comparador de Meses (MoM):** Tabela comparativa lado a lado entre meses com variações absolutas e percentuais por serviço.
  - **Recomendações FinOps:** Cards interativos de Rightsizing de instâncias EC2, contratação de Compute Savings Plans e Reserved Instances com botão de simulação e cálculo de economia.
  - **Governança & RBAC:** Simulador de matriz de permissões entre ADMIN, MANAGER e VIEWER (com escopo restrito de contas).
- **Calculadora Dinâmica de ROI FinOps:**
  - Sliders interativos para gasto mensal em nuvem (US$ 5k a US$ 250k+) e número de contas na Organization.
  - Cálculo instantâneo da economia anual estimada (~22%), horas de equipe poupadas por mês, despesas de API do Cost Explorer eliminadas e tempo de payback em dias.
- **Visualização 3D da Arquitetura & Pipeline de Dados:** Passo a passo do fluxo de dados: da conexão no Payer (IAM Read-Only) à sincronização agendada e agregação SQL local.
- **Seção de Segurança & Código IAM:** Snippet interativo com a política JSON de permissões mínimas da AWS com botão de cópia de um clique e feedback por Toast.
- **Planos Comerciais Transparentes:** Seletor de faturamento Mensal e Anual (-20% OFF) cobrindo os níveis *Starter*, *Professional* (Mais Escolhido) e *Enterprise & MSP* (White-label e consultoria dedicada).
- **Formulário de Captação & Contato:** Validação client-side, pré-seleção dinâmica de assunto com base no plano escolhido e disparo de e-mail formatado via `mailto:` para `contato@inovve.com.br`.

---

## 📁 Estrutura de Arquivos

```
aws-billing-manager-site/
├── index.html            # Estrutura semântica completa com tags de SEO e OpenGraph
├── styles.css            # Sistema de design (tokens, glassmorphism, temas e responsividade)
├── main.js               # Lógica interativa (tour, calculadora ROI, tabs, accordion, tema, toasts)
├── assets/
│   ├── favicon.svg       # Favicon SVG corporativo
│   ├── hero-dashboard.jpg# Mockup de alta definição do dashboard FinOps
│   └── cloud-architecture.jpg # Render 3D da arquitetura segura e pipeline de dados
└── README.md             # Esta documentação
```

---

## 🛠️ Como Executar Localmente

Como o site é autocontido (HTML5, CSS3 e JavaScript puro), não é necessário compilar nem instalar dependências de build:

### Opção 1: Usando Python
```bash
python3 -m http.server 8080
# Acesse no navegador: http://localhost:8080
```

### Opção 2: Usando Node (npx)
```bash
npx serve .
# ou
npx http-server .
```

### Opção 3: Usando Docker (Nginx)
```bash
docker run --rm -p 8080:80 -v "$PWD":/usr/share/nginx/html:ro nginx:alpine
```

---

## 🌐 Publicação & Hospedagem

O site pode ser hospedado em qualquer serviço estático ou CDN:

- **Amazon S3 + CloudFront:** Configuração ideal com cache global e certificado SSL gratuito via ACM.
- **Vercel / Netlify / Cloudflare Pages:** Basta conectar o repositório Git e apontar a raiz como diretório de publicação.
- **GitHub Pages:** Ative nas configurações do repositório em *Settings > Pages*.

---

## 🎨 Personalização

- **Cores & Variáveis de Marca:** No início de `styles.css` na seção `:root` e `[data-theme="light"]`.
- **Preços & Moedas:** Atualize diretamente os valores numéricos no HTML e no handler do toggle em `main.js`.
- **E-mail de Contato:** Altere a constante `contato@inovve.com.br` no `index.html` e no formulário em `main.js`.

---

Desenvolvido por **INOVVE Consultoria em Cloud**.