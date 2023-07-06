// App.js

function OnboardingPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-6xl text-black">Welcome!</h1>
      <p className="text-2xl text-purple-600">Let's sign up</p>
      <div className="text-boxes-container space-y-5">
        <div className="w-80">
          <select className="select select-ghost w-full max-w-xs">
            <option disabled selected>Select your experience</option>
            <option>Student</option>
            <option>New Grad</option>
            <option>Professional (5-10 years of experience)</option>
            <option>Experienced Professional (10+ years of experience)</option>
          </select>
        </div>
        <div className="w-80">
          <select name="job-interest" id="job-interest" className="input input-primary input-bordered w-full">
            <option value="">Select your job interest</option>
            <option value="internship">Looking for Internship</option>
            <option value="new-grad-role">Looking for new grad role</option>
            <option value="career-pivot">Looking to pivot careers</option>
            <option value="re-entering-workforce">Re-entering the workforce</option>
            <option value="for-fun">For fun!</option>
          </select>
        </div>
        <input type="text" placeholder="Enter your name here" className="input input-primary input-bordered w-80" />
        <input type="text" placeholder="Enter the URL to your LinkedIn Profile" className="input input-primary input-bordered w-80" />
        <input type="text" placeholder="Insert Country" className="input input-primary input-bordered w-80" />
        <input type="text" placeholder="Upload your resume" className="input input-primary input-bordered w-80" />
        <input type="text" placeholder="Text Box 7" className="input input-primary input-bordered w-80" />
        <button className="btn btn-primary w-80">Complete Sign Up!</button>
      </div>
    </div>
  );
}

export default App;

