// App.js
import React from 'react';

function App() {
  return (
    <div className="container">
      <h1 className="custom-font">Welcome!</h1>
      <p className="signup custom-font">Let's sign up</p>
      <div className="text-boxes-container">
        <select name="experience" id="experience" className="w-80 h-12 rounded-lg border-none bg-gray-200 mb-5 px-4 text-lg">
          <option value="">Select your experience</option>
          <option value="student">Student</option>
          <option value="new-grad">New Grad</option>
          <option value="professional">Professional (5-10 years of experience)</option>
          <option value="experienced-professional">Experienced Professional (10+ years of experience)</option>
        </select>
        <select name="job-interest" id="job-interest" className="w-80 h-12 rounded-lg border-none bg-gray-200 mb-5 px-4 text-lg">
          <option value="">Select your job interest</option>
          <option value="internship">Looking for Internship</option>
          <option value="new-grad-role">Looking for new grad role</option>
          <option value="career-pivot">Looking to pivot careers</option>
          <option value="re-entering-workforce">Re-entering the workforce</option>
          <option value="for-fun">For fun!</option>
        </select>
        <input type="text" placeholder="Enter your name here: " className="w-80 h-12 rounded-lg border-none bg-gray-200 mb-5 px-4 text-lg" />
        <input type="text" placeholder="Enter the url to your LinkedIn Profile" className="w-80 h-12 rounded-lg border-none bg-gray-200 mb-5 px-4 text-lg" />
        <input type="text" placeholder="Insert Country: " className="w-80 h-12 rounded-lg border-none bg-gray-200 mb-5 px-4 text-lg" />
        <input type="text" placeholder="Upload your resume" className="w-80 h-12 rounded-lg border-none bg-gray-200 mb-5 px-4 text-lg" />
        <input type="text" placeholder="Text Box 7" className="w-80 h-12 rounded-lg border-none bg-gray-200 mb-5 px-4 text-lg" />
        <button className="custom-button">Complete Sign Up!</button>
      </div>
    </div>
  );
}

export default App;
