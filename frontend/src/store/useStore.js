import { create } from 'zustand';

const useStore = create((set) => ({
    dateRange: '7d',
    department: 'All',
    predictionConfidence: 85,
    alertThreshold: 70,
    isDarkMode: true,

    setDateRange: (range) => set({ dateRange: range }),
    setDepartment: (dept) => set({ department: dept }),
    setPredictionConfidence: (conf) => set({ predictionConfidence: conf }),
    setAlertThreshold: (threshold) => set({ alertThreshold: threshold }),
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state })),
}));

export default useStore;
