import React, {useState} from 'react';
import star from "../assets/svg/star.svg";
import fullStar from "../assets/svg/fullStar.svg";
import Rating from "react-rating";

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = {rating, text};
        console.log(feedback);
    };

    return (
        <div className='container-sm'>
            <form onSubmit={handleSubmit}>
                <div className='feedback'>
                    <h2 className='feedback__title'>Ваш отзыв</h2>
                    <Rating
                        emptySymbol={<img src={star} className="product-card__star" alt='empty-star' width={25}/>}
                        fullSymbol={<img src={fullStar} className="product-card__star" alt='full-star' width={25}/>}
                        onChange={(value) => setRating(value)}
                        initialRating={rating}
                    />
                    <div className='feedback__input'>
                        <label>Текст записи</label>
                        <textarea
                            className='feedback__textarea'
                            cols="30"
                            rows="8"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button className='feedback__button' type='submit'>Отправить отзыв</button>
                </div>
            </form>
        </div>
    );
};

export default Feedback;