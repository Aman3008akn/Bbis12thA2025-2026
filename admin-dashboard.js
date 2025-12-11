// Admin Dashboard JavaScript
let currentSection = 'dashboard';
let currentFormType = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadDashboardData();
    setupRealtimeListeners();
});

function initializeEventListeners() {
    // Sidebar Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            switchSection(section);
            
            // Update active nav item
            navItems.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add buttons
    document.getElementById('addImageBtn').addEventListener('click', () => openFormModal('image'));
    document.getElementById('addHighlightBtn').addEventListener('click', () => openFormModal('highlight'));
    document.getElementById('addTeacherBtn').addEventListener('click', () => openFormModal('teacher'));

    // Form submission
    document.getElementById('itemForm').addEventListener('submit', handleFormSubmit);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

function switchSection(section) {
    currentSection = section;
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('active'));
    
    // Show selected section
    document.getElementById(section).classList.add('active');
    
    // Update title
    const titles = {
        dashboard: 'Dashboard',
        gallery: 'Manage Gallery',
        highlights: 'Manage Highlights',
        teachers: 'Manage Teachers',
        memories: 'Submitted Memories',
        settings: 'Settings'
    };
    document.getElementById('sectionTitle').textContent = titles[section];

    // Load section data
    if(section === 'gallery') loadGallery();
    if(section === 'highlights') loadHighlights();
    if(section === 'teachers') loadTeachers();
    if(section === 'memories') loadMemories();
    if(section === 'activity-logs') loadActivityLogs();
}

// Dashboard
function loadDashboardData() {
    // Fetch counts from Supabase
    updateStats();
    loadRecentActivity();
}

function updateStats() {
    // Mock data - replace with Supabase queries
    document.getElementById('galleryCount').textContent = '1';
    document.getElementById('memoriesCount').textContent = '0';
    document.getElementById('teachersCount').textContent = '1';
    document.getElementById('highlightsCount').textContent = '2';
}

function loadRecentActivity() {
    const activities = [
        { time: 'Just now', action: 'Rajesh added to Teachers', icon: 'fas fa-user-plus' },
        { time: '2 hours ago', action: 'Gallery image updated', icon: 'fas fa-image' },
        { time: '1 day ago', action: 'Website went live', icon: 'fas fa-globe' }
    ];

    const activityList = document.getElementById('activityList');
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <i class="${activity.icon}"></i>
            <strong>${activity.action}</strong>
            <small style="color: var(--text-muted); margin-left: auto;">${activity.time}</small>
        </div>
    `).join('');
}

// Gallery Management
function loadGallery() {
    const galleryList = document.getElementById('galleryList');
    
    // Mock data - replace with Supabase query
    const gallery = [
        {
            id: 1,
            url: 'https://i.ibb.co/6JN2L8PM/Whats-App-Image-2025-12-11-at-11-39-17-PM.jpg',
            alt: 'Class 12th A ❤️',
            uploadedAt: '2025-12-12'
        }
    ];

    galleryList.innerHTML = gallery.map(item => `
        <div class="item-card">
            <img src="${item.url}" alt="${item.alt}" class="item-image">
            <div class="item-content">
                <div class="item-title">${item.alt}</div>
                <div class="item-description">Uploaded: ${item.uploadedAt}</div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editGalleryItem(${item.id})">Edit</button>
                    <button class="btn-danger" onclick="deleteGalleryItem(${item.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function editGalleryItem(id) {
    openFormModal('image', id);
}

function deleteGalleryItem(id) {
    if(confirm('Are you sure you want to delete this image?')) {
        console.log('Deleting gallery item:', id);
        loadGallery();
    }
}

// Highlights Management
function loadHighlights() {
    const highlightsList = document.getElementById('highlightsList');
    
    const highlights = [
        {
            id: 1,
            title: 'Farewell Moments',
            description: 'Celebrating our journey with unforgettable memories',
            icon: 'fas fa-camera-retro'
        },
        {
            id: 2,
            title: 'Teachers & Mentors',
            description: 'Invaluable guidance and support from educators',
            icon: 'fas fa-chalkboard-teacher'
        }
    ];

    highlightsList.innerHTML = highlights.map(item => `
        <div class="item-card">
            <div style="padding: 2rem; text-align: center; background: rgba(111, 140, 255, 0.1);">
                <i class="${item.icon}" style="font-size: 3rem; color: var(--neon-accent);"></i>
            </div>
            <div class="item-content">
                <div class="item-title">${item.title}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editHighlight(${item.id})">Edit</button>
                    <button class="btn-danger" onclick="deleteHighlight(${item.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function editHighlight(id) {
    openFormModal('highlight', id);
}

function deleteHighlight(id) {
    if(confirm('Are you sure you want to delete this highlight?')) {
        console.log('Deleting highlight:', id);
        loadHighlights();
    }
}

// Teachers Management
function loadTeachers() {
    const teachersList = document.getElementById('teachersList');
    
    const teachers = [
        {
            id: 1,
            name: 'Rajesh',
            department: '',
            image: ''
        }
    ];

    teachersList.innerHTML = teachers.map(teacher => `
        <div class="item-card">
            <div style="padding: 2rem; text-align: center; background: rgba(111, 140, 255, 0.1);">
                <i class="fas fa-user-circle" style="font-size: 3rem; color: var(--neon-accent);"></i>
            </div>
            <div class="item-content">
                <div class="item-title">${teacher.name}</div>
                <div class="item-description">${teacher.department || 'No department'}</div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editTeacher(${teacher.id})">Edit</button>
                    <button class="btn-danger" onclick="deleteTeacher(${teacher.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function editTeacher(id) {
    openFormModal('teacher', id);
}

function deleteTeacher(id) {
    if(confirm('Are you sure you want to delete this teacher?')) {
        console.log('Deleting teacher:', id);
        loadTeachers();
    }
}

// Memories Management
function loadMemories() {
    const memoriesList = document.getElementById('memoriesList');
    
    const memories = [];

    memoriesList.innerHTML = memories.length > 0 
        ? memories.map(memory => `
            <div class="item-card">
                <div class="item-content">
                    <div class="item-title">${memory.name}</div>
                    <div class="item-description">${memory.memory}</div>
                    <small style="color: var(--text-muted);">${memory.email}</small>
                </div>
            </div>
        `).join('')
        : '<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">No memories submitted yet.</p>';
}

// Forms
function openFormModal(type, id = null) {
    currentFormType = type;
    const modal = document.getElementById('formModal');
    const formFields = document.getElementById('formFields');
    
    let fields = '';
    
    if(type === 'image') {
        document.getElementById('modalTitle').textContent = id ? 'Edit Image' : 'Add Image';
        fields = `
            <div class="form-group">
                <label>Image URL</label>
                <input type="text" name="imageUrl" class="form-input" placeholder="Enter image URL" required>
            </div>
            <div class="form-group">
                <label>Alt Text</label>
                <input type="text" name="altText" class="form-input" placeholder="Enter alt text" required>
            </div>
        `;
    } else if(type === 'highlight') {
        document.getElementById('modalTitle').textContent = id ? 'Edit Highlight' : 'Add Highlight';
        fields = `
            <div class="form-group">
                <label>Title</label>
                <input type="text" name="title" class="form-input" placeholder="Enter title" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description" class="form-textarea" placeholder="Enter description" required></textarea>
            </div>
            <div class="form-group">
                <label>Icon Class</label>
                <input type="text" name="icon" class="form-input" placeholder="e.g., fas fa-camera-retro" required>
            </div>
        `;
    } else if(type === 'teacher') {
        document.getElementById('modalTitle').textContent = id ? 'Edit Teacher' : 'Add Teacher';
        fields = `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" class="form-input" placeholder="Enter teacher name" required>
            </div>
            <div class="form-group">
                <label>Department</label>
                <input type="text" name="department" class="form-input" placeholder="Enter department">
            </div>
            <div class="form-group">
                <label>Image URL</label>
                <input type="text" name="imageUrl" class="form-input" placeholder="Enter image URL">
            </div>
        `;
    }
    
    formFields.innerHTML = fields;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('formModal').classList.remove('active');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    console.log(`Saving ${currentFormType}:`, data);
    
    // Save to Supabase
    if(currentFormType === 'image') {
        console.log('Adding image to database');
        loadGallery();
    } else if(currentFormType === 'highlight') {
        console.log('Adding highlight to database');
        loadHighlights();
    } else if(currentFormType === 'teacher') {
        console.log('Adding teacher to database');
        loadTeachers();
    }
    
    closeModal();
}

function saveSetting(key) {
    const value = document.getElementById(key).value;
    console.log(`Saving setting ${key}:`, value);
    // Save to Supabase
}

// Realtime Updates
function setupRealtimeListeners() {
    // Setup Supabase realtime subscriptions
    console.log('Realtime listeners configured');
    
    // Update connection status
    updateConnectionStatus(true);
}

function updateConnectionStatus(isConnected) {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    
    if(isConnected) {
        statusDot.style.color = 'var(--success)';
        statusText.textContent = 'Connected';
    } else {
        statusDot.style.color = 'var(--danger)';
        statusText.textContent = 'Disconnected';
    }
}

function logout() {
    if(confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully');
        // Redirect to login
    }
}

// Activity Logs Functions
function loadActivityLogs() {
    const activityLogsBody = document.getElementById('activityLogsBody');
    
    // Mock data - replace with Supabase query
    const mockLogs = [
        { timestamp: '2025-12-12 14:32:15', deviceType: 'Mobile', browser: 'Chrome 131', os: 'iOS', action: 'Form Submitted', page: 'Memory Form', resolution: 'Safari' },
        { timestamp: '2025-12-12 14:25:42', deviceType: 'Desktop', browser: 'Chrome 131', os: 'Windows', action: 'Gallery Image Viewed', page: 'Gallery', resolution: '1920x1080' },
        { timestamp: '2025-12-12 14:15:20', deviceType: 'Tablet', browser: 'Safari 537', os: 'iPadOS', action: 'Page View', page: 'Website Visit', resolution: '1024x768' },
        { timestamp: '2025-12-12 14:05:33', deviceType: 'Mobile', browser: 'Chrome 131', os: 'Android', action: 'Section Viewed', page: 'Highlights', resolution: '375x812' },
        { timestamp: '2025-12-12 13:58:12', deviceType: 'Desktop', browser: 'Firefox 133', os: 'Linux', action: 'Page View', page: 'Website Visit', resolution: '1366x768' }
    ];

    activityLogsBody.innerHTML = mockLogs.map(log => `
        <tr>
            <td>${log.timestamp}</td>
            <td><span class="device-badge ${log.deviceType.toLowerCase()}">${log.deviceType}</span></td>
            <td>${log.browser}</td>
            <td>${log.os}</td>
            <td>${log.action}</td>
            <td>${log.page}</td>
            <td>${log.resolution}</td>
        </tr>
    `).join('');

    // Update stats
    updateActivityStats(mockLogs);
}

function updateActivityStats(logs) {
    const totalVisitors = new Set(logs.map(l => l.timestamp)).size;
    const desktopCount = logs.filter(l => l.deviceType === 'Desktop').length;
    const mobileCount = logs.filter(l => l.deviceType === 'Mobile').length;
    const tabletCount = logs.filter(l => l.deviceType === 'Tablet').length;

    document.getElementById('totalVisitors').textContent = logs.length;
    document.getElementById('desktopUsers').textContent = desktopCount;
    document.getElementById('mobileUsers').textContent = mobileCount;
    document.getElementById('tabletUsers').textContent = tabletCount;
}

function exportActivityLogs() {
    const table = document.getElementById('activityLogsTable');
    let csv = 'Timestamp,Device Type,Browser,OS,Action,Page,IP/Resolution\n';
    
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => `"${cell.textContent.trim()}"`).join(',');
        csv += rowData + '\n';
    });

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

// Utility Functions
function showNotification(message, type = 'success') {
    console.log(`${type.toUpperCase()}: ${message}`);
    // Can add toast notification library here
}
