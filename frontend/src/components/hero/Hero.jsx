import './styles.css';
import HomeBlock from '../homeBlock/HomeBlock';

export default function Hero() {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="homes-div">
          <h2>Homes</h2>
          <HomeBlock />
        </div>
        <div className="map-div">
          <img
            className="map-image"
            src="https://images.unsplash.com/photo-1550895030-823330fc2551?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHdoaXRlJTIwbWFwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
            height="1000"
            width="630"
          ></img>
        </div>
      </div>
    </div>
  );
}
