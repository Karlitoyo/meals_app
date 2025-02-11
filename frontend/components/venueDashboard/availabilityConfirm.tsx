import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';


interface CreateAvailabilityFormProps {
    venueId: string | number;
  }

const CreateAvailabilityForm: React.FC<CreateAvailabilityFormProps> = ({venueId}) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (venueId === '') {
      setMessage('Venue ID is required.');
      return;
    }
    console.log('Creating availability:', { venueId, startTime, endTime });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/availability/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          venueId,
          startTime,
          endTime,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create availability');
      }

      const data = await response.json();
      setMessage('Availability created successfully!');
      console.log('Response:', data);
    } catch (error: any) {
      setMessage('Error creating availability: ' + error.message);
      console.error('Error:', error);
    }
  };

return (
  <form onSubmit={handleSubmit}>
    <h2>Create Availability</h2>
    <div>
      <div>
        <label>Venue ID:</label>
        <h2>{venueId}</h2>
      </div>

      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>

      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Availability</button>
    </div>
    {message && <p>{message}</p>}
  </form>
);

};

export default CreateAvailabilityForm;