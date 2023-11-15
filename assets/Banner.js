import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const bannerContent = document.getElementById('banner-content');
    const bannerImage = document.getElementById('banner-image');

    const setMaxHeightFromImage = () => {
      if (bannerImage) {
        setMaxHeight(bannerImage.height);
      }
    };

    setMaxHeightFromImage(); 

    window.addEventListener('load', setMaxHeightFromImage);
    window.addEventListener('resize', setMaxHeightFromImage);

    return () => {
      window.removeEventListener('load', setMaxHeightFromImage);
      window.removeEventListener('resize', setMaxHeightFromImage);
    };
  }, []);

  const addErrToCart = (id) => {
    const variant = document.getElementById('option-form-' + id);

    let formData = {
      items: [
        {
          id: id,
          quantity: 1,
        },
      ],
    };

    if (variant != undefined) {
      formData.items[0].id = variant.value;
    }

    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => updateCart())
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log('Added to the Cart:', formData);
  };

  const updateCart = () => {
    fetch('/cart.js')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        if (data.items.length > 0) {
          document.getElementById('cart-count-bubble-id').innerHTML = data.items.length;
        }

        return data;
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updateCart();
  }, []); 

  return (
    <div id="banner-content" style={{ maxHeight: `${maxHeight}px` }}>
      {}
    </div>
  );
};

export default Banner;