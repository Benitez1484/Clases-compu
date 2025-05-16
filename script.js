// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Animación para la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // Configurar la observación para animación al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                    setTimeout(() => {
                        const dot = entry.target.querySelector('.timeline-dot');
                        if (dot) dot.classList.add('animate-dot');
                    }, 300);
                }
            });
        }, {
            threshold: 0.2
        });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Resaltar la clase actual en la página de detalle
    const currentClassPage = document.querySelector('.class-detail');
    if (currentClassPage) {
        const classNumber = currentClassPage.getAttribute('data-class-number');
        const breadcrumb = document.querySelector('.breadcrumb');
        
        if (breadcrumb) {
            breadcrumb.textContent = `Clase ${classNumber}`;
        }
        
        // Configurar navegación entre clases
        setupNavigation(parseInt(classNumber));
    }
});

// Configurar la navegación entre clases
function setupNavigation(currentClass) {
    const prevBtn = document.querySelector('.prev-class');
    const nextBtn = document.querySelector('.next-class');
    
    if (prevBtn) {
        if (currentClass > 1) {
            prevBtn.href = `clase${currentClass - 1}.html`;
        } else {
            prevBtn.classList.add('disabled');
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    }
    
    if (nextBtn) {
        if (currentClass < 12) {
            nextBtn.href = `clase${currentClass + 1}.html`;
        } else {
            nextBtn.classList.add('disabled');
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    }
}

// Animación para el resaltado de código
document.querySelectorAll('.script-example').forEach(block => {
    block.addEventListener('click', function() {
        this.classList.toggle('highlighted');
    });
});

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes scaleIn {
        from { transform: scale(0); }
        to { transform: scale(1); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .animate-timeline .timeline-card {
        animation: fadeIn 0.8s ease forwards;
    }
    
    .animate-dot {
        animation: scaleIn 0.5s ease forwards, pulse 2s infinite 1s;
    }
    
    .timeline-item:nth-child(odd) .timeline-card {
        opacity: 0;
        transform: translateX(-30px);
    }
    
    .timeline-item:nth-child(even) .timeline-card {
        opacity: 0;
        transform: translateX(30px);
    }
    
    .animate-timeline:nth-child(odd) .timeline-card {
        animation: slideIn 0.8s ease forwards;
    }
    
    .animate-timeline:nth-child(even) .timeline-card {
        animation: slideIn 0.8s ease forwards;
    }
    
    .highlighted {
        background-color: #f0f8ff;
        border-left: 3px solid #4285F4;
    }
    
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);