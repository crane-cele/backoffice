import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { register } from '../redux/actions/authActions';
import Loader from '../ui/Loader';
import Alert from '../ui/Alert';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const resultAction = await dispatch(register({ email, password })).unwrap();
      setMessage('Registration successful! Please check your email to confirm.');
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && <Alert type="success" message={message} />}
        {error && <Alert type="danger" message={error} />}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;