/* SAID Technologies — site navigation (mega menu + mobile drawer).
   Menu data lives here once so every page shares the same navigation.
   Each page sets <html data-root="./"> (or "../", "../../" …) so links resolve from any depth. */
(function () {
  "use strict";

  var NAV = [
    {
      label: "What We Do", href: "what-we-do/index.html", all: "All Solutions",
      intro: "Technology solutions built around your priorities.",
      promo: { img: "assets/img/card-servers.jpg", text: "Have a requirement in mind?", cta: "Discuss Your Requirement", href: "contact/index.html?type=business#enquiry-form" },
      groups: [
        { label: "Infrastructure Solutions", href: "what-we-do/infrastructure-solutions/index.html", items: [
          ["Data Centre Solutions", "what-we-do/infrastructure-solutions/data-centre-solutions/index.html"],
          ["Audio-Visual Solutions", "what-we-do/infrastructure-solutions/audio-visual-solutions/index.html"],
          ["End-User Devices", "what-we-do/infrastructure-solutions/end-user-devices/index.html"],
          ["Device Lifecycle Management", "what-we-do/infrastructure-solutions/device-lifecycle-management/index.html"],
          ["Apple Devices and Services", "what-we-do/infrastructure-solutions/apple-devices-and-services/index.html"],
          ["Mobility Solutions", "what-we-do/infrastructure-solutions/mobility-solutions/index.html"],
          ["Unified Endpoint and Identity Management", "what-we-do/infrastructure-solutions/unified-endpoint-and-identity-management/index.html"],
          ["Warehousing Solutions", "what-we-do/infrastructure-solutions/warehousing-solutions/index.html"]
        ]},
        { label: "Cloud Solutions", href: "what-we-do/cloud-solutions/index.html", items: [
          ["Google Cloud Solutions", "what-we-do/cloud-solutions/google-cloud-solutions/index.html"],
          ["Amazon Web Services", "what-we-do/cloud-solutions/amazon-web-services/index.html"],
          ["Microsoft Azure Solutions", "what-we-do/cloud-solutions/microsoft-azure-solutions/index.html"],
          ["Cloud Migration Solutions", "what-we-do/cloud-solutions/cloud-migration-solutions/index.html"],
          ["Cloud Managed Services", "what-we-do/cloud-solutions/cloud-managed-services/index.html"],
          ["AI-Powered Cloud Workspace Solutions", "what-we-do/cloud-solutions/ai-powered-cloud-workspace-solutions/index.html"]
        ]},
        { label: "Managed Services", href: "what-we-do/managed-services/index.html", items: [
          ["Digital Workplace", "what-we-do/managed-services/digital-workplace/index.html"],
          ["Enterprise Core & Data Centre Services", "what-we-do/managed-services/enterprise-core-and-data-centre-services/index.html"],
          ["Application Operations & Maintenance", "what-we-do/managed-services/application-operations-and-maintenance/index.html"],
          ["Cloud Managed Services", "what-we-do/cloud-solutions/cloud-managed-services/index.html"],
          ["AI-Enabled IT Operations", "what-we-do/managed-services/ai-enabled-it-operations/index.html"],
          ["Network and Infrastructure Managed Services", "what-we-do/managed-services/network-and-infrastructure-managed-services/index.html"]
        ]},
        { label: "Staffing Solutions", href: "what-we-do/staffing-solutions/index.html", items: [
          ["IT Staffing", "what-we-do/staffing-solutions/it-staffing/index.html"],
          ["Technical Resource Deployment", "what-we-do/staffing-solutions/technical-resource-deployment/index.html"],
          ["People Development", "what-we-do/staffing-solutions/people-development/index.html"]
        ]},
        { label: "Annual Maintenance Contract", href: "what-we-do/annual-maintenance-contract/index.html", items: [
          ["IT Spares & Accessories", "what-we-do/annual-maintenance-contract/it-spares-and-accessories/index.html"],
          ["Real-Time Infrastructure Monitoring", "what-we-do/annual-maintenance-contract/real-time-infrastructure-monitoring/index.html"],
          ["Preventive Maintenance", "what-we-do/annual-maintenance-contract/preventive-maintenance/index.html"],
          ["Enterprise AMC Services", "what-we-do/annual-maintenance-contract/enterprise-amc-services/index.html"]
        ]},
        { label: "Data & AI", href: "what-we-do/data-and-ai/index.html", items: [
          ["Data Analytics", "what-we-do/data-and-ai/data-analytics/index.html"],
          ["Business Intelligence", "what-we-do/data-and-ai/business-intelligence/index.html"],
          ["Microsoft Data Solutions", "what-we-do/data-and-ai/microsoft-data-solutions/index.html"],
          ["Data Engineering", "what-we-do/data-and-ai/data-engineering/index.html"],
          ["AI & Machine Learning", "what-we-do/data-and-ai/ai-and-machine-learning/index.html"],
          ["Generative AI", "what-we-do/data-and-ai/generative-ai/index.html"]
        ]},
        { label: "Cybersecurity", href: "what-we-do/cybersecurity/index.html", items: [
          ["Endpoint Security", "what-we-do/cybersecurity/endpoint-security/index.html"],
          ["Data Security", "what-we-do/cybersecurity/data-security/index.html"],
          ["Identity & Access Management", "what-we-do/cybersecurity/identity-and-access-management/index.html"],
          ["Network Security", "what-we-do/cybersecurity/network-security/index.html"],
          ["Cloud Security", "what-we-do/cybersecurity/cloud-security/index.html"],
          ["Operational Technology Security", "what-we-do/cybersecurity/operational-technology-security/index.html"],
          ["Application Security", "what-we-do/cybersecurity/application-security/index.html"]
        ]},
        { label: "Google Workspace", href: "what-we-do/google-workspace/index.html", note: "Bring communication, collaboration and administrative requirements into a structured digital workspace.", items: [] },
        { label: "Managed Print Services", href: "what-we-do/managed-print-services/index.html", note: "Review printing infrastructure, document workflows and support requirements to create a more manageable print environment.", items: [] },
        { label: "ERP & Business Applications", href: "what-we-do/erp-and-business-applications/index.html", note: "Connect business processes through applications selected around operational requirements and integration needs.", items: [] }
      ]
    },
    {
      label: "Industries", href: "industries/index.html", all: "All Industries",
      intro: "Technology priorities shaped by your industry.",
      grid: [
        ["Global Capability Centres", "industries/global-capability-centres/index.html", "Technology for Connected, Distributed Teams"],
        ["Pharma & Healthcare", "industries/pharma-and-healthcare/index.html", "Technology Around Sensitive Information and Essential Workflows"],
        ["BFSI / NBFC", "industries/bfsi-nbfc/index.html", "Plan for Trust, Continuity and Accountability"],
        ["Manufacturing", "industries/manufacturing/index.html", "Connect Enterprise Technology With Operational Needs"],
        ["Automobile", "industries/automobile/index.html", "Support Engineering, Production and Business Workflows"],
        ["Retail", "industries/retail/index.html", "Create Consistency Across Business Locations"],
        ["IT / ITES", "industries/it-ites/index.html", "Equip Teams for Dependable Digital Delivery"],
        ["Media", "industries/media/index.html", "Plan Infrastructure for Demanding Content Workflows"],
        ["Startups", "industries/startups/index.html", "Build a Foundation That Can Grow With Your Business"]
      ]
    },
    {
      label: "Education", href: "education/index.html", all: "Education Overview",
      intro: "Technology that creates space for discovery.",
      promo: { img: "assets/img/education-classroom.jpg", text: "Have a requirement in mind?", cta: "Discuss Your Requirement", href: "contact/index.html?type=education#enquiry-form" },
      groups: [
        { label: "School Education", href: "education/school-education/index.html", items: [
          ["Smart Classrooms", "education/school-education/smart-classrooms/index.html"],
          ["Robotics & AI Labs", "education/school-education/robotics-and-ai-labs/index.html"],
          ["STEM Education", "education/school-education/stem-education/index.html"],
          ["Coding & Innovation Labs", "education/school-education/coding-and-innovation-labs/index.html"],
          ["Digital Learning Solutions", "education/school-education/digital-learning-solutions/index.html"]
        ]},
        { label: "Higher Education", href: "education/higher-education/index.html", items: [
          ["University IT Infrastructure", "education/higher-education/university-it-infrastructure/index.html"],
          ["Advanced Technology Laboratories", "education/higher-education/advanced-technology-laboratories/index.html"],
          ["Research & Innovation Infrastructure", "education/higher-education/research-and-innovation-infrastructure/index.html"],
          ["Digital Campus Solutions", "education/higher-education/digital-campus-solutions/index.html"]
        ]},
        { label: "Centre of Excellence", href: "education/centre-of-excellence/index.html", items: [
          ["Industry 4.0 CoE", "education/centre-of-excellence/industry-4-0-coe/index.html"],
          ["Artificial Intelligence & Machine Learning CoE", "education/centre-of-excellence/ai-and-ml-coe/index.html"],
          ["AR/VR & Digital Twin CoE", "education/centre-of-excellence/ar-vr-and-digital-twin-coe/index.html"],
          ["Electric Vehicle Technology CoE", "education/centre-of-excellence/ev-technology-coe/index.html"],
          ["Semiconductor Technology CoE", "education/centre-of-excellence/semiconductor-technology-coe/index.html"],
          ["Quantum Computing & AI CoE", "education/centre-of-excellence/quantum-computing-and-ai-coe/index.html"],
          ["Cybersecurity & Digital Forensics CoE", "education/centre-of-excellence/cybersecurity-and-digital-forensics-coe/index.html"]
        ]},
        { label: "Digital Education Solutions", href: "education/digital-education-solutions/index.html", items: [
          ["Learning Management Systems", "education/digital-education-solutions/learning-management-systems/index.html"],
          ["Smart E-Libraries", "education/digital-education-solutions/smart-e-libraries/index.html"],
          ["Virtual Classrooms", "education/digital-education-solutions/virtual-classrooms/index.html"],
          ["Digital Content Platforms", "education/digital-education-solutions/digital-content-platforms/index.html"],
          ["Online Learning Infrastructure", "education/digital-education-solutions/online-learning-infrastructure/index.html"]
        ]},
        { label: "Skill Development", href: "education/skill-development/index.html", items: [
          ["Student Technical Training", "education/skill-development/student-technical-training/index.html"],
          ["Faculty Development Programmes", "education/skill-development/faculty-development-programmes/index.html"],
          ["Industry-Oriented Certification Training", "education/skill-development/industry-oriented-certification-training/index.html"],
          ["Internship Enablement", "education/skill-development/internship-enablement/index.html"],
          ["Employability Skill Development", "education/skill-development/employability-skill-development/index.html"]
        ]},
        { label: "CSR Education Solutions", href: "education/csr-education-solutions/index.html", items: [
          ["CSR-Funded Smart Classrooms", "education/csr-education-solutions/csr-funded-smart-classrooms/index.html"],
          ["Robotics & STEM Labs", "education/csr-education-solutions/robotics-and-stem-labs/index.html"],
          ["Digital Literacy Initiatives", "education/csr-education-solutions/digital-literacy-initiatives/index.html"],
          ["Rural Education Technology", "education/csr-education-solutions/rural-education-technology/index.html"],
          ["Institutional Technology Development", "education/csr-education-solutions/institutional-technology-development/index.html"]
        ]},
        { label: "Education Managed Services", href: "education/education-managed-services/index.html", items: [
          ["Laboratory Maintenance", "education/education-managed-services/laboratory-maintenance/index.html"],
          ["Onsite Technical Support", "education/education-managed-services/onsite-technical-support/index.html"],
          ["Annual Maintenance Contracts", "education/education-managed-services/annual-maintenance-contracts/index.html"],
          ["Training Support", "education/education-managed-services/training-support/index.html"],
          ["Infrastructure Management", "education/education-managed-services/infrastructure-management/index.html"]
        ]}
      ]
    },
    {
      label: "Who We Are", href: "who-we-are/index.html", all: "Go to Who We Are",
      intro: "Connecting business, technology and learning.",
      links: [
        ["About SAID Technologies", "who-we-are/index.html#about"],
        ["Our Vision", "who-we-are/index.html#vision"],
        ["Our Mission", "who-we-are/index.html#mission"],
        ["Our Core Values", "who-we-are/index.html#values"],
        ["Our Approach", "who-we-are/index.html#approach"],
        ["Explore Our Capabilities", "who-we-are/index.html#capabilities"],
        ["Connect With SAID", "who-we-are/index.html#connect"]
      ]
    },
    {
      label: "Careers", href: "careers/index.html", all: "Go to Careers",
      intro: "Build your next chapter with SAID Technologies.",
      links: [
        ["Careers at SAID", "careers/index.html#careers-at-said"],
        ["Areas of Interest", "careers/index.html#areas"],
        ["Current Openings", "careers/index.html#openings"],
        ["Share Your Profile", "careers/index.html#share-profile"]
      ]
    },
    {
      label: "Insights", href: "insights/index.html", all: "Go to Insights",
      intro: "Perspectives for better technology decisions.",
      links: [
        ["Blogs", "insights/blogs/index.html", "Original articles that explain technology concepts, planning considerations and practical applications."],
        ["Case Studies", "insights/case-studies/index.html", "Approved customer stories describing the requirement, agreed solution and verified outcomes."],
        ["Events", "insights/events/index.html", "Confirmed workshops, demonstrations, webinars and institutional engagements."],
        ["News", "insights/news/index.html", "Verified company announcements and developments."]
      ]
    }
  ];

  var CONTACT = {
    label: "Contact Us", href: "contact/index.html", all: "Go to Contact Us",
    links: [
      ["Business Enquiries", "contact/index.html?type=business#enquiry-form"],
      ["Education Enquiries", "contact/index.html?type=education#enquiry-form"],
      ["Corporate Contact Details", "contact/index.html#details"],
      ["Discuss Your Requirement", "contact/index.html#enquiry-form"]
    ]
  };

  var root = document.documentElement.getAttribute("data-root") || "./";
  var current = document.documentElement.getAttribute("data-section") || "";
  var url = function (p) { return root + p; };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var arrow = '<span class="arrow" aria-hidden="true">→</span>';
  var mqDesktop = window.matchMedia("(min-width: 64rem)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Desktop mega menu ---------- */

  function groupPane(g, i) {
    var body;
    if (g.items.length) {
      body = '<ul class="mega-links">' + g.items.map(function (it) {
        return '<li><a href="' + url(it[1]) + '">' + esc(it[0]) + "</a></li>";
      }).join("") + "</ul>";
    } else {
      body = '<p class="mega-note">' + esc(g.note) + "</p>";
    }
    return '<div class="mega-pane" id="pane-' + i + '" role="region" aria-label="' + esc(g.label) + '"' + (i === 0 ? "" : " hidden") + ">" +
      '<p class="mega-pane-title">' + esc(g.label) + "</p>" + body +
      '<a class="text-link" href="' + url(g.href) + '">View ' + esc(g.label) + " " + arrow + "</a></div>";
  }

  function panelHTML(item, idx) {
    var head = '<div class="mega-intro"><p class="eyebrow">' + esc(item.label) + "</p>" +
      '<p class="mega-intro-text">' + esc(item.intro || "") + "</p>" +
      '<a class="text-link" href="' + url(item.href) + '">' + esc(item.all) + " " + arrow + "</a></div>";

    if (item.groups) {
      var tabs = item.groups.map(function (g, i) {
        return '<li><a class="mega-tab" href="' + url(g.href) + '" data-pane="' + idx + "-" + i + '"' +
          (i === 0 ? ' aria-current="true"' : "") + ">" + esc(g.label) +
          '<span class="chev" aria-hidden="true">›</span></a></li>';
      }).join("");
      var panes = item.groups.map(function (g, i) {
        return groupPane(g, idx + "-" + i);
      }).join("");
      var promo = item.promo
        ? '<a class="mega-promo" href="' + url(item.promo.href) + '"><img src="' + url(item.promo.img) + '" alt="" loading="lazy">' +
          "<span>" + esc(item.promo.text) + "</span><strong>" + esc(item.promo.cta) + " " + arrow + "</strong></a>"
        : "";
      return '<div class="mega-inner mega-split"><div class="mega-col-a">' + head +
        '<ul class="mega-tabs">' + tabs + "</ul></div>" +
        '<div class="mega-col-b"><div>' + panes + "</div>" + promo + "</div></div>";
    }
    if (item.grid) {
      return '<div class="mega-inner mega-simple">' + head + '<ul class="mega-grid">' +
        item.grid.map(function (g) {
          return '<li><a href="' + url(g[1]) + '"><strong>' + esc(g[0]) + "</strong><span>" + esc(g[2]) + "</span></a></li>";
        }).join("") + "</ul></div>";
    }
    return '<div class="mega-inner mega-simple">' + head + '<ul class="mega-list' + (item.links[0][2] ? " has-desc" : "") + '">' +
      item.links.map(function (l) {
        return '<li><a href="' + url(l[1]) + '"><strong>' + esc(l[0]) + "</strong>" + (l[2] ? "<span>" + esc(l[2]) + "</span>" : "") + "</a></li>";
      }).join("") + "</ul></div>";
  }

  function buildDesktop(nav) {
    var list = document.createElement("ul");
    list.className = "nav-list";
    NAV.forEach(function (item, idx) {
      var li = document.createElement("li");
      li.className = "nav-item";
      var id = "mega-" + idx;
      li.innerHTML =
        '<a class="nav-link' + (current === item.label ? " is-current" : "") + '" href="' + url(item.href) + '"' +
        (current === item.label ? ' aria-current="page"' : "") + ">" + esc(item.label) + "</a>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        '<span class="sr-only">Open ' + esc(item.label) + ' menu</span><span aria-hidden="true" class="caret"></span></button>' +
        '<div class="mega" id="' + id + '" hidden>' + panelHTML(item, idx) + "</div>";
      list.appendChild(li);
    });
    nav.innerHTML = "";
    nav.appendChild(list);
    wireDesktop(list);
  }

  function wireDesktop(list) {
    var openItem = null, openTimer = 0, closeTimer = 0;

    function open(li) {
      if (openItem === li) return;
      close(true);
      openItem = li;
      li.classList.add("is-open");
      li.querySelector(".nav-toggle").setAttribute("aria-expanded", "true");
      li.querySelector(".mega").hidden = false;
    }
    function close(silent) {
      if (!openItem) return;
      openItem.classList.remove("is-open");
      openItem.querySelector(".nav-toggle").setAttribute("aria-expanded", "false");
      openItem.querySelector(".mega").hidden = true;
      openItem = null;
    }

    Array.prototype.forEach.call(list.children, function (li) {
      var toggle = li.querySelector(".nav-toggle");

      li.addEventListener("mouseenter", function () {
        if (!mqDesktop.matches) return;
        clearTimeout(closeTimer);
        clearTimeout(openTimer);
        openTimer = setTimeout(function () { open(li); }, openItem ? 0 : 150);
      });
      li.addEventListener("mouseleave", function () {
        clearTimeout(openTimer);
        closeTimer = setTimeout(close, 200);
      });
      toggle.addEventListener("click", function () {
        if (openItem === li) { close(); } else { open(li); focusFirst(li); }
      });
      li.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && openItem === li) {
          close();
          toggle.focus();
        }
        if (e.key === "ArrowDown" && e.target === toggle) {
          e.preventDefault();
          open(li);
          focusFirst(li);
        }
      });

      // Column A → Column B flyout (submenu shows to the right of the hovered item)
      var tabs = li.querySelectorAll(".mega-tab");
      var hoverTimer = 0;
      Array.prototype.forEach.call(tabs, function (tab) {
        var select = function () {
          Array.prototype.forEach.call(tabs, function (t) {
            t.removeAttribute("aria-current");
            document.getElementById("pane-" + t.getAttribute("data-pane")).hidden = true;
          });
          tab.setAttribute("aria-current", "true");
          document.getElementById("pane-" + tab.getAttribute("data-pane")).hidden = false;
        };
        // short delay so moving diagonally toward column B doesn't switch panes
        tab.addEventListener("mouseenter", function () {
          clearTimeout(hoverTimer);
          hoverTimer = setTimeout(select, 90);
        });
        tab.addEventListener("mouseleave", function () { clearTimeout(hoverTimer); });
        tab.addEventListener("focus", select);
      });
      var colB = li.querySelector(".mega-col-b");
      if (colB) colB.addEventListener("mouseenter", function () { clearTimeout(hoverTimer); });
    });

    document.addEventListener("click", function (e) {
      if (openItem && !openItem.contains(e.target)) close();
    });
    mqDesktop.addEventListener("change", function () { close(); });
  }

  function focusFirst(li) {
    var first = li.querySelector(".mega a");
    if (first) first.focus();
  }

  /* ---------- Mobile drawer ---------- */

  function buildDrawer(drawer) {
    var sections = NAV.concat([CONTACT]).map(function (item, idx) {
      var inner = "";
      if (item.groups) {
        inner = item.groups.map(function (g, gi) {
          if (!g.items.length) return '<li><a class="drawer-link" href="' + url(g.href) + '">' + esc(g.label) + "</a></li>";
          var sid = "dg-" + idx + "-" + gi;
          return '<li><div class="drawer-row"><a class="drawer-link" href="' + url(g.href) + '">' + esc(g.label) + "</a>" +
            '<button type="button" class="drawer-toggle" aria-expanded="false" aria-controls="' + sid + '"><span class="sr-only">Expand ' + esc(g.label) + '</span><span class="caret" aria-hidden="true"></span></button></div>' +
            '<ul class="drawer-sub" id="' + sid + '" hidden>' + g.items.map(function (it) {
              return '<li><a href="' + url(it[1]) + '">' + esc(it[0]) + "</a></li>";
            }).join("") + "</ul></li>";
        }).join("");
      } else {
        inner = (item.grid || item.links).map(function (l) {
          return '<li><a class="drawer-link" href="' + url(l[1]) + '">' + esc(l[0]) + "</a></li>";
        }).join("");
      }
      var sid0 = "ds-" + idx;
      return '<li class="drawer-section"><div class="drawer-row drawer-top"><a class="drawer-link" href="' + url(item.href) + '">' + esc(item.label) + "</a>" +
        '<button type="button" class="drawer-toggle" aria-expanded="false" aria-controls="' + sid0 + '"><span class="sr-only">Expand ' + esc(item.label) + '</span><span class="caret" aria-hidden="true"></span></button></div>' +
        '<ul class="drawer-group" id="' + sid0 + '" hidden>' + inner + "</ul></li>";
    }).join("");

    drawer.querySelector(".drawer-body").innerHTML = '<ul class="drawer-list">' + sections + "</ul>";

    drawer.addEventListener("click", function (e) {
      var btn = e.target.closest(".drawer-toggle");
      if (!btn) return;
      var target = document.getElementById(btn.getAttribute("aria-controls"));
      var willOpen = btn.getAttribute("aria-expanded") !== "true";
      // only one top-level section open at a time
      if (btn.parentNode.classList.contains("drawer-top") && willOpen) {
        Array.prototype.forEach.call(drawer.querySelectorAll(".drawer-top .drawer-toggle[aria-expanded='true']"), function (b) {
          b.setAttribute("aria-expanded", "false");
          document.getElementById(b.getAttribute("aria-controls")).hidden = true;
        });
      }
      btn.setAttribute("aria-expanded", String(willOpen));
      target.hidden = !willOpen;
    });
  }

  function wireDrawer(drawer, openBtn) {
    var closeBtn = drawer.querySelector(".drawer-close");
    var lastFocus = null;

    function focusables() {
      return Array.prototype.filter.call(
        drawer.querySelectorAll("a[href], button:not([disabled])"),
        function (el) { return el.offsetParent !== null; }
      );
    }
    function open() {
      lastFocus = document.activeElement;
      drawer.hidden = false;
      document.body.classList.add("no-scroll");
      openBtn.setAttribute("aria-expanded", "true");
      closeBtn.focus();
    }
    function close() {
      drawer.hidden = true;
      document.body.classList.remove("no-scroll");
      openBtn.setAttribute("aria-expanded", "false");
      if (lastFocus) lastFocus.focus();
    }
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    drawer.querySelector(".drawer-backdrop").addEventListener("click", close);
    drawer.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    mqDesktop.addEventListener("change", function (m) { if (m.matches && !drawer.hidden) close(); });
  }

  /* ---------- Header shadow on scroll ---------- */

  function wireHeader(header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Services loop: autoplay unless reduced motion, with pause control ---------- */

  function wireLoops() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-loop]"), function (box) {
      var video = box.querySelector("video");
      var btn = box.querySelector(".loop-toggle");
      if (!btn) return;
      // CSS-animated tile (used until the client's video loop is supplied)
      if (!video) {
        var setCss = function (paused) {
          box.classList.toggle("is-paused", paused);
          btn.classList.toggle("is-paused", paused);
          btn.setAttribute("aria-pressed", String(paused));
          btn.querySelector(".sr-only").textContent = paused ? "Play animation" : "Pause animation";
        };
        setCss(reduceMotion.matches);
        btn.addEventListener("click", function () { setCss(!box.classList.contains("is-paused")); });
        return;
      }
      var setLabel = function () {
        var paused = video.paused;
        btn.setAttribute("aria-pressed", String(paused));
        btn.querySelector(".sr-only").textContent = paused ? "Play animation" : "Pause animation";
        btn.classList.toggle("is-paused", paused);
      };
      if (!reduceMotion.matches) { video.play().catch(function () {}); }
      btn.addEventListener("click", function () {
        if (video.paused) { video.play().catch(function () {}); } else { video.pause(); }
      });
      video.addEventListener("play", setLabel);
      video.addEventListener("pause", setLabel);
      setLabel();
    });
  }

  /* ---------- Reveal on scroll (once) ---------- */

  function wireReveal() {
    var els = document.querySelectorAll(".reveal, .steps-line");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add("is-visible"); });
      return;
    }
    // stagger siblings in the same list (max 60ms apart, capped)
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) {
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(i % 3, 3) * 60 + "ms";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* ---------- Count-up for portfolio facts ---------- */

  function wireCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) return;
    var run = function (el) {
      var end = parseInt(el.getAttribute("data-count"), 10), start = null, dur = 1200;
      var step = function (t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(nums, function (el) { el.textContent = "0"; io.observe(el); });
  }

  /* ---------- Scroll progress + back to top ---------- */

  function wireScrollUi() {
    var bar = document.querySelector(".scroll-progress span");
    var top = document.querySelector(".to-top");
    if (!bar && !top) return;
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.setProperty("--p", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
      if (top) top.classList.toggle("is-shown", window.scrollY > 600);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
    if (top) top.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
      document.getElementById("main").focus({ preventScroll: true });
    });
  }

  /* ---------- Init ---------- */

  document.documentElement.classList.add("js");
  var nav = document.querySelector("[data-site-nav]");
  var drawer = document.querySelector("[data-drawer]");
  var openBtn = document.querySelector("[data-drawer-open]");
  var header = document.querySelector(".site-header");
  if (nav) buildDesktop(nav);
  if (drawer && openBtn) { buildDrawer(drawer); wireDrawer(drawer, openBtn); }
  if (header) wireHeader(header);
  wireLoops();
  wireReveal();
  wireCounters();
  wireScrollUi();

  /* ---------- Headline words rise in (keeps nested spans such as .accent) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-split]"), function (h) {
    if (reduceMotion.matches) return;
    var i = 0;
    var splitNode = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement("span");
            w.className = "w";
            w.innerHTML = '<span style="--i:' + (i++) + '"></span>';
            w.firstChild.textContent = part;
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          splitNode(child);
        }
      });
    };
    h.setAttribute("aria-label", h.textContent);
    splitNode(h);
    Array.prototype.forEach.call(h.querySelectorAll(".w"), function (w) { w.setAttribute("aria-hidden", "true"); });
  });

  /* ---------- Wipe-in photos + section heading underline ---------- */
  (function () {
    var els = document.querySelectorAll(".wipe, .theme-ember .section-head");
    if (!els.length) return;
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  })();

  /* ---------- 3D tilt on hover (pointer devices only) ---------- */
  if (!reduceMotion.matches && window.matchMedia("(hover: hover)").matches) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-tilt]"), function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", (x * 8).toFixed(2) + "deg");
        el.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
        el.classList.add("is-tilting");
      });
      el.addEventListener("pointerleave", function () { el.classList.remove("is-tilting"); });
    });
  }

  /* ---------- Solutions card: highlight one tag at a time ---------- */
  if (!reduceMotion.matches) {
    Array.prototype.forEach.call(document.querySelectorAll(".sol-card"), function (card) {
      var tags = card.querySelectorAll(".hv-tags li");
      if (!tags.length) return;
      var n = -1;
      setTimeout(function tick() {
        if (n >= 0) tags[n].classList.remove("is-on");
        n = (n + 1) % tags.length;
        tags[n].classList.add("is-on");
        setTimeout(tick, 1300);
      }, 2000);
    });
  }

  /* ---------- Pause looping animations while their block is off screen ---------- */
  if ("IntersectionObserver" in window) {
    var loopers = document.querySelectorAll(".hero, .ticker, .loop-anim, .hub-wrap, .hero-stage, .careers-banner, .process");
    var offIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle("anim-off", !en.isIntersecting); });
    });
    Array.prototype.forEach.call(loopers, function (el) { offIo.observe(el); });
  }

  /* ---------- Services slideshow: photo + name + bar advance together ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".loop-slides"), function (box) {
    var imgs = box.querySelectorAll("img.slide"), names = box.querySelectorAll(".loop-stage li"), bars = box.querySelectorAll(".loop-bar span");
    var count = imgs.length, i = -1;
    var show = function (n) {
      for (var k = 0; k < count; k++) {
        imgs[k].classList.toggle("is-on", k === n);
        if (names[k]) names[k].classList.toggle("is-on", k === n);
        if (bars[k]) { bars[k].classList.toggle("is-on", k === n); bars[k].classList.toggle("is-done", k < n); }
      }
      i = n;
    };
    show(0);
    if (reduceMotion.matches) return;
    setInterval(function () {
      if (document.hidden || box.classList.contains("is-paused") || box.classList.contains("anim-off")) return;
      show((i + 1) % count);
    }, 3000);
  });

  /* ---------- Hub diagram: light one node and its spoke at a time ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".hub"), function (hub) {
    var svg = hub.querySelector(".hub-lines");
    if (reduceMotion.matches) {
      if (svg && svg.pauseAnimations) svg.pauseAnimations();
      return;
    }
    var nodes = hub.querySelectorAll(".hub-node"), spokes = hub.querySelectorAll(".hub-spoke");
    if (!nodes.length) return;
    var n = -1;
    setTimeout(function tick() {
      // skip work while the hub is off screen or the tab is hidden
      if (document.hidden || hub.closest(".anim-off")) { setTimeout(tick, 1400); return; }
      if (n >= 0) { nodes[n].classList.remove("is-on"); if (spokes[n]) spokes[n].classList.remove("is-on"); }
      n = (n + 1) % nodes.length;
      nodes[n].classList.add("is-on");
      if (spokes[n]) spokes[n].classList.add("is-on");
      setTimeout(tick, 1400);
    }, 1800);
  });

  /* ---------- Education explorer: hovered/focused item swaps the photo ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-explorer]"), function (ex) {
    var items = ex.querySelectorAll(".ex-item"), imgs = ex.querySelectorAll(".ex-stage img");
    var count = ex.querySelector(".ex-count b");
    var show = function (i) {
      Array.prototype.forEach.call(items, function (it, k) { it.classList.toggle("is-on", k === i); });
      Array.prototype.forEach.call(imgs, function (im, k) { im.classList.toggle("is-on", k === i); });
      if (count) count.textContent = ("0" + (i + 1)).slice(-2);
    };
    Array.prototype.forEach.call(items, function (it, i) {
      it.addEventListener("mouseenter", function () { show(i); });
      it.addEventListener("focus", function () { show(i); });
    });
  });

  /* ---------- Horizontal rail arrows ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".rail-ctrl"), function (ctrl) {
    var rail = ctrl.closest("section").querySelector(".edu-scroll");
    if (!rail) return;
    var prev = ctrl.querySelector('[data-rail="prev"]'), next = ctrl.querySelector('[data-rail="next"]');
    var step = function () { var c = rail.firstElementChild; return c ? c.getBoundingClientRect().width + 24 : 300; };
    var sync = function () {
      prev.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    };
    var go = function (dir) { rail.scrollBy({ left: dir * step(), behavior: reduceMotion.matches ? "auto" : "smooth" }); };
    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  });

  /* ---------- Spotlight follows the pointer on dark cards ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".card.spot"), function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
})();
