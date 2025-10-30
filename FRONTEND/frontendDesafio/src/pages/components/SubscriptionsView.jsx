import React from 'react';
import { useSubscriptions } from './../../hooks/useSubscriptions';
import { useAuth } from '../../context/AuthContext'; 

const SubscriptionsView = () => {
    const { subscriptions, loading, error, fetchMySubscriptions } = useSubscriptions();

    if (loading) return <div className="loading-state">Cargando suscripciones...</div>;
    if (error) return <div className="error-state">Error al cargar suscripciones: {error}</div>;

    return (
        <div className="view-container">
            <h2>💳 Mis Suscripciones</h2>
            
            <button onClick={fetchMySubscriptions} className="action-button secondary">
                Recargar Suscripciones
            </button>

            <div className="subscription-list">
                {subscriptions.length === 0 ? (
                    <p className="no-data">No tiene suscripciones activas.</p>
                ) : (
                    subscriptions.map(sub => {
                        // Comprobación simple para ver si la suscripción ha expirado
                        const isExpired = sub.endDate && new Date(sub.endDate) < new Date();
                        const statusClass = isExpired ? 'expired' : 'active';
                        const statusText = isExpired ? 'EXPIRADA' : 'ACTIVA';

                        return (
                            <div key={sub.id} className="subscription-card">
                                <span className={`sub-type type-${sub.type.toLowerCase()}`}>{sub.type}</span>
                                <p>Inicio: {sub.startDate}</p>
                                <p>Fin: {sub.endDate}</p>
                                <span className={`sub-status ${statusClass}`}>{statusText}</span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SubscriptionsView;