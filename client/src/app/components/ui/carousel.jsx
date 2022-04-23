import React from "react";
import imgTaskList from "../../assets/img/promo_tasks.jpg";
import imgStatistics from "../../assets/img/promo_stat.jpg";

const Carousel = () => {
    return (
        <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src={imgTaskList}
                        className="d-block w-100"
                        alt="tasklist"
                    />
                    <div className="carousel-caption p-0 d-none d-md-block">
                        <p>easy add / easy manage</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img
                        src={imgStatistics}
                        className="d-block w-100"
                        alt="statistics"
                    />
                    <div className="carousel-caption p-0 d-none d-md-block">
                        <p>easy oversee</p>
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
