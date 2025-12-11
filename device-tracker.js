// Device Detection and Activity Logging
class DeviceActivityTracker {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.initializeTracking();
    }

    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getDeviceInfo() {
        const ua = navigator.userAgent;
        
        return {
            userAgent: ua,
            deviceType: this.getDeviceType(ua),
            browser: this.getBrowser(ua),
            os: this.getOS(ua),
            screenResolution: `${window.innerWidth}x${window.innerHeight}`,
            language: navigator.language,
            platform: navigator.platform,
            timestamp: new Date().toISOString()
        };
    }

    getDeviceType(ua) {
        if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase())) {
            if (/ipad|android/i.test(ua.toLowerCase())) {
                return 'Tablet';
            }
            return 'Mobile';
        }
        return 'Desktop';
    }

    getBrowser(ua) {
        if (ua.indexOf('Chrome') > -1) {
            const version = ua.match(/Chrome\/(\d+)/);
            return `Chrome ${version ? version[1] : 'Unknown'}`;
        } else if (ua.indexOf('Safari') > -1) {
            const version = ua.match(/Version\/(\d+)/);
            return `Safari ${version ? version[1] : 'Unknown'}`;
        } else if (ua.indexOf('Firefox') > -1) {
            const version = ua.match(/Firefox\/(\d+)/);
            return `Firefox ${version ? version[1] : 'Unknown'}`;
        } else if (ua.indexOf('Edge') > -1) {
            const version = ua.match(/Edge\/(\d+)/);
            return `Edge ${version ? version[1] : 'Unknown'}`;
        } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
            return 'Internet Explorer';
        }
        return 'Unknown';
    }

    getOS(ua) {
        if (ua.indexOf('Windows') > -1) {
            return 'Windows';
        } else if (ua.indexOf('Mac') > -1) {
            return 'macOS';
        } else if (ua.indexOf('Android') > -1) {
            return 'Android';
        } else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
            return 'iOS';
        } else if (ua.indexOf('Linux') > -1) {
            return 'Linux';
        }
        return 'Unknown';
    }

    async logActivity(action, pageVisited = '') {
        const deviceInfo = this.getDeviceInfo();
        
        const logData = {
            action: action,
            user_agent: deviceInfo.userAgent,
            device_type: deviceInfo.deviceType,
            browser: deviceInfo.browser,
            os: deviceInfo.os,
            page_visited: pageVisited || window.location.pathname,
            session_id: this.sessionId,
            referrer: document.referrer || 'direct',
            screen_resolution: deviceInfo.screenResolution,
            language: deviceInfo.language
        };

        try {
            // Log to Supabase if available
            if (window.supabaseClient) {
                // This will be called from admin dashboard
                console.log('Activity logged:', logData);
                return logData;
            }
        } catch (error) {
            console.error('Error logging activity:', error);
        }

        return logData;
    }

    initializeTracking() {
        // Log page view on load
        window.addEventListener('load', () => {
            this.logActivity('Page View', 'Website Visit');
        });

        // Log when user leaves
        window.addEventListener('beforeunload', () => {
            this.logActivity('Page Exit', window.location.pathname);
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('memory-form')) {
                this.logActivity('Form Submitted', 'Memory Form');
            }
        });

        // Track gallery clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.gallery-item')) {
                this.logActivity('Gallery Image Viewed', 'Gallery');
            }
        });

        // Track section scrolling
        let currentSection = 'hero';
        window.addEventListener('scroll', () => {
            const sections = ['gallery', 'highlights', 'teachers', 'memory'];
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top < window.innerHeight / 2) {
                        if (currentSection !== section) {
                            currentSection = section;
                            this.logActivity('Section Viewed', section);
                        }
                    }
                }
            });
        });
    }
}

// Initialize tracker globally
const activityTracker = new DeviceActivityTracker();
