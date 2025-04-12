import { create } from "zustand"
import { persist } from "zustand/middleware"
import placeholderData, {
  type NeoPrepDashboardData,

  generateActivityHeatmapData,
} from "./placeholder-data"
import { ActivityHeatmapData } from "./types"
// import type { ActivityHeatmapData } from "./types"

// Update the DashboardState interface to include activityHeatmap
interface DashboardState {
  data: NeoPrepDashboardData & {
    activityHeatmap: ActivityHeatmapData
  }
  isLoading: boolean
  error: string | null

  // Actions
  markNotificationAsRead: (id: string) => void
  toggleInsightSaved: (id: string) => void
  updateUserPreferences: (preferences: Partial<{ darkMode: boolean; sidebarCollapsed: boolean }>) => void

  // UI State
  ui: {
    darkMode: boolean
    sidebarCollapsed: boolean
    currentView: "dashboard" | "courses" | "interviews" | "insights" | "skills"
  }
  setCurrentView: (view: "dashboard" | "courses" | "interviews" | "insights" | "skills") => void
  toggleSidebar: () => void
  toggleDarkMode: () => void
}

// Remove the incorrect ActivityHeatmapData definition and generateActivityHeatmapData function
// Use the imported types and functions from placeholder-data instead

// Update the initial state to include activityHeatmap
export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      data: {
        ...placeholderData,
        activityHeatmap: placeholderData.activityHeatmap || generateActivityHeatmapData(),
      },
      isLoading: false,
      error: null,

      // Actions
      markNotificationAsRead: (id: string) =>
        set((state) => ({
          data: {
            ...state.data,
            notifications: state.data.notifications.map((notification) =>
              notification.id === id ? { ...notification, isRead: true } : notification,
            ),
          },
        })),

      toggleInsightSaved: (id: string) =>
        set((state) => ({
          data: {
            ...state.data,
            industryInsights: {
              ...state.data.industryInsights,
              latest: state.data.industryInsights.latest.map((insight) =>
                insight.id === id ? { ...insight, isSaved: !insight.isSaved } : insight,
              ),
              recommended: state.data.industryInsights.recommended.map((insight) =>
                insight.id === id ? { ...insight, isSaved: !insight.isSaved } : insight,
              ),
              saved: state.data.industryInsights.saved.filter((insight) => insight.id !== id),
            },
          },
        })),

      updateUserPreferences: (preferences) =>
        set((state) => ({
          ui: {
            ...state.ui,
            ...preferences,
          },
        })),

      // UI State
      ui: {
        darkMode: false,
        sidebarCollapsed: false,
        currentView: "dashboard",
      },

      setCurrentView: (view) =>
        set((state) => ({
          ui: {
            ...state.ui,
            currentView: view,
          },
        })),

      toggleSidebar: () =>
        set((state) => ({
          ui: {
            ...state.ui,
            sidebarCollapsed: !state.ui.sidebarCollapsed,
          },
        })),

      toggleDarkMode: () =>
        set((state) => ({
          ui: {
            ...state.ui,
            darkMode: !state.ui.darkMode,
          },
        })),
    }),
    {
      name: "neoprep-dashboard-storage",
      partialize: (state) => ({ ui: state.ui }),
    },
  ),
)
