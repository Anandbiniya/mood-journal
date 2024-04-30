// JobPortalList.js

import React, { useState, useEffect } from 'react';
import './JobPortalList.css';

function JobPortalList() {
  const API_KEY = 'YOUR_API_KEY';

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [candidateDetails, setCandidateDetails] = useState({ name: '', email: '', resume: '', coverLetter: '' });
  const [receiverEmail, setReceiverEmail] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`https://api.example.com/jobs?key=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
    }
  };

  const handleSendMail = () => {
    const mailtoLink = `mailto:${receiverEmail}?subject=Job Application&body=
    Candidate Name: ${candidateDetails.name}%0D%0A
    Candidate Email: ${candidateDetails.email}%0D%0A
    Candidate Resume: ${candidateDetails.resume}%0D%0A
    Cover Letter: ${candidateDetails.coverLetter}`;

    window.location.href = mailtoLink;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCandidateDetails({ ...candidateDetails, [name]: value });
  };

  const handleSearch = () => {
    // Perform search logic here
    // Example: filter jobs based on searchTerm
  };

  return (
    <div className="job-portal-container">
      <div className="search-section">
        <input type="text" placeholder="Search for jobs" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="candidate-details">
        <h2>Candidate Details</h2>
        <input type="text" name="name" placeholder="Name" value={candidateDetails.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={candidateDetails.email} onChange={handleInputChange} />
        <input type="file" name="resume" onChange={handleInputChange} />
        <textarea name="coverLetter" placeholder="Cover Letter" value={candidateDetails.coverLetter} onChange={handleInputChange}></textarea>
      </div>
      <div className="receiver-email">
        <input type="email" placeholder="Receiver's Email" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} />
      </div>
      <button onClick={handleSendMail}>Send Mail</button>
      <div className="referral-section">
        <h2>Referral Program</h2>
        <p>Refer a friend and earn rewards!</p>
        <button>Refer Now</button>
      </div>
      <div className="additional-resources">
        <h2>Additional Resources</h2>
        <div className="resource-box">
          <ul>
            <li className="resource-item"><a href="https://www.youtube.com/watch?v=peiPQzRIxpI" target="_blank" rel="noopener noreferrer">How to Create a Resume (YouTube)</a></li>
            <li className="resource-item"><a href="https://www.youtube.com/watch?v=zd4ALKv8Das" target="_blank" rel="noopener noreferrer">How to Apply for Jobs on LinkedIn (YouTube)</a></li>
            <li className="resource-item"><a href="https://www.youtube.com/watch?v=JWBdWim1PaA" target="_blank" rel="noopener noreferrer">How to Apply for Jobs on Naukri (YouTube)</a></li>
            <li><a href="https://www.interviewtipsandtricks.com/" target="_blank" rel="noopener noreferrer">Interview Tips & Tricks Website</a></li>
            <div className="interview-tips">
        <h2>Interview Tips & Tricks</h2>
        <div className="tip-box">
          <h3>Prepare Well</h3>
          <p>Research the company and understand the job requirements thoroughly.</p>
        </div>
        <div className="tip-box">
          <h3>Practice Mock Interviews</h3>
          <p>Practice answering common interview questions with a friend or mentor.</p>
        </div>
        <div className="tip-box">
          <h3>Stay Confident</h3>
          <p>Believe in yourself and your abilities. Confidence is key!</p>
        </div>
        <div className="tip-box">
          <h3>Follow Up</h3>
          <p>Send a thank-you email after the interview to express your appreciation.</p>
        </div>
      </div>
   
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobPortalList;
