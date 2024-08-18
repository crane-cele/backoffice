import React, { useState, useEffect } from 'react';
import { Segment } from '../redux/types';

interface SegmentFormProps {
  onSubmit: (segment: Segment) => void;
  initialSegment?: Segment | null; // Updated to accept null or undefined
}

const SegmentForm: React.FC<SegmentFormProps> = ({ onSubmit, initialSegment }) => {
  const [name, setName] = useState(initialSegment?.name || '');

  useEffect(() => {
    if (initialSegment) {
      setName(initialSegment.name);
    }
  }, [initialSegment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const segment: Segment = {
      id: initialSegment?.id || Date.now().toString(),
      name,
      users: initialSegment?.users || [],
    };
    onSubmit(segment);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Segment Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {initialSegment ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default SegmentForm;
