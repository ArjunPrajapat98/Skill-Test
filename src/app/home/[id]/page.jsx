"use client"
import { getProductData } from '@/services';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({})

    const getProductsDetails = async (id) => {
        const details = await getProductData(id);
        setDetails(details);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        if (id) {
            getProductsDetails(id);
        }
    }, [id])

    return (
        <>
            {
                loading ? (<div className='container mt-5'> Loading... </div>) : (
                    <div className="container mt-4 mb-4">
                        <div className="row no-gutters">
                            <div className="col-md-5 pr-2">
                                <div className="card">
                                    <div className="demo">
                                        <ul id="lightSlider">
                                            <li data-thumb={details?.thumbnail}>
                                                {" "}
                                                <img src={details?.thumbnail} />{" "}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card mt-2">
                                    <h6> Rating </h6>
                                    <div className="d-flex flex-row">
                                        <span className="ml-1 font-weight-bold"> &#9733; {details?.rating}</span>
                                    </div>
                                    <hr />
                                    <div className="comment-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex flex-row align-items-center">
                                                {" "}
                                                <img
                                                    src="https://i.imgur.com/tmdHXOY.jpg"
                                                    className="rounded-circle profile-image"
                                                />
                                                <div className="d-flex flex-column ml-1 comment-profile">
                                                    <span className="username"> &nbsp; Arjun Prajapat </span>
                                                </div>
                                            </div>
                                            <div className="date">
                                                {" "}
                                                <span className="text-muted"> 10 April </span>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="about">
                                        <h4 className="font-weight-bold"> {details?.title} </h4>
                                        <span className="font-weight-bold">
                                            Price : {details?.price}
                                        </span>
                                    </div>
                                    {
                                        details?.discountPercentage && (
                                            <div className="buttons">
                                                {" "}
                                                <button className="btn btn-outline-warning btn-long cart">
                                                    Discount % : {details?.discountPercentage}
                                                </button>
                                            </div>
                                        )
                                    }
                                    <hr />
                                    <div className="product-description">
                                        <div className="mt-2">
                                            {" "}
                                            <strong className="font-weight-bold">Description</strong>
                                            <p className='bullet-text'>
                                                &nbsp; {details?.description}
                                            </p>
                                            <strong className="font-weight-bold">Category</strong>
                                            <div className="bullets">
                                                <div className="d-flex align-items-center">
                                                    {" "}
                                                    <span className="dot" />{" "}
                                                    <span className="bullet-text"> {details?.category} </span>{" "}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <strong className="font-weight-bold"> Brand </strong>{" "}
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img
                                                src="https://i.imgur.com/N2fYgvD.png"
                                                className="rounded-circle store-image"
                                            />
                                            <div className="d-flex flex-column ml-3 comment-profile">
                                                <span className="username"> &nbsp; {details?.brand} </span>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-2">
                                    {" "}
                                    <span>Similar Images:</span>
                                    <div className="similar-products mt-2 d-flex flex-row">
                                        {details?.images?.length > 0 && details?.images?.map((e, i) => {
                                            return (
                                                <div
                                                    className="card border p-1"
                                                    style={{ width: "9rem", marginRight: 3 }}
                                                    key={i
                                                    }>
                                                    <img
                                                        src={e}
                                                        className="card-img-top"
                                                        alt="..."
                                                    />
                                                </div>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}
