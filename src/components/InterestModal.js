import React from "react";
import "./interestModal.css";

const InterestModal = ({ onClose, onSelect }) => {
  const interests = ["Gaming", "Coding", "Writing", "Music", "Reading"];

  const handleSelect = (e) => {
    onSelect(e.target.value);
  };
    const [selectedInterests, setSelectedInterests] = React.useState([]);
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedInterests((prev) => [...prev, value]);
    } else {
      setSelectedInterests((prev) => prev.filter((item) => item !== value));
    }
  };
  
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select Your Interest</h3>
        {interests.map((interest, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name="interests"
              value={interest}
              checked={selectedInterests.includes(interest)}
              onChange={handleCheckboxChange}
            />

            <label htmlFor={interest}>{interest}</label>
          </div>
        ))}
        <button onClick={() => onClose(selectedInterests)}>Done</button>
      </div>
    </div>
  );
};

export default InterestModal;
