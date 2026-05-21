import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../../style/signin.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    uid: '',
    school: '',
    grade: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schools = [
    'President s College, Kotte',
    'Lyceum College, Nugegoda',
    'Sirimavo Bandaranaike Vidyalaya, Colombo 07',
    'Colombo International School',
    'Gateway College'
  ];

  const grades = [
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter First name';
    }else if (!formData.lastName.trim()) {
      newErrors.lastName = 'Please enter Last name';
    } else if ((formData.firstName.trim().length || formData.lastName.trim().length) < 2) {
      newErrors.studentName = 'Name must be at least 2 characters';
    }
    
    if (!formData.school) {
      newErrors.school = 'Please select a school';
    }
    
    if (!formData.grade) {
      newErrors.grade = 'Please select a grade';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Generate UID before sending to API
    const generatedUid = (formData.firstName + formData.lastName + formData.school).toLowerCase().replace(/\s+/g, '');
      
      // Create the complete data object with UID
      const submitData = {
        ...formData,
        uid: generatedUid
      };

      // Store in localStorage
      localStorage.setItem('firstName', formData.firstName);
      localStorage.setItem('lastName', formData.lastName);
      localStorage.setItem('uid', generatedUid);
      localStorage.setItem('school', formData.school);
      localStorage.setItem('grade', formData.grade);

      console.log('Form values:', submitData);

      // Send to API with UID included
      await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      setTimeout(() => {
        message.success('Sign in successful!');
        navigate('/avatar');
        setLoading(false);
      }, 3000);

    } catch (error) {
      console.log("errorrr: ", error);
      message.error('Sign in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="main-frame">
      <div className="signin-card">
        <div className="signin-header">
          <h2>Student Sign In</h2>
        </div>
        
        <div className="signin-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter First name"
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

           <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter Last name"
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="school">School</label>
            <select
              id="school"
              value={formData.school}
              onChange={(e) => handleInputChange('school', e.target.value)}
              className={errors.school ? 'error' : ''}
            >
              <option value="">Select your school</option>
              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
            {errors.school && <span className="error-message">{errors.school}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <select
              id="grade"
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              className={errors.grade ? 'error' : ''}
            >
              <option value="">Select your grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            {errors.grade && <span className="error-message">{errors.grade}</span>}
          </div>

           <Button
            icon={
                loading && (
                  <Spin
                    style={{ fontSize: 24, color: 'white' }}
                    indicator={<LoadingOutlined spin />}
                    size="small"
                  />
                )
              }
            className='signin-button' type="primary" onClick={handleSubmit}>
              Sign In
            </Button>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
