import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.loginId || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (formData.loginId === 'admin' && formData.password === 'admin123') {
        window.location.href = '/dashboard';
      } else {
        setError('Invalid login ID or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthForm>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">StockMaster</h1>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <input
            name="loginId"
            type="text"
            required
            value={formData.loginId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Login ID"
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'SIGN IN'}
        </button>

        <div className="text-center space-y-2">
          <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500 text-sm">
            Forgot Password?
          </Link>
          <div>
            <Link to="/signup" className="text-blue-600 hover:text-blue-500 text-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </AuthForm>
  );
};

export default Login;