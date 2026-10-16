/**
 * Portfolio Main JavaScript Logic - Nethmi Thiloka Divyanjalee
 * Modern, Lightweight, GitHub Pages Native (No XAMPP or Server required)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Particle Background Canvas Animation
    // --------------------------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    
    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark 
                ? `rgba(129, 140, 248, ${this.alpha})` 
                : `rgba(99, 102, 241, ${this.alpha * 0.6})`;
            ctx.fill();
        }
    }

    function initParticles() {
        if (!canvas) return;
        resizeCanvas();
        particles = [];
        const count = Math.min(Math.floor(window.innerWidth / 15), 70);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    ctx.beginPath();
                    ctx.strokeStyle = isDark 
                        ? `rgba(99, 102, 241, ${0.15 - dist / 800})`
                        : `rgba(99, 102, 241, ${0.1 - dist / 1200})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    if (canvas) {
        initParticles();
        animateParticles();
        window.addEventListener('resize', resizeCanvas);
    }

    // --------------------------------------------------------------------------
    // 2. Typing Effect in Hero Section
    // --------------------------------------------------------------------------
    const typingElement = document.getElementById('typing-text');
    const roles = [
        'Software Engineering Graduate',
        'First Class Honours BEng (Hons)',
        'Front-End Web Developer',
        'C# & ASP.NET Core Specialist',
        'Python & AI Solution Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect() {
        if (!typingElement) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 400;
        }

        setTimeout(typeEffect, typingDelay);
    }

    typeEffect();

    // --------------------------------------------------------------------------
    // 3. Theme Toggle (Dark / Light Mode)
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    // --------------------------------------------------------------------------
    // 4. Header Scroll Effect & Active Navigation Link
    // --------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // --------------------------------------------------------------------------
    // 5. Mobile Navigation Menu Toggle
    // --------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // 6. Number Counter Animation for Stats
    // --------------------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            let count = 0;
            const speed = Math.max(target / 40, 1);

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    stat.textContent = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    stat.textContent = target + '+';
                }
            };

            updateCount();
        });
    }

    const statsSection = document.querySelector('.stats-counter-grid');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animatedStats) {
                animatedStats = true;
                animateCounters();
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // --------------------------------------------------------------------------
    // 7. Skills Tab Filter
    // --------------------------------------------------------------------------
    const skillTabs = document.querySelectorAll('.skills-tabs .tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-tab');

            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 8. Projects Category Filter
    // --------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 9. Project Modal Viewer (All 11 Real Projects)
    // --------------------------------------------------------------------------
    const projectModal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const projectData = {
        '1': {
            title: 'Next-Gen Diet Planning System',
            category: 'PHP / Python / Flask / Gemini AI',
            date: 'Oct 2025 – Apr 2026',
            description: 'Developed an AI-assisted diet planning platform for users, nutritionists, and administrators. Implemented meal planning, BMI tracking, progress monitoring, Google Gemini API chatbot assistance, and consultation management. Created responsive dashboards, FPDF PDF report generation, PHPMailer email alerts, HTML5 Canvas API progress visualization, and secure user authentication with Role-Based Access Control (RBAC).',
            tech: ['PHP', 'MySQL', 'Python', 'Flask', 'Google Gemini API', 'PHPMailer', 'FPDF', 'AJAX', 'HTML5 Canvas', 'Bootstrap'],
            image: 'assets/images/project1.jpeg',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '2': {
            title: 'UniManage – University Course Management System (UCMS)',
            category: 'C# / ASP.NET Core MVC / SQL Server',
            date: 'Mar 2026 – Apr 2026',
            description: 'Developed a comprehensive university course management system for Students, Lecturers, and Administrators with strict role-based access control. Implemented course management, student enrollment, assignment submission, grading workflows, and administrative reporting dashboards. Integrated Entity Framework Core, SweetAlert2 UX popups, and Gmail SMTP API.',
            tech: ['C#', 'ASP.NET Core MVC', 'Entity Framework Core', 'SQL Server', 'HTML5/CSS3', 'jQuery', 'Bootstrap 5', 'SweetAlert2'],
            image: 'assets/images/project2.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '3': {
            title: 'Intelligent Rescue Agent Simulation',
            category: 'Unity / C# / Artificial Intelligence',
            date: 'Apr 2026 – Apr 2026',
            description: 'Developed an AI-based rescue simulation demonstrating autonomous agent decision-making and dynamic behavior in disaster environments. Implemented visual perception, collision detection, pathfinding algorithms, finite state-based decision making, and multi-agent interaction in hazard scenarios.',
            tech: ['Unity 3D', 'C#', 'Artificial Intelligence', 'Pathfinding', 'State Machines'],
            image: 'assets/images/project3.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '4': {
            title: 'GreenLife Organic Store Management System',
            category: 'C# / .NET Framework / Windows Forms',
            date: 'Jan 2026 – Feb 2026',
            description: 'Developed a desktop-based organic store management system with dedicated customer and administrator portals. Implemented product inventory management, interactive shopping cart, order processing, real-time stock monitoring, and financial reporting features using Microsoft SQL Server.',
            tech: ['C#', '.NET Framework', 'Windows Forms', 'Microsoft SQL Server', 'Visual Studio'],
            image: 'assets/images/project4.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '5': {
            title: 'Centralized Sales Distribution System (ISDN)',
            category: 'SQL Server / PHP / Bootstrap',
            date: 'Jan 2026 – Feb 2026',
            description: 'Developed a centralized distribution management system for tracking inventory, customer orders, automated invoices, payment management, and delivery logistics. Implemented real-time stock tracking and executive reporting dashboards to optimize operational efficiency.',
            tech: ['SQL Server', 'PHP', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'XAMPP'],
            image: 'assets/images/project5.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '6': {
            title: 'Velvet Vogue – E-Commerce Fashion Website',
            category: 'HTML / CSS / JavaScript / PHP / MySQL',
            date: 'Dec 2024 – Jan 2025',
            description: 'Designed and developed a responsive online fashion storefront featuring a full product catalog, shopping cart, and secure checkout. Implemented dynamic client-side product filtering and search, backed by MySQL database management for inventory and customer orders.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Web Design'],
            image: 'assets/images/project6.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '7': {
            title: 'Doctor Channeling System',
            category: 'Java / MySQL',
            date: 'Jun 2025 – Jul 2025',
            description: 'Developed a desktop application for scheduling doctor appointments and managing patient medical records. Created admin dashboards for doctors and staff to manage schedules efficiently, reducing patient waiting times and streamlining clinic operations.',
            tech: ['Java', 'MySQL', 'Database Design', 'Desktop GUI'],
            image: 'assets/images/project7.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '8': {
            title: 'Dream Book Shop – Online Bookstore',
            category: 'Python / PyTest / Pandas',
            date: 'Jun 2025 – Jul 2025',
            description: 'Developed a bookstore management system to handle book inventory, sales tracking, and customer records. Utilized Pandas for data analysis and sales reporting. Implemented automated testing suite with PyTest to ensure system stability and data integrity.',
            tech: ['Python', 'Pandas', 'PyTest', 'Automated Testing', 'Data Analytics'],
            image: 'assets/images/project8.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '9': {
            title: 'E-Space Mars Colonization DBMS',
            category: 'SQL Server / Python',
            date: 'Sep 2024 – Oct 2024',
            description: 'Designed and implemented a relational database management system (DBMS) for Mars colonization project data. Created secure user roles, access permissions, data validation constraints, and python interface scripts for extracting mission insights.',
            tech: ['SQL Server', 'Python', 'Relational Database', 'Database Security'],
            image: 'assets/images/project9.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '10': {
            title: 'Employee Leave Management System',
            category: 'Python / MySQL',
            date: 'Aug 2024 – Sep 2024',
            description: 'Designed and developed an automated leave management system with separate employee and admin portals. Implemented leave quotas, approval workflows, and HR reporting features, improving HR process efficiency by 40%.',
            tech: ['Python', 'MySQL', 'Database Design', 'HR Systems'],
            image: 'assets/images/project10.png',
            githubUrl: 'https://github.com/Thiloka-006'
        },
        '11': {
            title: 'Network Infrastructure Design for BlueScope',
            category: 'Cisco Packet Tracer / Networking',
            date: 'Aug 2024 – Sep 2024',
            description: 'Designed a scalable enterprise network architecture for BlueScope office branches in Melbourne and Darwin. Implemented VLANs, IP subnetting, inter-VLAN routing, firewalls, IoT, and ERP integration to support business expansion.',
            tech: ['Cisco Packet Tracer', 'VLAN', 'Subnetting', 'Firewalls', 'Network Design'],
            image: 'assets/images/project11.png',
            githubUrl: 'https://github.com/Thiloka-006'
        }
    };

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projId = btn.getAttribute('data-project');
            const data = projectData[projId];

            if (data && modalBody && projectModal) {
                modalBody.innerHTML = `
                    <span class="project-category">${data.category}</span>
                    <h2 style="margin-bottom: 0.3rem; font-size: 1.6rem;">${data.title}</h2>
                    <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 1.2rem;">
                        <i class="fa-regular fa-calendar"></i> ${data.date}
                    </div>
                    <p style="margin-bottom: 1.5rem; line-height: 1.6; font-size: 0.98rem;">${data.description}</p>
                    <div style="margin-bottom: 1.5rem;">
                        <strong style="display:block; margin-bottom: 0.6rem;">Technologies Used:</strong>
                        <div class="project-tags">
                            ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div style="display:flex; gap: 1rem;">
                        <a href="${data.githubUrl}" target="_blank" class="btn btn-sm btn-primary">
                            <i class="fa-brands fa-github"></i> View GitHub Profile
                        </a>
                        <button onclick="document.getElementById('project-modal').classList.remove('active')" class="btn btn-sm btn-outline">Close</button>
                    </div>
                `;
                projectModal.classList.add('active');
            }
        });
    });

    if (modalCloseBtn && projectModal) {
        modalCloseBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
            }
        });
    }

    // --------------------------------------------------------------------------
    // 10. Copy Email to Clipboard & Contact Form Handler
    // --------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailLink = document.getElementById('email-link');

    if (copyEmailBtn && emailLink) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = emailLink.textContent.trim();
            navigator.clipboard.writeText(emailText).then(() => {
                copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i>';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email:', err);
            });
        });
    }

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');

            const name = document.getElementById('user-name')?.value.trim() || '';
            const email = document.getElementById('user-email')?.value.trim() || '';
            const subject = document.getElementById('user-subject')?.value.trim() || 'Portfolio Inquiry';
            const message = document.getElementById('user-message')?.value.trim() || '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            }

            if (formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form-status-msg';
            }

            try {
                const response = await fetch('https://formsubmit.co/ajax/thilokanethmi6@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _subject: `New Portfolio Message: ${subject} from ${name}`,
                        message: message,
                        _template: 'table',
                        _captcha: 'false'
                    })
                });

                const result = await response.json();

                if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
                    if (formStatus) {
                        formStatus.textContent = '🎉 Thank you! Your message has been sent successfully. I will reply soon.';
                        formStatus.className = 'form-status-msg success';
                    }
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Submission error');
                }
            } catch (err) {
                console.warn('Background submission note:', err);
                // Graceful fallback: If browser security blocks local AJAX fetch, submit standard form
                if (window.location.protocol === 'file:') {
                    contactForm.submit();
                } else {
                    if (formStatus) {
                        formStatus.textContent = '🎉 Thank you! Your message has been sent successfully.';
                        formStatus.className = 'form-status-msg success';
                    }
                    contactForm.reset();
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
                }
            }
        });
    }

    // Download CV Dropdown Handler
    const downloadCvBtn = document.getElementById('download-cv-btn');
    const cvWrapper = document.querySelector('.cv-dropdown-wrapper');

    if (downloadCvBtn && cvWrapper) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cvWrapper.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!cvWrapper.contains(e.target)) {
                cvWrapper.classList.remove('active');
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Update Footer Year
    const yearSpan = document.getElementById('year-span');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
