import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
// import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Card from './Card';
const Progress = (props:any) => {

    const renderCards  = () => {
        if(!props.cards) {
            return null
        }

        return props.cards.map((card:any, idx:number) => (<SwiperSlide key={idx}>
            <Card
                title={card.title}
                value={card.value}
                max={card.max} />
        </SwiperSlide>))

    }
    let cards = null;
    cards = renderCards();
    return (
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {cards}
      </Swiper>
    )
};

export default Progress;