import { Carousel as AntdCarousel, Flex } from "antd";
import classNames from "shared/library/classNames/classNames";
import s from './Carousel.module.scss'

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


export const Carousel = () => {
    return (
        <Flex justify="center" align="center" className={s.fl}>
            <AntdCarousel className={classNames(s.carousel, {}, [])}>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </AntdCarousel>
        </Flex>
    )
}
