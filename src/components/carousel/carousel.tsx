import React from 'react';
import './carousel.css';

const Carousel=()=>{
	return(
				<React.Fragment>
					<div className="carousel slide" id="mycarousel" data-ride="carousel">
						<div className="carousel-inner">
							<div className="carousel-item active">
								<img
									alt=''
									className="img-fluid"
									src="http://localhost:8000/carousel/caro1.jpg"
									/>
							</div>
							<div className="carousel-item">
								<img
									alt=''
									className="img-fluid"
									 src="http://localhost:8000/carousel/caro2.jpg"
									 />
							</div>

							<div className="carousel-item">
								<img
									alt=''
									className="img-fluid"
									 src="http://localhost:8000/carousel/caro3.jpg"
									 />
							</div>
						</div>
						<a className="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev">
							<i className="fa fa-chevron-left"></i></a>
						<a className="carousel-control-next" href="#mycarousel" role="button" data-slide="next">
							<i className="fa fa-chevron-right"></i></a>
					</div>
				</React.Fragment>
		);
}
export default Carousel;