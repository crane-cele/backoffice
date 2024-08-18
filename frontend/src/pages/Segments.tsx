import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchSegments,
  createSegment,
  updateSegment,
  deleteSegment,
} from '../redux/actions/segmentActions';
import { selectSegments } from '../redux/reducers/segmentReducer';
import { Segment } from '../redux/types';
import SegmentForm from '../components/SegmentForm';
import Loader from '../ui/Loader';
import Alert from '../ui/Alert';

const Segments: React.FC = () => {
  const dispatch = useAppDispatch();
  const { segments, loading, error } = useAppSelector(selectSegments);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  useEffect(() => {
    dispatch(fetchSegments());
  }, [dispatch]);

  const handleFormSubmit = (segment: Segment) => {
    if (selectedSegment) {
      dispatch(updateSegment(segment));
    } else {
      dispatch(createSegment(segment));
    }
    setSelectedSegment(null);
  };

  const handleEdit = (segment: Segment) => {
    setSelectedSegment(segment);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSegment(id));
  };

  return (
    <div className="container mt-5">
      <h2>User Segments</h2>
      <SegmentForm onSubmit={handleFormSubmit} initialSegment={selectedSegment} />
      {loading && <Loader />}
      {error && <Alert message={error} />}
      <ul className="list-group mt-3">
        {segments.map((segment) => (
          <li key={segment.id} className="list-group-item d-flex justify-content-between align-items-center">
            {segment.name}
            <div>
              <button onClick={() => handleEdit(segment)} className="btn btn-secondary ml-2">Edit</button>
              <button onClick={() => handleDelete(segment.id)} className="btn btn-danger ml-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Segments;
