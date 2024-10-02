import "./ProductCard.css";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faStar as solidStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function ProductCard() {
  return (
    <div class="grid__column24">
      <a class="home-product-item">
      <div
  className="home-product-item__img"
  style={{ backgroundImage: `url(${require('../../asset/Neural-Networks.jpg')})` }}
></div>
      <h4 className="home-product-item__name">
        Set dưỡng trắng whoo đông y hoàng cung Gong Jinh Yang Seol Radiant
      </h4>
      <div className="home-product-item__price">
        <span className="home-product-item__price-old">1.200.000đ</span>
        <span className="home-product-item__price-current">999.000đ</span>
      </div>
      <div className="home-product-item__action">
        <span className="home-product-item__like home-product-item__like--liked">
          <FontAwesomeIcon icon={regularHeart} className="home-product-item__icon-like-empty" />
          <FontAwesomeIcon icon={solidHeart} className="home-product-item__icon-like-fill" />
        </span>
        <div className="home-product-item__rating">
          <FontAwesomeIcon icon={solidStar} className="home-product-item__star-gold" />
          <FontAwesomeIcon icon={solidStar} className="home-product-item__star-gold" />
          <FontAwesomeIcon icon={solidStar} className="home-product-item__star-gold" />
          <FontAwesomeIcon icon={solidStar} />
          <FontAwesomeIcon icon={solidStar} />
        </div>
        <span className="home-product-item__sold">88 đã bán</span>
      </div>
      <div className="home-product-item__orgin">
        <span className="home-product-item__brand">Whoo</span>
        <span className="home-product-item__origin-name">Nhật bản</span>
      </div>
      <div className="home-product-item__favourite">
        <FontAwesomeIcon icon={faCheck} className='home-product-item__favourite__check'/>
        <span>Yêu thích</span>
      </div>
      <div className="home-product-item__sale-off">
        <span className="home-product-item__sale-off-percent">10%</span>
        <span className="home-product-item__sale-off-label">GIẢM GIÁ</span>
      </div>
      </a>
    </div>
  );
}

export default ProductCard;
