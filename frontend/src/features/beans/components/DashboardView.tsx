import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import type { Bean, CreateBeanPayload } from '../../../types';
import * as beansApi from '../services/beansApi';
import { BeanCard } from './BeanCard';
import { BeanFormModal } from './BeanFormModal';
import './DashboardView.css';

export const DashboardView: React.FC = () => {
  const { user, logout } = useAuth();
  const [beans, setBeans] = useState<Bean[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBean, setEditingBean] = useState<Bean | null>(null);

  const fetchBeans = async () => {
    try {
      setLoading(true);
      const data = await beansApi.getBeans();
      setBeans(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch beans list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeans();
  }, []);

  const handleOpenAddModal = () => {
    setEditingBean(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (bean: Bean) => {
    setEditingBean(bean);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this coffee log?')) {
      return;
    }

    try {
      await beansApi.deleteBean(id);
      setBeans((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete the bean.');
    }
  };

  const handleModalSubmit = async (payload: CreateBeanPayload) => {
    if (editingBean) {
      // Edit
      const updated = await beansApi.updateBean(editingBean.id, payload);
      setBeans((prev) => prev.map((b) => (b.id === editingBean.id ? updated : b)));
    } else {
      // Create
      const created = await beansApi.createBean(payload);
      setBeans((prev) => [created, ...prev]);
    }
  };

  // Filter beans by search query
  const filteredBeans = beans.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.roaster.toLowerCase().includes(q) ||
      (b.origin && b.origin.toLowerCase().includes(q))
    );
  });

  // Calculate statistics
  const totalBeans = beans.length;
  const avgRating = totalBeans
    ? (beans.reduce((sum, b) => sum + (b.rating || 0), 0) / totalBeans).toFixed(1)
    : '0.0';

  const getFavoriteRoaster = () => {
    if (!totalBeans) return '-';
    const roasters: { [key: string]: number } = {};
    beans.forEach((b) => {
      roasters[b.roaster] = (roasters[b.roaster] || 0) + 1;
    });
    return Object.keys(roasters).reduce((a, b) => (roasters[a] > roasters[b] ? a : b));
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-brand">
          <span className="brand-logo">☕</span>
          <h1>BeanLog</h1>
        </div>
        <div className="header-user">
          <span className="welcome-msg">Hello, <strong>{user?.username}</strong></span>
          <button className="btn-logout" onClick={logout}>
            Log Out
          </button>
        </div>
      </header>

      {/* Stats Summary Strip */}
      <section className="stats-strip">
        <div className="stat-card">
          <span className="stat-value">{totalBeans}</span>
          <span className="stat-label">Total Coffees</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{avgRating} ★</span>
          <span className="stat-label">Average Rating</span>
        </div>
        <div className="stat-card">
          <span className="stat-value max-one-line">{getFavoriteRoaster()}</span>
          <span className="stat-label">Favorite Roaster</span>
        </div>
      </section>

      {/* Toolbar */}
      <div className="dashboard-toolbar">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, roaster, or origin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary btn-add" onClick={handleOpenAddModal}>
          + Log Coffee
        </button>
      </div>

      {/* Main Grid content */}
      <main className="dashboard-main">
        {loading ? (
          <div className="status-container">
            <span className="spinner-large"></span>
            <p>Brewing your dashboard content...</p>
          </div>
        ) : error ? (
          <div className="status-container error-state">
            <p>{error}</p>
            <button className="btn-primary" onClick={fetchBeans}>
              Retry Fetching
            </button>
          </div>
        ) : filteredBeans.length === 0 ? (
          <div className="status-container empty-state">
            <div className="empty-icon">🌱</div>
            <h3>No coffee beans found</h3>
            <p>
              {search
                ? 'Try adjusting your search terms.'
                : 'Start cataloging your favorite coffee beans by logging your first entry!'}
            </p>
            {!search && (
              <button className="btn-primary" onClick={handleOpenAddModal}>
                Log First Coffee
              </button>
            )}
          </div>
        ) : (
          <div className="beans-grid">
            {filteredBeans.map((bean) => (
              <BeanCard
                key={bean.id}
                bean={bean}
                onEdit={handleOpenEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Form Modal */}
      <BeanFormModal
        bean={editingBean}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};
