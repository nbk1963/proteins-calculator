// Tool Data - Array of all tools with their properties
const tools = [
    {
        id: 1,
        name: "Terabox Player Online",
        description: "Watch Terabox videos online without downloading. Supports HD quality streaming.",
        icon: "fas fa-play-circle",
        color: "#8b5cf6",
        category: "video"
    },
    {
        id: 2,
        name: "iFunny Video Downloader",
        description: "Download videos from iFunny with high quality. Save funny clips to your device.",
        icon: "fas fa-download",
        color: "#3b82f6",
        category: "video"
    },
    {
        id: 3,
        name: "Instagram Reels Downloader",
        description: "Download Instagram Reels videos in HD quality. Save reels without watermark.",
        icon: "fab fa-instagram",
        color: "#ec4899",
        category: "video"
    },
    {
        id: 4,
        name: "YouTube Video Downloader",
        description: "Download YouTube videos in multiple formats and resolutions including MP4, WEBM.",
        icon: "fab fa-youtube",
        color: "#ef4444",
        category: "video"
    },
    {
        id: 5,
        name: "TikTok Video Downloader",
        description: "Download TikTok videos without watermark. Save TikTok clips in high quality.",
        icon: "fab fa-tiktok",
        color: "#000000",
        category: "video"
    },
    {
        id: 6,
        name: "Facebook Video Downloader",
        description: "Download videos from Facebook posts, reels, and stories in HD quality.",
        icon: "fab fa-facebook",
        color: "#2563eb",
        category: "video"
    },
    {
        id: 7,
        name: "Twitter/X Video Downloader",
        description: "Download videos from Twitter/X posts. Save tweets with video content.",
        icon: "fab fa-twitter",
        color: "#1d9bf0",
        category: "video"
    },
    {
        id: 8,
        name: "Pinterest Video Downloader",
        description: "Download videos from Pinterest pins. Save creative video content.",
        icon: "fab fa-pinterest",
        color: "#e60023",
        category: "video"
    },
    {
        id: 9,
        name: "MP3 Converter",
        description: "Convert video files to MP3 audio format. Extract audio from videos.",
        icon: "fas fa-file-audio",
        color: "#10b981",
        category: "audio"
    },
    {
        id: 10,
        name: "Image Compressor",
        description: "Compress images without losing quality. Reduce file size for web use.",
        icon: "fas fa-compress-alt",
        color: "#f59e0b",
        category: "image"
    },
    {
        id: 11,
        name: "PDF to Word",
        description: "Convert PDF files to editable Word documents. Preserve formatting.",
        icon: "fas fa-file-word",
        color: "#3b82f6",
        category: "document"
    },
    {
        id: 12,
        name: "QR Code Generator",
        description: "Create custom QR codes for URLs, text, contact info, and more.",
        icon: "fas fa-qrcode",
        color: "#6366f1",
        category: "utility"
    },
    {
        id: 13,
        name: "URL Shortener",
        description: "Shorten long URLs to make them easier to share. Track click analytics.",
        icon: "fas fa-link",
        color: "#8b5cf6",
        category: "utility"
    },
    {
        id: 14,
        name: "AI Image Upscaler",
        description: "Enhance image resolution using AI. Upscale images without quality loss.",
        icon: "fas fa-image",
        color: "#ec4899",
        category: "image"
    },
    {
        id: 15,
        name: "Terabox Video Downloader",
        description: "Download videos from Terabox to your device. Supports multiple resolutions.",
        icon: "fas fa-cloud-download-alt",
        color: "#8b5cf6",
        category: "video"
    }
];

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const urlInput = document.getElementById('urlInput');
const processBtn = document.getElementById('processBtn');
const errorTooltip = document.getElementById('errorTooltip');
const urlInputGroup = document.getElementById('urlInputGroup');
const toolsGrid = document.getElementById('toolsGrid');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// URL Input Validation
processBtn.addEventListener('click', () => {
    if (!urlInput.value.trim()) {
        errorTooltip.style.display = 'block';
        urlInputGroup.style.position = 'relative';
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorTooltip.style.display = 'none';
        }, 3000);
        
        // Focus on input
        urlInput.focus();
    } else {
        errorTooltip.style.display = 'none';
        // In a real app, this would process the URL
        alert(`Processing URL: ${urlInput.value}\n\nThis is a demo. In a real application, this would fetch and process the video.`);
    }
});

// Function to render tools in the grid
function renderTools() {
    toolsGrid.innerHTML = '';
    
    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        
        toolCard.innerHTML = `
            <div class="tool-icon" style="background-color: ${tool.color}">
                <i class="${tool.icon}"></i>
            </div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <div class="tool-footer">
                <span class="tool-category">${tool.category.charAt(0).toUpperCase() + tool.category.slice(1)} Tool</span>
                <button class="btn-tool open-tool" data-id="${tool.id}">Open Tool</button>
            </div>
        `;
        
        toolsGrid.appendChild(toolCard);
    });
    
    // Add event listeners to tool buttons
    const openToolButtons = document.querySelectorAll('.open-tool');
    openToolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolId = this.getAttribute('data-id');
            const tool = tools.find(t => t.id == toolId);
            alert(`Opening: ${tool.name}\n\nThis is a demo. In a real application, this would open the ${tool.name} tool.`);
        });
    });
}

// Add interactivity to language dropdown
const languageBtn = document.querySelector('.language-btn');
if (languageBtn) {
    languageBtn.addEventListener('click', () => {
        alert('Language selector would open here with available languages.');
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderTools();
    
    // Also render tools if page is loaded dynamically
    if (!toolsGrid.innerHTML) {
        renderTools();
    }
});
