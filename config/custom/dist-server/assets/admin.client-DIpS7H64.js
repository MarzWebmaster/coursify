import { f as api } from "../entry.server.js";
const adminClient = {
  getStats: async () => {
    const response = await api.get("admin/stats");
    return response.data;
  },
  getDashboardData: async (params = {}) => {
    const response = await api.get("admin/dashboard", {
      params: {
        days: params.days || 14,
        limit: params.limit || 10
      }
    });
    return response.data;
  },
  getAllUsers: async (params = {}) => {
    const response = await api.get("admin/users", {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 20,
        search: params.search || void 0
      }
    });
    return response.data;
  },
  getAllAccounts: async (params = {}) => {
    const response = await api.get("admin/accounts", {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 20,
        search: params.search || void 0
      }
    });
    return response.data;
  },
  getUpcomingEvents: async (perPage = 10) => {
    const response = await api.get("admin/events/upcoming", {
      params: {
        per_page: perPage
      }
    });
    return response.data;
  },
  getAllEvents: async (params = {}) => {
    const response = await api.get("admin/events", {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 20,
        search: params.search || void 0,
        sort_by: params.sort_by || "start_date",
        sort_direction: params.sort_direction || "desc"
      }
    });
    return response.data;
  },
  getAllOrders: async (params = {}) => {
    const response = await api.get("admin/orders", {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 20,
        search: params.search || void 0,
        sort_by: params.sort_by || "created_at",
        sort_direction: params.sort_direction || "desc"
      }
    });
    return response.data;
  },
  startImpersonation: async (userId, accountId) => {
    const response = await api.post(`admin/impersonate/${userId}`, {
      account_id: accountId
    });
    return response.data;
  },
  stopImpersonation: async () => {
    const response = await api.post("admin/stop-impersonation");
    return response.data;
  },
  getAccount: async (accountId) => {
    const response = await api.get(`admin/accounts/${accountId}`);
    return response.data;
  },
  getAllConfigurations: async () => {
    const response = await api.get("admin/configurations");
    return response.data;
  },
  createConfiguration: async (data) => {
    const response = await api.post("admin/configurations", data);
    return response.data;
  },
  updateConfiguration: async (configurationId, data) => {
    const response = await api.put(`admin/configurations/${configurationId}`, data);
    return response.data;
  },
  deleteConfiguration: async (configurationId) => {
    const response = await api.delete(`admin/configurations/${configurationId}`);
    return response.data;
  },
  assignOrganizerConfiguration: async (organizerId, configurationId) => {
    const response = await api.put(`admin/organizers/${organizerId}/configuration`, {
      configuration_id: configurationId
    });
    return response.data;
  },
  updateOrganizerConfigurationOverride: async (organizerId, data) => {
    const response = await api.patch(`admin/organizers/${organizerId}/configuration`, data);
    return response.data;
  },
  updateOrganizerVatSetting: async (organizerId, data) => {
    const response = await api.put(`admin/organizers/${organizerId}/vat-settings`, data);
    return response.data;
  },
  getUtmAttributionStats: async (params = {}) => {
    const response = await api.get("admin/attribution/stats", {
      params
    });
    return response.data;
  },
  getAllFailedJobs: async (params = {}) => {
    const response = await api.get("admin/failed-jobs", {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 20,
        search: params.search || void 0,
        queue: params.queue || void 0
      }
    });
    return response.data;
  },
  deleteFailedJob: async (jobId) => {
    const response = await api.delete(`admin/failed-jobs/${jobId}`);
    return response.data;
  },
  deleteAllFailedJobs: async () => {
    const response = await api.delete("admin/failed-jobs");
    return response.data;
  },
  retryFailedJob: async (jobId) => {
    const response = await api.post(`admin/failed-jobs/${jobId}/retry`);
    return response.data;
  },
  retryAllFailedJobs: async () => {
    const response = await api.post("admin/failed-jobs/retry-all");
    return response.data;
  },
  getAllAdminMessages: async (params = {}) => {
    const response = await api.get("admin/messages", {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 20,
        search: params.search || void 0,
        status: params.status || void 0,
        type: params.type || void 0,
        sort_by: params.sort_by || "created_at",
        sort_direction: params.sort_direction || "desc"
      }
    });
    return response.data;
  },
  approveMessage: async (messageId) => {
    const response = await api.post(`admin/messages/${messageId}/approve`);
    return response.data;
  },
  updateAccountMessagingTier: async (accountId, tierId) => {
    const response = await api.put(`admin/accounts/${accountId}/messaging-tier`, {
      messaging_tier_id: tierId
    });
    return response.data;
  },
  updateAccountVerification: async (accountId, isManuallyVerified) => {
    const response = await api.put(`admin/accounts/${accountId}/verification`, {
      is_manually_verified: isManuallyVerified
    });
    return response.data;
  },
  getMessagingTiers: async () => {
    const response = await api.get("admin/messaging-tiers");
    return response.data;
  },
  getDeletionRequests: async (params = {}) => {
    const response = await api.get("admin/deletion-requests", {
      params: {
        page: params.page || 1,
        per_page: params.per_page || 20,
        search: params.search || void 0,
        status: params.status || void 0
      }
    });
    return response.data;
  },
  requestAccountDeletion: async (accountId, reason) => {
    const response = await api.post(`admin/accounts/${accountId}/deletion-request`, {
      reason
    });
    return response.data;
  },
  cancelDeletionRequest: async (deletionRequestId) => {
    const response = await api.delete(`admin/deletion-requests/${deletionRequestId}`);
    return response.data;
  },
  executeDeletionRequest: async (deletionRequestId) => {
    const response = await api.post(`admin/deletion-requests/${deletionRequestId}/execute`);
    return response.data;
  }
};
export {
  adminClient as a
};
