// Time tracking data management
const TimeTracker = {
    // Get today's date in YYYY-MM-DD format
    getTodayDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    },

    // Get the start of the current week (Sunday)
    getWeekStart() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const diff = now.getDate() - day;
        return new Date(now.setDate(diff));
    },

    // Format date as YYYY-MM-DD
    formatDate(date) {
        return date.toISOString().split('T')[0];
    },

    // Format date for display (e.g., "Sunday, March 17")
    formatDateDisplay(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    },

    // Calculate time difference between two times
    calculateTimeDifference(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
        const diffMs = end - start;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${diffHours}:${diffMinutes.toString().padStart(2, '0')}`;
    },

    // Calculate total hours for a day's entries
    calculateDayTotal(entries) {
        let totalMinutes = 0;
        for (let i = 0; i < entries.length - 1; i += 2) {
            if (entries[i + 1]) {
                const startTime = entries[i].time;
                const endTime = entries[i + 1].time;
                const start = new Date(`1970-01-01T${startTime}`);
                const end = new Date(`1970-01-01T${endTime}`);
                totalMinutes += (end - start) / (1000 * 60);
            }
        }
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    },

    // Load time entries from localStorage for a specific date
    loadTimeEntries(date) {
        const savedData = localStorage.getItem('timeEntries');
        if (savedData) {
            const data = JSON.parse(savedData);
            if (data.date === date) {
                return data.entries;
            }
        }
        return [];
    },

    // Save time entries to localStorage
    saveTimeEntries(entries, isClockedIn) {
        const today = this.getTodayDate();
        const data = {
            date: today,
            entries: entries,
            isClockedIn: isClockedIn
        };
        localStorage.setItem('timeEntries', JSON.stringify(data));
    },

    // Get current time in HH:mm format
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Get current time with seconds in HH:mm:ss format
    getCurrentTimeWithSeconds() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}; 