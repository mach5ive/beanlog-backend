import React from 'react';
import type { Bean } from '../../../types';
import './BeanCard.css';

interface BeanCardProps {
  bean: Bean;
  onEdit: (bean: Bean) => void;
  onDelete: (id: string) => void;
}

export const BeanCard: React.FC<BeanCardProps> = ({ bean, onEdit, onDelete }) => {
  const renderStars = (rating?: number) => {
    if (rating === undefined || rating === null) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return <div className="rating-stars">{stars}</div>;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bean-card">
      <div className="card-header">
        <div>
          <h3>{bean.name}</h3>
          <p className="roaster-name">by {bean.roaster}</p>
        </div>
        {renderStars(bean.rating)}
      </div>

      <div className="card-body">
        <div className="info-grid">
          {bean.origin && (
            <div className="info-item">
              <span className="info-label">Origin</span>
              <span className="info-val">{bean.origin}</span>
            </div>
          )}
          {bean.roastLevel && (
            <div className="info-item">
              <span className="info-label">Roast</span>
              <span className="info-val capitalize">{bean.roastLevel}</span>
            </div>
          )}
          {bean.process && (
            <div className="info-item">
              <span className="info-label">Process</span>
              <span className="info-val capitalize">{bean.process}</span>
            </div>
          )}
          {bean.variety && (
            <div className="info-item">
              <span className="info-label">Variety</span>
              <span className="info-val">{bean.variety}</span>
            </div>
          )}
          {bean.grinder && (
            <div className="info-item">
              <span className="info-label">Grinder</span>
              <span className="info-val">{bean.grinder}</span>
            </div>
          )}
          {bean.purchaseDate && (
            <div className="info-item">
              <span className="info-label">Purchased</span>
              <span className="info-val">{formatDate(bean.purchaseDate)}</span>
            </div>
          )}
        </div>

        {bean.tastingNotes && bean.tastingNotes.length > 0 && (
          <div className="notes-container">
            <span className="info-label">Tasting Notes</span>
            <div className="notes-list">
              {bean.tastingNotes.map((note, index) => (
                <span key={index} className="note-pill">
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button className="btn-edit" onClick={() => onEdit(bean)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(bean.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
