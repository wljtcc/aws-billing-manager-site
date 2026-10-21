/* ==========================================================================
   AWS BILLING MANAGER — MODERN INTERACTIVE APP SCRIPT
   Features: Theme Engine, Interactive Product Tour, Live Demo Simulator,
             FinOps ROI Calculator, Pricing Toggle, FAQ Accordion, Toast Engine
   ========================================================================== */

(function () {
  "use strict";

  // ================= UTILITIES & TOAST ENGINE =================
  function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const iconSvg = type === 'success' 
      ? '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>'
      : '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // ================= THEME ENGINE (DARK / LIGHT) =================
  const themeToggleDesktop = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');

  function initTheme() {
    const savedTheme = localStorage.getItem('abm_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to sleek dark mode
    setTheme(initialTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('abm_theme', theme);
    updateThemeIcon(theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showToast(`Tema ${newTheme === 'dark' ? 'Escuro' : 'Claro'} ativado`);
  }

  function updateThemeIcon(theme) {
    const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    
    const icon = theme === 'dark' ? sunIcon : moonIcon;
    if (themeToggleDesktop) themeToggleDesktop.innerHTML = icon;
    if (themeToggleMobile) themeToggleMobile.innerHTML = icon;
  }

  if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  initTheme();

  // ================= STICKY NAVBAR & SCROLL SPY =================
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      const secId = sec.getAttribute('id');
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });

  // ================= MOBILE DRAWER NAV =================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileClose');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');

  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileDrawer);
  mobileDrawerLinks.forEach(link => link.addEventListener('click', closeMobileDrawer));

  // ================= SCROLL REVEAL (INTERSECTION OBSERVER) =================
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ================= INTERACTIVE PRODUCT DEMO SIMULATOR =================
  const demoData = {
    all: {
      name: "Todas as Contas (Organization)",
      spend: "$148,912.40",
      spendRaw: 148912.40,
      mom: "-6.4%",
      momDown: true,
      prev: "$159,100.00",
      forecast: "$152,400.00",
      activeServices: "28 serviços",
      bars: [120, 135, 142, 155, 148.9, 152],
      labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out (Atual)"],
      services: [
        { name: "Amazon EC2 (Compute)", spend: "$62,543.20", pct: "42.0%", color: "#ff9900" },
        { name: "Amazon RDS (PostgreSQL/Aurora)", spend: "$26,804.23", pct: "18.0%", color: "#38bdf8" },
        { name: "Amazon S3 (Storage & Transfer)", spend: "$22,336.86", pct: "15.0%", color: "#818cf8" },
        { name: "Amazon OpenSearch Service", spend: "$14,891.24", pct: "10.0%", color: "#f59e0b" },
        { name: "Outros 24 Serviços AWS", spend: "$22,336.87", pct: "15.0%", color: "#64748b" }
      ]
    },
    prod: {
      name: "Core Production (12-5892-001)",
      spend: "$84,210.00",
      spendRaw: 84210.00,
      mom: "-3.2%",
      momDown: true,
      prev: "$86,990.00",
      forecast: "$86,000.00",
      activeServices: "18 serviços",
      bars: [70, 78, 82, 87, 84.2, 86],
      labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out (Atual)"],
      services: [
        { name: "Amazon EC2 (Compute)", spend: "$42,105.00", pct: "50.0%", color: "#ff9900" },
        { name: "Amazon RDS (Aurora Multi-AZ)", spend: "$18,526.20", pct: "22.0%", color: "#38bdf8" },
        { name: "Amazon S3 (Data Lake)", spend: "$12,631.50", pct: "15.0%", color: "#818cf8" },
        { name: "Amazon ElastiCache (Redis)", spend: "$6,736.80", pct: "8.0%", color: "#10b981" },
        { name: "Outros Serviços", spend: "$4,210.50", pct: "5.0%", color: "#64748b" }
      ]
    },
    analytics: {
      name: "Data Platform & AI Labs (88-3419-042)",
      spend: "$38,450.00",
      spendRaw: 38450.00,
      mom: "-12.8%",
      momDown: true,
      prev: "$44,100.00",
      forecast: "$39,100.00",
      activeServices: "12 serviços",
      bars: [32, 38, 44, 44.1, 38.45, 39.1],
      labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out (Atual)"],
      services: [
        { name: "Amazon EMR & SageMaker AI", spend: "$19,225.00", pct: "50.0%", color: "#ff9900" },
        { name: "Amazon OpenSearch", spend: "$9,612.50", pct: "25.0%", color: "#38bdf8" },
        { name: "Amazon S3 Analytics Lake", spend: "$5,767.50", pct: "15.0%", color: "#818cf8" },
        { name: "AWS Glue & Athena", spend: "$2,307.00", pct: "6.0%", color: "#f59e0b" },
        { name: "Outros Serviços", spend: "$1,538.00", pct: "4.0%", color: "#64748b" }
      ]
    },
    staging: {
      name: "Staging & Testing (44-9912-110)",
      spend: "$16,840.00",
      spendRaw: 16840.00,
      mom: "+2.1%",
      momDown: false,
      prev: "$16,490.00",
      forecast: "$17,200.00",
      activeServices: "14 serviços",
      bars: [14, 15, 15.5, 16.5, 16.84, 17.2],
      labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out (Atual)"],
      services: [
        { name: "Amazon EC2 / ECS Staging", spend: "$8,420.00", pct: "50.0%", color: "#ff9900" },
        { name: "Amazon RDS Dev Instances", spend: "$4,210.00", pct: "25.0%", color: "#38bdf8" },
        { name: "Application Load Balancers", spend: "$2,105.00", pct: "12.5%", color: "#818cf8" },
        { name: "Amazon CloudWatch & Logs", spend: "$1,180.00", pct: "7.0%", color: "#f43f5e" },
        { name: "Outros Serviços", spend: "$925.00", pct: "5.5%", color: "#64748b" }
      ]
    },
    shared: {
      name: "Shared Services & Network (01-2244-990)",
      spend: "$9,412.00",
      spendRaw: 9412.00,
      mom: "-1.5%",
      momDown: true,
      prev: "$9,550.00",
      forecast: "$9,500.00",
      activeServices: "8 serviços",
      bars: [8.8, 9.1, 9.2, 9.55, 9.41, 9.5],
      labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out (Atual)"],
      services: [
        { name: "AWS Transit Gateway", spend: "$4,706.00", pct: "50.0%", color: "#ff9900" },
        { name: "Amazon GuardDuty & SecurityHub", spend: "$2,353.00", pct: "25.0%", color: "#38bdf8" },
        { name: "AWS Direct Connect", spend: "$1,411.80", pct: "15.0%", color: "#10b981" },
        { name: "AWS Key Management Service", spend: "$564.72", pct: "6.0%", color: "#818cf8" },
        { name: "Outros Serviços", spend: "$376.48", pct: "4.0%", color: "#64748b" }
      ]
    }
  };

  let currentAccountKey = 'all';

  // Demo Tab Switching
  const demoTabs = document.querySelectorAll('.demo-tab-btn');
  const demoPanes = document.querySelectorAll('.demo-pane');

  demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPane = tab.getAttribute('data-tab');
      demoTabs.forEach(t => t.classList.remove('active'));
      demoPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const pane = document.getElementById(targetPane);
      if (pane) pane.classList.add('active');
    });
  });

  // Account Selector in Demo
  const demoAccountSelect = document.getElementById('demoAccountSelect');
  if (demoAccountSelect) {
    demoAccountSelect.addEventListener('change', (e) => {
      currentAccountKey = e.target.value;
      updateDemoView();
      showToast(`Visualizando: ${demoData[currentAccountKey].name}`);
    });
  }

  // Period Selector Pills in Demo
  const demoPeriodPills = document.querySelectorAll('.demo-pill');
  demoPeriodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      demoPeriodPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const periodName = pill.textContent.trim();
      showToast(`Granularidade alterada para: ${periodName}`);
    });
  });

  function updateDemoView() {
    const data = demoData[currentAccountKey] || demoData.all;
    
    // Update KPIs
    const elSpend = document.getElementById('demoKpiSpend');
    const elMom = document.getElementById('demoKpiMom');
    const elPrev = document.getElementById('demoKpiPrev');
    const elForecast = document.getElementById('demoKpiForecast');
    const elServices = document.getElementById('demoKpiServices');

    if (elSpend) elSpend.textContent = data.spend;
    if (elMom) {
      elMom.textContent = data.mom;
      elMom.className = `kpi-badge ${data.momDown ? 'down' : 'up'}`;
    }
    if (elPrev) elPrev.textContent = data.prev;
    if (elForecast) elForecast.textContent = data.forecast;
    if (elServices) elServices.textContent = data.activeServices;

    // Update SVG Bars
    const maxBar = Math.max(...data.bars);
    const svgBars = document.querySelectorAll('.demo-bar-rect');
    svgBars.forEach((bar, idx) => {
      if (data.bars[idx] !== undefined) {
        const val = data.bars[idx];
        const height = Math.round((val / maxBar) * 110);
        const yPos = 140 - height;
        bar.setAttribute('height', height);
        bar.setAttribute('y', yPos);
        bar.setAttribute('data-val', `$${val.toFixed(1)}k`);
      }
    });

    // Update Services List
    const serviceListEl = document.getElementById('demoServiceList');
    if (serviceListEl) {
      serviceListEl.innerHTML = data.services.map(s => `
        <div class="service-row">
          <div class="service-info">
            <span class="service-color-dot" style="background: ${s.color};"></span>
            <span>${s.name}</span>
          </div>
          <div style="display: flex; gap: 14px; align-items: center;">
            <span style="font-size: 0.8rem; color: var(--text-dim);">${s.pct}</span>
            <span class="service-spend">${s.spend}</span>
          </div>
        </div>
      `).join('');
    }
  }

  // Bar chart click interaction
  const barElements = document.querySelectorAll('.bar-rect');
  barElements.forEach(bar => {
    bar.addEventListener('click', () => {
      const val = bar.getAttribute('data-val') || 'Selecionado';
      showToast(`Mês selecionado: Detalhes carregados (${val})`);
    });
  });

  // Simulator for Savings Recommendations
  const applyRecButtons = document.querySelectorAll('.btn-apply-rec');
  applyRecButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const recTitle = btn.getAttribute('data-rec') || 'Otimização';
      const savings = btn.getAttribute('data-savings') || '$0';
      btn.textContent = '✓ Aplicado na Simulação';
      btn.style.background = 'var(--grad-emerald)';
      btn.disabled = true;

      showToast(`Recomendação ${recTitle} aplicada! Economia de ${savings}/mês incorporada.`);
    });
  });

  // Simulator for Role Switcher (Admin / Manager / Viewer)
  const roleButtons = document.querySelectorAll('.btn-role-tab');
  const roleDescEl = document.getElementById('roleDescText');
  const roleScopeBadge = document.getElementById('roleScopeBadge');

  const roleInfo = {
    admin: {
      desc: "Acesso irrestrito: sincroniza custos do Cost Explorer sob demanda, gerencia usuários, configura políticas de senha, ativa MFA mandatório e personaliza tema da tela de login.",
      scope: "Todas as contas + Ações Administrativas"
    },
    manager: {
      desc: "Visão executiva e gerencial: acesso total aos dashboards de todas as contas da Organization, relatórios consolidados e recomendações de economia, sem permissão para criar usuários ou disparar sync.",
      scope: "Todas as contas (Somente Leitura Analítica)"
    },
    viewer: {
      desc: "Acesso restrito e fatiado: o usuário VIEWER enxerga exclusivamente as contas da AWS associadas ao seu perfil pelo administrador (ex: apenas a Squad de Checkout ou time de Dados).",
      scope: "Contas designadas pelo Admin (Escopo Estrito)"
    }
  };

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const role = btn.getAttribute('data-role');
      if (roleInfo[role]) {
        if (roleDescEl) roleDescEl.textContent = roleInfo[role].desc;
        if (roleScopeBadge) roleScopeBadge.textContent = roleInfo[role].scope;
        showToast(`Perfil alternado para: ${role.toUpperCase()}`);
      }
    });
  });

  // ================= FINOPS ROI CALCULATOR =================
  const spendSlider = document.getElementById('calcSpendRange');
  const accountsSlider = document.getElementById('calcAccountsRange');
  const spendDisplay = document.getElementById('calcSpendDisplay');
  const accountsDisplay = document.getElementById('calcAccountsDisplay');

  const calcAnnualSavings = document.getElementById('calcAnnualSavings');
  const calcHoursSaved = document.getElementById('calcHoursSaved');
  const calcCeApiSaved = document.getElementById('calcCeApiSaved');
  const calcPaybackDays = document.getElementById('calcPaybackDays');

  function updateCalculator() {
    if (!spendSlider || !accountsSlider) return;

    const monthlySpend = parseFloat(spendSlider.value) || 25000;
    const numAccounts = parseInt(accountsSlider.value, 10) || 8;

    // Display updates
    if (spendDisplay) {
      spendDisplay.textContent = `US$ ${monthlySpend.toLocaleString('en-US')}`;
    }
    if (accountsDisplay) {
      accountsDisplay.textContent = `${numAccounts} ${numAccounts === 1 ? 'conta' : 'contas'}`;
    }

    // Calculations based on real FinOps benchmarks:
    // Average 22% savings with automated Rightsizing + Savings Plans + Idle resource removal
    const savingsRate = 0.22;
    const monthlySavings = monthlySpend * savingsRate;
    const annualSavings = monthlySavings * 12;

    // Hours saved: ~2 hours per account per month spent on manual cost spreadsheets + 12h baseline
    const hoursSavedMonth = Math.round(numAccounts * 2.2 + 10);

    // Cost Explorer API savings: $0.01 per query. An active team makes ~600 queries/month across accounts
    const apiSavedMonthly = Math.round(numAccounts * 350 * 0.01);

    // Payback calculation (in days) against the tool cost (e.g. ~$250/mo)
    const dailySavings = monthlySavings / 30;
    const payback = Math.max(3, Math.round(250 / dailySavings));

    if (calcAnnualSavings) {
      calcAnnualSavings.textContent = `US$ ${Math.round(annualSavings).toLocaleString('en-US')}`;
    }
    if (calcHoursSaved) {
      calcHoursSaved.textContent = `${hoursSavedMonth}h / mês`;
    }
    if (calcCeApiSaved) {
      calcCeApiSaved.textContent = `US$ ${(apiSavedMonthly * 12).toLocaleString('en-US')} / ano`;
    }
    if (calcPaybackDays) {
      calcPaybackDays.textContent = `~${payback} dias`;
    }
  }

  if (spendSlider) spendSlider.addEventListener('input', updateCalculator);
  if (accountsSlider) accountsSlider.addEventListener('input', updateCalculator);

  updateCalculator();

  // ================= PRICING ANNUAL / MONTHLY TOGGLE =================
  const pricingToggle = document.getElementById('pricingBillingToggle');
  const priceStarter = document.getElementById('priceStarter');
  const pricePro = document.getElementById('pricePro');
  const periodLabels = document.querySelectorAll('.pricing-period');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isAnnual = pricingToggle.checked;
      if (isAnnual) {
        if (priceStarter) priceStarter.textContent = '392';
        if (pricePro) pricePro.textContent = '990';
        periodLabels.forEach(p => p.textContent = '/mês (faturado anualmente, -20%)');
        showToast('Desconto de 20% aplicado no faturamento anual!');
      } else {
        if (priceStarter) priceStarter.textContent = '490';
        if (pricePro) pricePro.textContent = '1.290';
        periodLabels.forEach(p => p.textContent = '/mês');
        showToast('Faturamento mensal selecionado');
      }
    });
  }

  // Pre-select plan from pricing card buttons
  const planButtons = document.querySelectorAll('.btn-choose-plan');
  planButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = btn.getAttribute('data-plan') || 'Pro';
      const subjectInput = document.getElementById('cf-assunto');
      const contactSec = document.getElementById('contato');
      if (subjectInput) {
        subjectInput.value = `Interesse no Plano ${planName} — AWS Billing Manager`;
      }
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`Plano ${planName} selecionado para cotação!`);
    });
  });

  // ================= COPY IAM POLICY TO CLIPBOARD =================
  const copyIamBtn = document.getElementById('copyIamBtn');
  if (copyIamBtn) {
    copyIamBtn.addEventListener('click', () => {
      const iamCode = document.getElementById('iamPolicyCode');
      if (iamCode) {
        navigator.clipboard.writeText(iamCode.innerText).then(() => {
          showToast('Política IAM copiada para a área de transferência!');
        }).catch(() => {
          showToast('Erro ao copiar. Selecione o texto manualmente.', 'error');
        });
      }
    });
  }

  // ================= FAQ ACCORDION =================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close other items
        faqItems.forEach(other => other.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ================= CONTACT FORM & LEAD GEN =================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const nome = contactForm.elements['nome'] ? contactForm.elements['nome'].value.trim() : '';
      const email = contactForm.elements['email'] ? contactForm.elements['email'].value.trim() : '';
      const empresa = contactForm.elements['empresa'] ? contactForm.elements['empresa'].value.trim() : '';
      const gasto = contactForm.elements['gasto'] ? contactForm.elements['gasto'].value : '';
      const assunto = contactForm.elements['assunto'] ? contactForm.elements['assunto'].value.trim() : 'Interesse no AWS Billing Manager';
      const mensagem = contactForm.elements['mensagem'] ? contactForm.elements['mensagem'].value.trim() : '';

      const subject = assunto || `Contato comercial — ${nome} (${empresa || 'Empresa'})`;
      const bodyLines = [
        `Nome: ${nome}`,
        `E-mail: ${email}`,
        empresa ? `Empresa: ${empresa}` : '',
        gasto ? `Gasto Mensal Estimado na AWS: ${gasto}` : '',
        '',
        'Mensagem:',
        mensagem || 'Gostaria de agendar uma demonstração do AWS Billing Manager e receber detalhes técnicos e comerciais.'
      ].filter(Boolean);

      const mailtoUrl = `mailto:contato@inovve.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      // Open mail client
      window.location.href = mailtoUrl;

      if (formStatus) {
        formStatus.innerHTML = `<strong>Solicitação iniciada com sucesso!</strong><br>Abrimos o seu cliente de e-mail para confirmação do envio para <code>contato@inovve.com.br</code>. Se preferir, fale conosco pelo WhatsApp ou escreva diretamente.`;
        formStatus.className = 'form-status success';
      }

      showToast('Obrigado! Retornaremos em menos de 1 dia útil.');
      contactForm.reset();
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById('yearSpan');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();