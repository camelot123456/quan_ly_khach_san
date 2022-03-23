import { Badge, Box, Container, Heading, Image, StarIcon, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { showRoomtypePublic } from "../../../redux/actions/roomtype-action";
import {Link} from "react-router-dom";
import { APP_NAME } from "../../../constants";

function Home() {
    const dispatch = useDispatch();
    const roomtypes = useSelector((state) => state.roomtypeReducer.roomtypes)
  
    useEffect(() => {
      dispatch(showRoomtypePublic({
          currentPage: 0,
          sizePage: 20,
          sortField: "id",
          sortDir: "asc",
          keyword: "",
      }))
    }, [])
  
    return (
      <>
          {/* <!-- Header--> */}
        <header className="bg-dark py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">{APP_NAME}</h1>
              <p className="lead fw-normal text-white-50 mb-0">
                Có công mài sắt có ngày nên kim.
              </p>
            </div>
          </div>
        </header>
        {/* <!-- Section--> */}
        <section className="py-5">
  
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {roomtypes && roomtypes.map((roomtype, index) => (
                <div className="col mb-5" key={index}>
                  <div className="card h-100">
                    {/* <!-- Sale badge--> */}
                    <div
                      className="badge bg-dark text-white position-absolute"
                      style={{top: '0.5rem', right: '0.5rem'}}
                    >
                      Giảm
                    </div>
                    {/* <!-- Product image--> */}
                    <img
                      className="card-img-top"
                      src={roomtype.avatarUrl}
                      alt={roomtype.name}
                    />
                    {/* <!-- Product details--> */}
                    <div className="card-body p-4">
                      <div className="text-center">
                        {/* <!-- Product name--> */}
                        <h5 className="fw-bolder">{roomtype.name}</h5>
                        {/* <!-- Product reviews--> */}
                        <div className="d-flex justify-content-center small text-warning mb-2">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                        {/* <!-- Product price--> */}
                        <span className="text-muted text-decoration-line-through">
                          ${roomtype.price}
                        </span>
                        ${roomtype.price}
                      </div>
                    </div>
                    {/* <!-- Product actions--> */}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <Link className="btn btn-outline-dark mt-auto" to={`/rooms/${roomtype.id}`}>Xem</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
}

export default Home;
