import React from 'react';

interface AlertProps {
  message: string;
  type?: 'success' | 'danger' | 'warning';
}

const Alert: React.FC<AlertProps> = ({ message, type = 'danger' }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;