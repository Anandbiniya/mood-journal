import React, { useState } from 'react';
import './ClubPage.css';

const clubsData = [
  { id: 1, name: 'Book Club', description: 'Join us to discuss your favorite books and authors.', members: ['Alice', 'Bob'], requests: ['Charlie', 'David'] },
  { id: 2, name: 'Fitness Club', description: 'Stay fit and healthy with our group workout sessions.', members: ['Emma', 'Frank'], requests: ['Grace'] },
  { id: 3, name: 'Cooking Club', description: 'Learn and share new recipes with fellow cooking enthusiasts.', members: ['Hannah'], requests: ['Isaac', 'Jack'] },
  { id: 4, name: 'Photography Club', description: 'Capture and share your best shots with our photography community.', members: ['Liam', 'Olivia'], requests: [] },
];

function ClubPage() {
  const [clubs, setClubs] = useState(clubsData);
  const [selectedClub, setSelectedClub] = useState(null);
  const [joinName, setJoinName] = useState('');
  const [joinEmail, setJoinEmail] = useState('');

  const handleViewClub = (clubId) => {
    const club = clubs.find(club => club.id === clubId);
    setSelectedClub(club);
  };

  const handleBackToClubs = () => {
    setSelectedClub(null);
  };

  const handleJoinClub = () => {
    // Assuming you have a function to add the user to the club's member list
    // Here, you can send the user's name and email to Google Sheets or any backend service
    console.log(`Joined club ${selectedClub.name} with name: ${joinName} and email: ${joinEmail}`);
    // Reset the form fields
    setJoinName('');
    setJoinEmail('');
  };

  return (
    <div className="club-page">
      {!selectedClub ? (
        <>
          <h1>Available Clubs</h1>
          <div className="clubs-list">
            {clubs.map(club => (
              <div key={club.id} className="club-card">
                <h2>{club.name}</h2>
                <p>{club.description}</p>
                <button onClick={() => handleViewClub(club.id)}>View Details</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button onClick={handleBackToClubs}>Back to Clubs</button>
          <div className="club-details">
            <h2>{selectedClub.name}</h2>
            <p>{selectedClub.description}</p>
            <h3>Members ({selectedClub.members.length})</h3>
            <ul>
              {selectedClub.members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
            <h3>Requests to Join ({selectedClub.requests.length})</h3>
            <ul>
              {selectedClub.requests.map((request, index) => (
                <li key={index}>{request}</li>
              ))}
            </ul>
            <div className="join-form">
              <input type="text" placeholder="Your Name" value={joinName} onChange={(e) => setJoinName(e.target.value)} />
              <input type="email" placeholder="Your Email" value={joinEmail} onChange={(e) => setJoinEmail(e.target.value)} />
              <button onClick={handleJoinClub}>Join</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ClubPage;
