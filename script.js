/**
 * ==============================================================================
 * MANASA - DEVOPS ENGINEER PORTFOLIO JAVASCRIPT
 * Features:
 *   1. Responsive Navigation & Mobile Drawer with Accessibility
 *   2. Sticky Header Styling & Dynamic Active Nav Item on Scroll
 *   3. Scroll Reveal Animations (Intersection Observer)
 *   4. Client-side Form Validation & Mailto Generator
 *   5. Clipboard Copy Functionality with Toast Notifications
 *   6. Project Architecture Details Modal (Accessible Dialog)
 *   7. Back to Top Scroll Behavior & Dynamic Copyright Year
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. CONSTANTS & DOM REFERENCES
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  
  const contactForm = document.getElementById('contact-form');
  const feedbackCard = document.getElementById('form-feedback-card');
  const feedbackSenderName = document.getElementById('feedback-sender-name');
  const feedbackMailtoBtn = document.getElementById('feedback-mailto-btn');
  const feedbackCopyBtn = document.getElementById('feedback-copy-btn');
  const feedbackResetBtn = document.getElementById('feedback-reset-btn');

  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  const backToTopBtn = document.getElementById('back-to-top-btn');
  const currentYearSpan = document.getElementById('current-year');

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  let activeModalTrigger = null;

  /* --------------------------------------------------------------------------
     2. DYNAMIC COPYRIGHT YEAR
     -------------------------------------------------------------------------- */
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     3. STICKY HEADER & ACTIVE SECTION ON SCROLL
     -------------------------------------------------------------------------- */
  const handleScrollHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active section indicator via IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          updateActiveNavLink(id);
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  function updateActiveNavLink(currentId) {
    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  function openMobileNav() {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileCloseBtn.focus();
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburgerBtn.focus();
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMobileNav);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
      if (projectModal && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    }
  });

  /* --------------------------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.card, .section-header, .highlight-item, .timeline-item'
    );

    revealTargets.forEach(el => el.classList.add('reveal-init'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
     6. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     7. COPY EMAIL TO CLIPBOARD
     -------------------------------------------------------------------------- */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'manasavenu88914@gmail.com';
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('Email address copied to clipboard!');
        })
        .catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast('Email address copied to clipboard!');
        });
    });
  }

  /* --------------------------------------------------------------------------
     8. CLIENT-SIDE CONTACT FORM VALIDATION & MAILTO PREPARATION
     -------------------------------------------------------------------------- */
  if (contactForm) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    let preparedPayload = null;

    function validateField(input, errorElement, validationFn, errorMessage) {
      const value = input.value.trim();
      const isValid = validationFn(value);
      if (!isValid) {
        input.classList.add('is-invalid');
        errorElement.textContent = errorMessage;
        return false;
      } else {
        input.classList.remove('is-invalid');
        errorElement.textContent = '';
        return true;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time input listeners to clear errors on correction
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('is-invalid')) {
        validateField(nameInput, nameError, val => val.length >= 2, 'Please enter your name (at least 2 characters).');
      }
    });

    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('is-invalid')) {
        validateField(emailInput, emailError, val => emailRegex.test(val), 'Please provide a valid email address.');
      }
    });

    subjectInput.addEventListener('input', () => {
      if (subjectInput.classList.contains('is-invalid')) {
        validateField(subjectInput, subjectError, val => val.length >= 3, 'Please enter a subject (at least 3 characters).');
      }
    });

    messageInput.addEventListener('input', () => {
      if (messageInput.classList.contains('is-invalid')) {
        validateField(messageInput, messageError, val => val.length >= 10, 'Please write a message with at least 10 characters.');
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, val => val.length >= 2, 'Please enter your name (at least 2 characters).');
      const isEmailValid = validateField(emailInput, emailError, val => emailRegex.test(val), 'Please provide a valid email address.');
      const isSubjectValid = validateField(subjectInput, subjectError, val => val.length >= 3, 'Please enter a subject (at least 3 characters).');
      const isMessageValid = validateField(messageInput, messageError, val => val.length >= 10, 'Please write a message with at least 10 characters.');

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        preparedPayload = { name, email, subject, message };

        // Construct prefilled mailto
        const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);
        const mailtoBody = encodeURIComponent(`Hi Manasa,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`);
        const mailtoUrl = `mailto:manasavenu88914@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        // Populate feedback card
        feedbackSenderName.textContent = name;
        feedbackMailtoBtn.setAttribute('href', mailtoUrl);

        // Hide form and display feedback card
        contactForm.style.display = 'none';
        feedbackCard.classList.remove('hidden');
        feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        // Focus first invalid input
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
      }
    });

    // Copy prepared text button
    if (feedbackCopyBtn) {
      feedbackCopyBtn.addEventListener('click', () => {
        if (!preparedPayload) return;
        const textToCopy = `Subject: ${preparedPayload.subject}\nFrom: ${preparedPayload.name} (${preparedPayload.email})\n\nMessage:\n${preparedPayload.message}`;
        navigator.clipboard.writeText(textToCopy)
          .then(() => showToast('Message content copied to clipboard!'))
          .catch(() => showToast('Unable to copy message.'));
      });
    }

    // Reset button to write another message
    if (feedbackResetBtn) {
      feedbackResetBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = 'block';
        feedbackCard.classList.add('hidden');
        preparedPayload = null;
        nameInput.focus();
      });
    }
  }

  /* --------------------------------------------------------------------------
     9. PROJECT ARCHITECTURE DETAILS MODAL
     -------------------------------------------------------------------------- */
  const projectDetailsData = {
    meditrust: {
      title: 'MediTrust — Architecture & Engineering Breakdown',
      content: `
        <h4 class="modal-section-title">System Overview</h4>
        <p>
          MediTrust is an AI-powered healthcare intelligence platform built to resolve critical challenges in medication safety, specifically predicting harmful Drug–Drug Interactions (DDIs), coordinating multi-tier hospital workflows, and monitoring patient treatment plans.
        </p>

        <h4 class="modal-section-title">Core Architecture & Tech Highlights</h4>
        <ul>
          <li><strong>Graph Neural Network (PyTorch):</strong> Modeled pharmaceutical compounds as molecular graph representations to predict high-risk interaction scores, minimizing adverse clinical reactions.</li>
          <li><strong>Backend Architecture:</strong> Developed structured RESTful services using Python and Django with secure relational persistence in MySQL.</li>
          <li><strong>Cross-Platform Client:</strong> Flutter interface ensuring fluid medical record access across desktop workstations and mobile healthcare tablets.</li>
          <li><strong>AI Integration:</strong> Incorporated Gemini AI for context-aware medical querying and clinical workflow support.</li>
        </ul>

        <h4 class="modal-section-title">DevOps & Infrastructure Learnings</h4>
        <ul>
          <li>Hands-on experience structuring multi-service environments (Django backend + Flutter client + MySQL database).</li>
          <li>Configuring database connection pooling, query efficiency, and environment variable management for sensitive API credentials.</li>
        </ul>
      `
    },
    smartphone: {
      title: 'Smartphone Dependency — Methodology & Insights',
      content: `
        <h4 class="modal-section-title">Project Purpose</h4>
        <p>
          A machine learning web application that classifies behavioral smartphone dependency and predicts potential digital addiction propensity based on structured survey responses.
        </p>

        <h4 class="modal-section-title">Methodology & Algorithms</h4>
        <ul>
          <li><strong>Data Cleansing & Preprocessing:</strong> Handled missing attributes, categorical encoding, and feature scaling using Python and Pandas.</li>
          <li><strong>Machine Learning Models:</strong> Implemented and compared Decision Tree and Random Forest classifiers, evaluating precision, recall, and ROC-AUC scores.</li>
          <li><strong>Web Application Interface:</strong> Built a lightweight Django web platform featuring interactive questionnaire forms, instant model inference pipelines, and visual metric breakdowns.</li>
          <li><strong>Performance Optimization:</strong> Performed hyperparameter tuning to avoid overfitting and ensure stable generalization.</li>
        </ul>

        <h4 class="modal-section-title">DevOps & Automation Replay</h4>
        <ul>
          <li>Built reusable scripts for automated model serialization (Pickle/Joblib) and inference execution upon web requests.</li>
          <li>Practiced clean separation of machine learning inference pipelines from web request handlers.</li>
        </ul>
      `
    }
  };

  function openProjectModal(projectKey, triggerElement) {
    const data = projectDetailsData[projectKey];
    if (!data) return;

    activeModalTrigger = triggerElement;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (activeModalTrigger) {
      activeModalTrigger.focus();
      activeModalTrigger = null;
    }
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey, btn);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalDismissBtn) {
    modalDismissBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

});
