import React, { useState, useEffect } from 'react';
import type { Bean, CreateBeanPayload } from '../../../types';
import './BeanFormModal.css';

interface BeanFormModalProps {
  bean?: Bean | null; // If provided, we are in Edit mode
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBeanPayload) => Promise<void>;
}

export const BeanFormModal: React.FC<BeanFormModalProps> = ({
  bean,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [roaster, setRoaster] = useState('');
  const [roastLevel, setRoastLevel] = useState('');
  const [process, setProcess] = useState('');
  const [origin, setOrigin] = useState('');
  const [variety, setVariety] = useState('');
  const [tastingNotesText, setTastingNotesText] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [grinder, setGrinder] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bean) {
      setName(bean.name || '');
      setRoaster(bean.roaster || '');
      setRoastLevel(bean.roastLevel || '');
      setProcess(bean.process || '');
      setOrigin(bean.origin || '');
      setVariety(bean.variety || '');
      setTastingNotesText(bean.tastingNotes ? bean.tastingNotes.join(', ') : '');
      setPurchaseDate(bean.purchaseDate ? new Date(bean.purchaseDate).toISOString().split('T')[0] : '');
      setGrinder(bean.grinder || '');
      setRating(bean.rating || 5);
    } else {
      // Reset form
      setName('');
      setRoaster('');
      setRoastLevel('');
      setProcess('');
      setOrigin('');
      setVariety('');
      setTastingNotesText('');
      setPurchaseDate(new Date().toISOString().split('T')[0]);
      setGrinder('');
      setRating(5);
    }
    setError(null);
  }, [bean, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name.trim() || !roaster.trim()) {
      setError('Name and Roaster are required fields.');
      setLoading(false);
      return;
    }

    // Process tasting notes from comma-separated string to array
    const tastingNotes = tastingNotesText
      .split(',')
      .map((note) => note.trim())
      .filter((note) => note.length > 0);

    const payload: CreateBeanPayload = {
      name,
      roaster,
      roastLevel: roastLevel || undefined,
      process: process || undefined,
      origin: origin || undefined,
      variety: variety || undefined,
      tastingNotes: tastingNotes.length > 0 ? tastingNotes : undefined,
      purchaseDate: purchaseDate ? new Date(purchaseDate).toISOString() : undefined,
      grinder: grinder || undefined,
      rating: rating,
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save coffee log. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>{bean ? 'Edit Coffee Log' : 'Log New Coffee Beans'}</h2>
          <button className="btn-close" onClick={onClose}>
            &times;
          </button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="beanName">Bean Name *</label>
              <input
                id="beanName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Geisha Village"
                required
              />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="roaster">Roaster *</label>
              <input
                id="roaster"
                type="text"
                value={roaster}
                onChange={(e) => setRoaster(e.target.value)}
                placeholder="e.g. Sey Coffee"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="origin">Origin</label>
              <input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Ethiopia"
              />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="variety">Variety</label>
              <input
                id="variety"
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Gesha 1931"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="roastLevel">Roast Level</label>
              <select
                id="roastLevel"
                value={roastLevel}
                onChange={(e) => setRoastLevel(e.target.value)}
              >
                <option value="">Select Roast</option>
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="form-group flex-1">
              <label htmlFor="process">Process</label>
              <select
                id="process"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              >
                <option value="">Select Process</option>
                <option value="washed">Washed</option>
                <option value="natural">Natural</option>
                <option value="honey">Honey</option>
                <option value="anaerobic">Anaerobic</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="grinder">Grinder Settings</label>
              <input
                id="grinder"
                type="text"
                value={grinder}
                onChange={(e) => setGrinder(e.target.value)}
                placeholder="e.g. Ode 2 #4.1"
              />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="purchaseDate">Purchase Date</label>
              <input
                id="purchaseDate"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tastingNotes">Tasting Notes (comma separated)</label>
            <input
              id="tastingNotes"
              type="text"
              value={tastingNotesText}
              onChange={(e) => setTastingNotesText(e.target.value)}
              placeholder="e.g. Jasmine, Peach, Bergamot, Honey"
            />
          </div>

          <div className="form-group">
            <label>Rating ({rating} / 5 stars)</label>
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={star <= rating ? 'star-btn filled' : 'star-btn'}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <span className="spinner"></span> : bean ? 'Save Changes' : 'Log Bean'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
