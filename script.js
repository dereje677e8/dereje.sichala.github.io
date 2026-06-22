/**
 * DEREJE SICHALA - Portfolio Core Engine
 * Senior Cloud & DevOps Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- APP STATE INITIALIZATION ---
    const DOM = {
        cursor: document.getElementById('customCursor'),
        cursorGlow: document.getElementById('cursorGlow'),
        progressBar: document.getElementById('progressBar'),
        dockItems: document.querySelectorAll('.dock-item'),
        panels: document.querySelectorAll('.layout-panel'),
        reveals: document.querySelectorAll('.reveal'),
        roleText: document.getElementById('roleText'),
        particleCanvas: document.getElementById('particleCanvas'),
        terminalToggle: document.getElementById('terminalToggle'),
        terminalDrawer: document.getElementById('terminalDrawer'),
        closeTerminalBtn: document.getElementById('closeTerminalBtn'),
        terminalInput: document.getElementById('terminalInput'),
        terminalOutput: document.getElementById('terminalOutput'),
        projectExpandBtns: document.querySelectorAll('.btn-project-expand'),
        projectModal: document.getElementById('projectModal'),
        modalClose: document.getElementById('modalClose'),
        modalDataContainer: document.getElementById('modalDataContainer'),
        submitBtn: document.getElementById('submitBtn'),
        liquidForm: document.getElementById('liquidForm'),
        cpuMetric: document.getElementById('cpuMetric')
    };

    // --- 1. SMOOTH LIQUID CURSOR TRACKING ---
    if (window.innerWidth > 768) {
        let cursorX = 0, cursorY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            DOM.cursor.style.left = `${cursorX}px`;
            DOM.cursor.style.top = `${cursorY}px`;
        });

        const updateGlowPosition = () => {
            glowX += (cursorX - glowX) * 0.15;
            glowY += (cursorY - glowY) * 0.15;
            DOM.cursorGlow.style.left = `${glowX}px`;
            DOM.cursorGlow.style.top = `${glowY}px`;
            requestAnimationFrame(updateGlowPosition);
        };
        updateGlowPosition();

        const interactiveTargets = 'a, button, .dock-item, .skill-node-card, .form-input, .project-card';
        document.querySelectorAll(interactiveTargets).forEach(item => {
            item.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            item.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    // --- 2. HERO ROLE CAROUSEL ---
    const ROLES = [
        "Senior Cloud & DevOps Engineer",
        "Azure Cloud Architect",
        "Kubernetes Platform Engineer",
        "CI/CD Pipeline Specialist",
        "Data & Infrastructure Engineer"
    ];
    let roleIndex = 0;

    setInterval(() => {
        DOM.roleText.style.opacity = '0';
        DOM.roleText.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            roleIndex = (roleIndex + 1) % ROLES.length;
            DOM.roleText.textContent = ROLES[roleIndex];
            DOM.roleText.style.opacity = '1';
            DOM.roleText.style.transform = 'translateY(0)';
        }, 400);
    }, 3500);

    // --- 3. PARTICLE CANVAS BACKGROUND ---
    const ctx = DOM.particleCanvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
        DOM.particleCanvas.width = window.innerWidth;
        DOM.particleCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * DOM.particleCanvas.width;
            this.y = Math.random() * DOM.particleCanvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedY = Math.random() * 0.3 + 0.1;
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.y -= this.speedY;
            if (this.y < 0) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(41, 241, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    const animateParticles = () => {
        ctx.clearRect(0, 0, DOM.particleCanvas.width, DOM.particleCanvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // --- 4. SCROLL PROGRESS & REVEAL ---
    const handleScrollMetrics = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        DOM.progressBar.style.width = `${(window.scrollY / totalHeight) * 100}%`;

        let currentActiveSectionId = '';
        DOM.panels.forEach(panel => {
            if (window.scrollY >= panel.offsetTop - window.innerHeight / 3) {
                currentActiveSectionId = panel.getAttribute('id');
            }
        });

        DOM.dockItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentActiveSectionId}`) {
                item.classList.add('active');
            }
        });

        DOM.reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', handleScrollMetrics);
    handleScrollMetrics();

    // --- 5. SIMULATED TELEMETRY METRICS ---
    setInterval(() => {
        const randomCpuValue = (Math.random() * 30 + 25).toFixed(1);
        if (DOM.cpuMetric) DOM.cpuMetric.textContent = `${randomCpuValue}%`;
    }, 2500);

    // --- 6. TERMINAL DRAWER ---
    const openTerminal = () => {
        DOM.terminalDrawer.classList.add('open');
        DOM.terminalInput.focus();
    };
    const closeTerminal = () => DOM.terminalDrawer.classList.remove('open');

    DOM.terminalToggle.addEventListener('click', (e) => {
        e.preventDefault();
        DOM.terminalDrawer.classList.contains('open') ? closeTerminal() : openTerminal();
    });
    DOM.closeTerminalBtn.addEventListener('click', closeTerminal);

    DOM.terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = DOM.terminalInput.value.trim().toLowerCase();
            const outputRow = document.createElement('p');
            outputRow.className = 'term-line';
            
            if (cmd === 'help') {
                outputRow.innerHTML = `Available commands:<br>
- <strong>about</strong>: Professional summary<br>
- <strong>stack</strong>: Full technical skill set<br>
- <strong>projects</strong>: Key project highlights<br>
- <strong>contact</strong>: Get in touch<br>
- <strong>clear</strong>: Clear terminal`;
            } else if (cmd === 'about') {
                outputRow.innerHTML = `Dereje Sichala — Senior Cloud & DevOps Engineer<br>
Specializes in Azure Cloud, Kubernetes, CI/CD pipelines, infrastructure automation, and data engineering.<br>
B.Sc. Electrical & Computer Engineering.`;
            } else if (cmd === 'stack') {
                outputRow.innerHTML = `Cloud: Azure (VMs, AKS, Networking, Storage)<br>
Orchestration: Kubernetes, RKE2, Docker, Helm<br>
CI/CD: Azure DevOps, Git, GitHub, IaC<br>
Languages: Python, Bash, JavaScript, TypeScript<br>
Data: Kafka, Hadoop, PostgreSQL, MongoDB, BigQuery<br>
Monitoring: Prometheus, Grafana, ELK Stack<br>
Virtualization: Nutanix, VMware, OpenStack`;
            } else if (cmd === 'projects') {
                outputRow.innerHTML = `1. Enterprise Kubernetes Platform (RKE2, Helm, Prometheus)<br>
2. Azure DevOps Transformation (CI/CD pipelines, Git)<br>
3. Cloud Data Integration Platform (ETL, BigQuery, REST APIs)<br>
4. Infrastructure Automation Initiative (Python, Bash)`;
            } else if (cmd === 'contact') {
                outputRow.innerHTML = `Scroll to the contact section or use the nav above.<br>
LinkedIn / GitHub / Email / Telegram — all linked on the site.`;
            } else if (cmd === 'clear') {
                DOM.terminalOutput.querySelectorAll('.term-line').forEach(el => el.remove());
                DOM.terminalInput.value = '';
                return;
            } else if (cmd === '') {
                DOM.terminalInput.value = '';
                return;
            } else {
                outputRow.className = 'term-line error-term';
                outputRow.textContent = `Command not found: '${cmd}'. Type 'help' for options.`;
            }

            DOM.terminalOutput.insertBefore(outputRow, DOM.terminalInput.parentElement);
            DOM.terminalInput.value = '';
            DOM.terminalOutput.scrollTop = DOM.terminalOutput.scrollHeight;
        }
    });

    // --- 7. PROJECT MODAL ---
    const MODAL_DATA = {
        "Enterprise Kubernetes Platform": `<h4>Architecture Details</h4>
<p>Designed and implemented highly available RKE2 Kubernetes clusters to support enterprise containerized workloads. The deployment included automated lifecycle management, integration with private container registries, Cert-Manager for certificate automation, and a full observability stack using Prometheus and Grafana for real-time cluster monitoring and alerting.</p>`,

        "Azure DevOps Transformation": `<h4>Architecture Details</h4>
<p>Architected end-to-end CI/CD pipelines using Azure DevOps across multiple application teams. Implemented automated build, test, and deployment workflows with branch protection policies, environment gates, and rollback capabilities. This transformation significantly reduced deployment times while improving release reliability and developer confidence across production environments.</p>`,

        "Cloud Data Integration Platform": `<h4>Architecture Details</h4>
<p>Built scalable ETL pipelines and data movement workflows integrating diverse sources including REST APIs, PostgreSQL, MongoDB, and Google BigQuery. Developed data transformation logic in Python and deployed the platform on Azure cloud infrastructure. The solution enabled near real-time reporting and analytics across business units with automated monitoring and alerting.</p>`,

        "Infrastructure Automation Initiative": `<h4>Architecture Details</h4>
<p>Developed a comprehensive library of Python and Bash automation scripts covering server provisioning, SSL certificate renewal, health checks, and operational runbooks. Integrated with Azure APIs and Kubernetes controllers to provide fully automated lifecycle management. Reduced manual operational overhead significantly while ensuring consistent, auditable infrastructure changes across all environments.</p>`
    };

    DOM.projectExpandBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const cardElement = e.target.closest('.project-card');
            const projectTitle = cardElement.querySelector('h3').textContent;
            
            DOM.modalDataContainer.innerHTML = `
                <h3 style="font-size:1.8rem; margin-bottom:1rem; color:var(--accent-cyan);">${projectTitle}</h3>
                ${MODAL_DATA[projectTitle] || '<p>Project details coming soon.</p>'}
            `;
            DOM.projectModal.classList.add('open');
        });
    });

    const closeModal = () => DOM.projectModal.classList.remove('open');
    DOM.modalClose.addEventListener('click', closeModal);
    DOM.projectModal.addEventListener('click', (e) => {
        if (e.target === DOM.projectModal) closeModal();
    });

    // --- 8. CONTACT FORM ---
    if (DOM.liquidForm) {
        DOM.liquidForm.addEventListener('submit', () => {
            DOM.submitBtn.disabled = true;
            DOM.submitBtn.style.background = '#32d74b';
            DOM.submitBtn.querySelector('span').textContent = 'Message Sent ✔';
            
            setTimeout(() => {
                DOM.liquidForm.reset();
                DOM.submitBtn.disabled = false;
                DOM.submitBtn.style.background = '#fff';
                DOM.submitBtn.querySelector('span').textContent = 'Send Message';
            }, 4000);
        });
    }

    // --- 9. CONSOLE EASTER EGG ---
    console.log(
        "%cDEREJE SICHALA — SENIOR CLOUD & DEVOPS ENGINEER", 
        "color: #29f1ff; font-family: monospace; font-size: 16px; font-weight: bold;"
    );
    console.log("Azure · Kubernetes · CI/CD · Python · Kafka · Data Engineering");
    console.log("Open the terminal widget in the dock to explore further.");
});
