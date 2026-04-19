// ------------------
// Light/Dark mode toggle
// ------------------
const toggleBtn = document.getElementById('toggleMode');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = 'Light Mode';
}

// ------------------
// Certificate Lightbox
// ------------------
const lightbox = document.getElementById('certLightbox');
const lightboxImg = lightbox.querySelector('img');
const certs = document.querySelectorAll('.cert-img');
const closeBtn = document.getElementById('closeLightbox');

certs.forEach(cert => {
    cert.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = cert.src;
        lightboxImg.alt = cert.alt;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close button
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    document.body.style.overflow = ''; // Restore scrolling
});

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }
});

// ------------------
// Toast Notification System
// ------------------
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    const colors = {
        success: '#1da1f2',
        error: '#e74c3c',
        warning: '#f39c12'
    };
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${colors[type] || colors.success};
        color: #fff;
        padding: 12px 24px;
        border-radius: 10px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
        z-index: 9999;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 500);
    }, 3000);
}

// ------------------
// Download Resume Functionality - Downloads the actual PDF file
// ------------------
const resumeBtn = document.getElementById('downloadResume');

// This function downloads the actual PDF file you provided
function downloadActualResumePDF() {
    // Create a link to the PDF file
    // IMPORTANT: Place your PDF file named "Nocum_John_Russel_Resumea.pdf" in the same folder as your HTML file
    const pdfPath = 'Nocum_John_Russel_Resumea.pdf';
    
    // Create an anchor element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'John_Russel_E_Nocum_Resume.pdf'; // Custom download filename
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('✅ Resume downloaded successfully!');
}

resumeBtn.addEventListener('click', downloadActualResumePDF);

// ------------------
// Email Button
// ------------------
const emailBtn = document.getElementById('sendEmail');
emailBtn.addEventListener('click', () => {
    window.location.href = 'mailto:joen.nocum.au@phinmaed.com?subject=Job Opportunity&body=Hello John Russel,';
    showToast('📧 Opening email client...');
});

// ------------------
// Call Button
// ------------------
const callBtn = document.getElementById('callMe');
callBtn.addEventListener('click', () => {
    window.location.href = 'tel:09128294894';
    showToast('📞 Initiating call...');
});

// ------------------
// Floating Download Button (Optional)
// ------------------
const floatBtn = document.createElement('button');
floatBtn.innerHTML = '📄 Download Resume';
floatBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 12px 24px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    z-index: 999;
    font-family: 'Roboto', sans-serif;
`;

floatBtn.addEventListener('mouseenter', () => {
    floatBtn.style.transform = 'scale(1.1)';
    floatBtn.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
});
floatBtn.addEventListener('mouseleave', () => {
    floatBtn.style.transform = 'scale(1)';
    floatBtn.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
});
floatBtn.addEventListener('click', downloadActualResumePDF);

// Only add floating button on desktop
if (window.innerWidth > 768) {
    document.body.appendChild(floatBtn);
}

// ------------------
// Smooth Scrolling for Anchor Links
// ------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ------------------
// Animate sections on scroll
// ------------------
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ------------------
// Console log for development
// ------------------
console.log('Portfolio website loaded successfully!');