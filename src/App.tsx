import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import './App.css'

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка завантаження, спробуйте пізніше');
        }
        return response.json();
      })
      .then(data => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-message">Завантаження фотографій...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
        spaceBetween={80}
        slidesPerView={3}
        speed={350}
        navigation
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        scrollbar={{ draggable: true }}
        centeredSlides={true}
        keyboard={{ enabled: true }}
      >
        <div className="swiper-wrapper"></div>
       {photos.map(photo => (
          <SwiperSlide key={photo.id}>
            <img src={photo.url} alt={photo.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
}

export default App
