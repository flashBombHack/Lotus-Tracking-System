import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    allTransactions: [],
    CompletedTransactions: [],
    PendingTransactions: [],
    refreshIntervalId: null,
  },
  mutations: {
    setAllTransactions(state, transactions) {
      state.allTransactions = transactions;
    },
    setPendingTransactions(state, transactions) {
      state.PendingTransactions = transactions;
    },
    clearAllTransactions(state) {
      state.allTransactions = [];
    },
    setRefreshIntervalId(state, intervalId) {
      state.refreshIntervalId = intervalId;
    },
    clearRefreshIntervalId(state) {
      state.refreshIntervalId = null;
    },
    removePendingTransaction(state, requestNo) {
      state.PendingTransactions = state.PendingTransactions.filter(transaction => transaction.RequestNo !== requestNo);
    },
    removePendingTransactionsBulk(state, requestNos) {
      state.PendingTransactions = state.PendingTransactions.filter(transaction => !requestNos.includes(transaction.RequestNo));
    },
    removeApprovedTransaction(state, requestNo) {
      state.allTransactions = state.allTransactions.filter(transaction => transaction.RequestNo !== requestNo);
    },
  },
  actions: {
    async fetchAllTransactions({ state, commit }) {
      if (state.allTransactions.length === 0) {
        const token = sessionStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
        };
        try {
          const response = await axios.get('https://automationapi.lotuscapitallimited.com/api/app/getcompletedtransactions', { headers });
          if (response.status === 200) {
            const transactions = response.data.transactions;
            commit('setAllTransactions', transactions);
          } else {
            console.error('Error fetching all transactions:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching all transactions:', error);
        }
      }
    },
    async fetchPendingTransactions({ state, commit }) {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      if (state.PendingTransactions.length === 0) {
        try {
          const response = await axios.get('https://automationapi.lotuscapitallimited.com/api/app/getpostedtransactions', { headers });
          if (response.status === 200) {
            const transactions = response.data.transactions;
            commit('setPendingTransactions', transactions);
          } else {
            console.error('Error fetching all pending transactions:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching all pending transactions:', error);
        }
      }
    },
    async fetchAllTransactionsForRefreshData({ commit }) {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      try {
        const response = await axios.get('https://automationapi.lotuscapitallimited.com/api/app/getcompletedtransactions', { headers });
        if (response.status === 200) {
          const transactions = response.data.transactions;
          commit('setAllTransactions', transactions);
        } else {
          console.error('Error fetching all transactions for refresh:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching all transactions for refresh:', error);
      }
    },
    async fetchPendingTransactionsForRefreshData({ commit }) {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      try {
        const response = await axios.get('https://automationapi.lotuscapitallimited.com/api/app/getpostedtransactions', { headers });
        if (response.status === 200) {
          const transactions = response.data.transactions;
          commit('setPendingTransactions', transactions);
        } else {
          console.error('Error fetching pending transactions for refresh:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching pending transactions for refresh:', error);
      }
    },
    async removePendingTransaction({ commit, dispatch }, requestNo) {
      commit('removePendingTransaction', requestNo);
      await dispatch('fetchPendingTransactionsForRefreshData');
    },
    async removePendingTransactionsBulk({ commit, dispatch }, requestNos) {
      commit('removePendingTransactionsBulk', requestNos);
      await dispatch('fetchPendingTransactionsForRefreshData');
    },
    async removeApprovedTransaction({ commit, dispatch }, requestNo) {
      commit('removeApprovedTransaction', requestNo);
      await dispatch('fetchAllTransactionsForRefreshData');
    },
    async refreshData({ dispatch }) {
      await dispatch('fetchAllTransactionsForRefreshData');
      await dispatch('fetchPendingTransactionsForRefreshData');
    },
    startRefreshInterval({ state, dispatch, commit }) {
      if (state.refreshIntervalId) {
        clearInterval(state.refreshIntervalId);
      }
      const intervalId = setInterval(() => {
        dispatch('refreshData');
      }, 20000);
      commit('setRefreshIntervalId', intervalId);
    },
    stopRefreshInterval({ state, commit }) {
      if (state.refreshIntervalId) {
        clearInterval(state.refreshIntervalId);
        commit('clearRefreshIntervalId');
      }
    },
  },
  getters: {
    allTransactions: state => state.allTransactions,
    CompletedTransactions: state => state.allTransactions,
    refreshIntervalId: state => state.refreshIntervalId,
    PendingTransactions: state => state.PendingTransactions,
  },
});

export default store;
