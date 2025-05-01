import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 
import './reviews.css'; 

const commentsData = [
  {
    name: 'Anton Levchenko',
    rating: 10,
    comment: "I've been searching for a service like this for a long time, and finally found it. All features work flawlessly, couldn't be happier!",
  },
  {
    name: 'Maria Ivanova',
    rating: 9,
    comment: "The service has exceeded my expectations. Fast, reliable, and very user-friendly!",
  },
  {
    name: 'Oleg Petrov',
    rating: 8,
    comment: "I love the variety of features available. It's been a great help for my daily tasks.",
  },
];

const Comments = () => {
  return (
    <div className="comments-container">
      <h2>What Our Customers Say</h2>
      <p>We strive to provide high-quality service, and our users love to share their experiences. Check out their stories!</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {commentsData.map((currentComment, index) => (
          <div className="comments-box" key={index}>
            <div className="box-top">
              <div className="profile">
                <div className="profile-info">
                  <div className="name-user">
                    <strong>{currentComment.name}</strong>
                  </div>
                </div>
              </div>
              <div className="client-comments">
                <p>{`“${currentComment.comment}”`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button className="arrow-btn left-arrow" disabled>
          <FaArrowLeft /> 
        </button>
        <button className="arrow-btn right-arrow" disabled>
          <FaArrowRight /> 
        </button>
      </div>
    </div>
  );
};

export default Comments;