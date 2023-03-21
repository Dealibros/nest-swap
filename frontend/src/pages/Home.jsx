import '../styles/Home.css';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import LANGUAGES from '../data/languages';
import { apiFetch } from '../utils/apiFetch';
import readFileAsBase64 from '../utils/uploadImage';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [destinationsList, setDestinationsList] = useState([]);
  const [tempDestinationsInput, setTempDestinationsInput] = useState('');
  const [userCurrentData, setUserCurrentData] = useState('');

  const targetBoxRef = useRef(null);
  const fileInput = useRef(null);

  const photoData = selectedFile ? readFileAsBase64(selectedFile) : null;

  const credentials = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    languages: [],
    description: '',
    destinations: '',
    photoData: photoData,
  };
  const [newCredentials, setNewCredentials] = useState({ ...credentials });

  let username = localStorage.getItem('username');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue =
      name === 'languages' && type === 'checkbox'
        ? checked
          ? [...newCredentials.languages, value]
          : newCredentials.languages.filter((lang) => lang !== value)
        : value;
    setNewCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: newValue,
    }));
  };

  const handleDestinationInput = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (tempDestinationsInput.trim() !== '') {
        setDestinationsList([
          ...destinationsList,
          tempDestinationsInput.trim(),
        ]);
        setTempDestinationsInput('');
      }
    } else {
      const { name, value } = event.target;
      setTempDestinationsInput(value);
    }
  };

  useEffect(() => {
    setNewCredentials((prevCredentials) => ({
      ...prevCredentials,
      destinations: destinationsList.join(','),
    }));
  }, [destinationsList]);

  useEffect(() => {
    apiFetch(`http://localhost:8080/user/${username}`, 'GET', null).then(
      (data) => {
        setUserCurrentData(data);
        console.log(userCurrentData);

        setUserCurrentData((prevCredentials) => ({
          ...prevCredentials,
          languages: data.languages ? data.languages.split(',') : [],
        }));

        setNewCredentials((prevCredentials) => ({
          ...prevCredentials,
          languages: data.languages ? data.languages.split(',') : [],
          destinations: data.destinations || '',
        }));

        // Set the current user's destinations as an array
        setDestinationsList(
          data.destinations ? data.destinations.split(',') : [],
        );
      },
    );
  }, []);

  const base64String = userCurrentData.image
    ? `data:image/jpeg;base64,${userCurrentData.image}`
    : null;

  return (
    <>
      <Navbar />
      <form className="profile-form">
        <div className="profile-panel">
          <div className="profile-container">
            <div className="home-header-left">
              <div className="profile-box-body">
                <h3 className="profile-top-text">About us</h3>
                <div className="uploaded-photo">
                  <div className="target-box" ref={targetBoxRef}>
                    {base64String && (
                      <img
                        id="selected-image"
                        alt=""
                        src={base64String}
                        className="target-box"
                      />
                    )}
                  </div>
                </div>

                <div className="profile-main-text">
                  <h4 className="profile-home-description">
                    {userCurrentData.description}
                  </h4>
                  <h4 className="profile-contact">Send email</h4>
                </div>
              </div>
            </div>

            <div className="home-header-rigth">
              <div className="home-container">
                <h3 className="home-title-profile">Home</h3>
                <a className="home-blocks" href="/home">
                  <a className="edit-icon" href="/edithomes">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </a>
                </a>
              </div>
            </div>
          </div>

          {/* <hr className="hr" /> */}

          <div className="profile-body">
            <div className="left-side-profile">
              <div className="profile-box">
                <div>
                  <h3 className="home-details">Home details</h3>
                  <h4 className="home-details-icons-container">
                    Home details icons
                  </h4>
                </div>
              </div>
            </div>
            <div className="right-side-profile"></div>
          </div>
          <div className="profile-box">
            <div>
              <h3 className="home-description-title">Home description</h3>
              <h4 className="home-description-text">
                We live in a beautiful flat located in Vienna city center. Our
                home is located in the third District of Vienna. It is few
                minutes walk from subway station, which takes you directly to
                the city center in 10 minutes. The apartment is on the 4rd floor
                (with elevator) of a new building with a quiet balcony. It
                consists of a living room with kitchen, 2 bedrooms, a bathroom,
                a separate toilette and an entrance area. It is 80 square-meters
                large in total. Lots os shops and supermarkets around. Kitchen
                appliances and coffee maschine available for use. Everything
                needed to feel at home.
              </h4>
            </div>
          </div>
          <hr className="hr" />
          <div className="profile-box">
            <div>
              <h3 className="home-amenities">Amenities</h3>
              <h4 className="home-amenities-container">Amenities in images</h4>
            </div>
          </div>

          <hr className="hr" />
          <div className="profile-box">
            <div>
              <h3 className="home-calendar">Calendar</h3>
              <h4 className="home-calendar-container">
                Here goes the calendar
              </h4>
            </div>
          </div>
          <hr className="hr" />
          <div className="profile-box">
            <div>
              <h3 className="home-map">Map</h3>
              <h4 className="home-map-container">Here goes the calendar</h4>
            </div>
          </div>
          <hr className="hr" />

          <div className="profile-buttons">
            {/* <button
              className="submit-button-form profile-submit-button"
              onClick={(event) => saveUserDetails(event)}
              type="submit"
            >
              Save
            </button> */}
            {/* <button
              className="submit-button-form profile-cancel-button"
              type="button"
              onClick={() => {
                setNewCredentials(credentials);
                setDestinationsList([]);
                setTempDestinationsInput('');
              }}
            >
              Cancel
            </button> */}
          </div>
        </div>
      </form>
      <br />
    </>
  );
}
