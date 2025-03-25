import { Page } from "widgets/Page/Page"
import { Carousel } from "widgets/Carousel/ui/Carousel"
import classNames from "shared/library/classNames/classNames"
import s from './LandingPage.module.scss'
 
interface LandingPageProps {
    className?: string
}
export const LandingPage = (props: LandingPageProps) => {
    const {
        className
    } = props

    return (
        <Page className={classNames(s.LandingPage, {}, [className])}>
            <Carousel />
            <div>
                
            </div>
        </Page>
    )
}

export default LandingPage