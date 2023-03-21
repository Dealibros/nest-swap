import '../styles/Profile.css';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonIcon } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import LANGUAGES from '../data/languages';
import { apiFetch } from '../utils/apiFetch';
import readFileAsBase64 from '../utils/uploadImage';

export default function Profile() {
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
          <div className="profile-header">
            <div className="profile-header-left">
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
            </div>

            <div className="profile-header-rigth">
              <div className="profile-header-text">
                <h2 className="header-fullname">
                  {userCurrentData.firstname + ' ' + userCurrentData.lastname}
                </h2>
                <h4 className="header-email">{userCurrentData.email}</h4>
              </div>
            </div>
          </div>

          <hr className="hr" />

          <div className="profile-body">
            <div className="left-side-profile">
              <div className="profile-box">
                <h3 className="profile-main-text">Languages spoken</h3>
                <div className="languages-div">
                  {userCurrentData
                    ? userCurrentData.languages.map((languageId) => (
                        <div key={languageId}>
                          {languageId ? (
                            <span
                              className={`lang ${
                                LANGUAGES[languageId - 1].className
                              }`}
                            ></span>
                          ) : null}
                        </div>
                      ))
                    : null}
                </div>
              </div>

              <hr className="hr" />

              <div className="profile-box">
                <div>
                  <h3 className="profile-main-text">About us</h3>
                  <h4 className="profile-about-us">
                    {userCurrentData.description}
                  </h4>
                </div>
              </div>

              <hr className="hr" />
              <div className="profile-box">
                <div>
                  <h3 className="profile-preferred-destinations-text">
                    Wants to travel to
                  </h3>

                  {destinationsList.map((destination, index) => {
                    return (
                      <div key={index} className="choose-destination">
                        {destination}
                      </div>
                    );
                  })}
                  <div className="destinations-div-container"></div>
                  {showInput && (
                    <input
                      className="profile-input destination-input"
                      type="text"
                      id="destinations"
                      name="destinations"
                      value={tempDestinationsInput}
                      onChange={handleDestinationInput}
                      onKeyDown={handleDestinationInput}
                    ></input>
                  )}
                </div>
              </div>
            </div>
            <div className="right-side-profile">
              <div className="homes-container">
                <h3 className="home-title-profile">Home</h3>
                <a className="home-blocks" href="/home">
                  <a className="edit-icon" href="/edithomes">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </a>
                </a>
              </div>
            </div>
          </div>
          <div className="profile-box">
            <div>
              <h3 className="profile-home-header">Our Home to swap</h3>
              <h4 className="profile-about-home">
                {' '}
                We live in a lovely flat located in Vienna city center. Our
                beautiful home is located in the third District of Vienna. It is
                few minutes walk from subway station, which takes you directly
                to the city center in 10 minutes. The apartment is on the 4rd
                floor (with elevator) of a new building with a quiet balcony. It
                consists of a living room with kitchen, 2 bedrooms, a bathroom,
                a separate toilette and an entrance area. It is 80 square-meters
                large in total. Lots of shops and supermarkets around. Kitchen
                appliances and a coffee maschine available for use. Everything
                needed to feel at home.
              </h4>
            </div>
          </div>
          <hr className="hr" />

          <div className="profile-box">
            <div>
              <h3 className="profile-references">References</h3>
              <h4 className="profile-references">
                {/* {userCurrentData.references} or home references? */}
                <div className="reference">
                  <p>
                    <h3 className="reference-header">
                      {' '}
                      Reference by{' '}
                      <span className="guest-name">guest name 1</span>
                    </h3>
                    The flat was beautiful and well located. Had all the
                    ammneities needed to enjoy a good holidays break. Will
                    recommend without a doubt.
                  </p>
                  <p>
                    <h3 className="reference-header">
                      {' '}
                      Reference by{' '}
                      <span className="guest-name">guest name 2</span>
                    </h3>
                    The flat was beautiful and well located. Had all the
                    ammneities needed to enjoy a good holidays break. Will
                    recommend without a doubt.
                  </p>
                  <p>
                    <h3 className="reference-header">
                      {' '}
                      Reference by{' '}
                      <span className="guest-name">guest name 3</span>
                    </h3>
                    The flat was beautiful and well located. Had all the
                    ammneities needed to enjoy a good holidays break. Will
                    recommend to stay without a doubt.
                  </p>
                </div>
              </h4>
            </div>
          </div>

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
