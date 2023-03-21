import '../styles/EditProfile.css';
import { IonIcon } from '@ionic/react';
import { addCircleOutline, navigate } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import LANGUAGES from '../data/languages';
import { apiFetch } from '../utils/apiFetch';
import readFileAsBase64 from '../utils/uploadImage';

export default function EditProfile() {
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

  const navigate = useNavigate();
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

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      if (targetBoxRef.current) {
        targetBoxRef.current.style.backgroundImage = `url(${reader.result})`;
        targetBoxRef.current.style.backgroundSize = 'contain';
        targetBoxRef.current.style.backgroundRepeat = 'no-repeat';
        setUserCurrentData({
          ...userCurrentData,
          image: reader.result,
        });
      }
    };
  };

  const toggleInput = (event) => {
    event.preventDefault();
    setShowInput(!showInput);
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

  const saveUserDetails = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      if (selectedFile) {
        formData.append('photoData', selectedFile);
      }
      for (const key in newCredentials) {
        key === 'languages'
          ? formData.append(key, newCredentials[key].join(','))
          : formData.append(key, newCredentials[key]);
      }

      console.log('nc', newCredentials);
      console.log('fd', formData);
      const result = await apiFetch(
        'http://localhost:8080/user/details',
        'PUT',
        formData,
        { isFormData: true },
      );
      setUserCurrentData(result);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    apiFetch(`http://localhost:8080/user/${username}`, 'GET', null).then(
      (data) => {
        setUserCurrentData(data);
        console.log(data);
        setNewCredentials((prevCredentials) => ({
          ...prevCredentials,
          languages: data.languages ? data.languages.split(',') : [],
          destinations: data.destinations || '',
        }));

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
          <h4 className="profile-header">PROFILE</h4>
          <hr className="hr" />
          <div className="profile-box">
            <div>
              <h3 className="profile-picture-text">Profile picture</h3>
              <div className="upload-box-with-button">
                <div className="upload-box">
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
                <input
                  className="input-profile-photo"
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={handleFileInputChange}
                ></input>
                <button
                  type="button"
                  className="button-photo-profile"
                  onClick={() => fileInput.current.click()}
                >
                  <i className="icon-upload"></i>
                  Edit photo
                </button>
              </div>
            </div>
          </div>

          <hr className="hr" />

          <div className="profile-box">
            <div className="profile-details-box">
              <div className="profile-full-name-box">
                <h3 className="profile-name-text">First name</h3>
                <input
                  className="profile-input"
                  type="text"
                  id="name"
                  name="firstname"
                  value={newCredentials.firstname}
                  onChange={handleChange}
                  placeholder={userCurrentData.firstname}
                ></input>
                <h3 className="profile-last-name-text">Last name</h3>
                <input
                  className="profile-input"
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={newCredentials.lastname}
                  onChange={handleChange}
                  placeholder={userCurrentData.lastname}
                ></input>
              </div>
              <div className="profile-birth-email-phone">
                <h3 className="profile-email-text">Email</h3>
                <input
                  className="profile-input"
                  type="text"
                  id="email"
                  name="email"
                  value={newCredentials.email}
                  onChange={handleChange}
                  placeholder={userCurrentData.email}
                ></input>
                <h3 className="profile-phone-text">Phone</h3>
                <input
                  className="profile-input"
                  type="text"
                  id="phone"
                  name="phone"
                  value={newCredentials.phone}
                  onChange={handleChange}
                  placeholder={userCurrentData.phone}
                ></input>
              </div>
            </div>

            <hr className="hr" />
          </div>
          <div className="profile-box">
            <div>
              <h3 className="profile-languages-text">Languages spoken</h3>
              <h5 className="sub-text">I speak</h5>
              <div className="languages-container">
                <div className="row-languages">
                  {LANGUAGES.map((language) => (
                    <label
                      key={language.id}
                      htmlFor={`lang-${language.id}`}
                      className="checkbox"
                    >
                      <input
                        type="checkbox"
                        name="languages"
                        id={`lang-${language.id}`}
                        value={language.id}
                        checked={newCredentials.languages.includes(language.id)}
                        onChange={handleChange}
                      />
                      <span className={`lang ${language.className}`}>
                        {language.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="hr" />

          <div className="profile-box">
            <div>
              <h3 className="profile-languages-text">About us</h3>
              <div>
                <textarea
                  className="profile-textarea"
                  rows="5"
                  name="description"
                  min="100"
                  placeholder={
                    userCurrentData.description ||
                    'Digital Nomad couple looking to exchange home to explore new places.'
                  }
                  id="description"
                  value={newCredentials.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          <hr className="hr" />
          <div className="profile-box">
            <div>
              <h3 className="profile-preferred-destinations-text">
                Preferred Destinations
              </h3>

              {destinationsList.map((destination, index) => {
                return (
                  <div key={index} className="choose-destination">
                    {destination}
                  </div>
                );
              })}
              <div className="destinations-div-container">
                <button
                  href="#"
                  className="sub-text add-destinations-button"
                  onClick={toggleInput}
                >
                  <h4 className="add-destination-text">
                    {' '}
                    <IonIcon className="add-icon" icon={addCircleOutline} />
                    Add new Destination{' '}
                  </h4>
                </button>
              </div>
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

          <hr className="hr" />
          <div className="profile-buttons">
            <button
              className="submit-button-form profile-submit-button"
              onClick={(event) => saveUserDetails(event)}
              type="submit"
            >
              Save
            </button>
            <button
              className="submit-button-form profile-cancel-button"
              type="button"
              onClick={() => {
                setNewCredentials(credentials);
                setDestinationsList([]);
                setTempDestinationsInput('');
                navigate('/profile');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <br />
    </>
  );
}
