import { Button } from "antd"
import classNames from "classnames"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import s from './BackBtn.module.scss'

interface BackBtnProps {
    className?: string
}
export const BackBtn = (props: BackBtnProps) => {
    const { className } = props
    const navigate = useNavigate()
    return (
        <Button
            type="primary"
            className={classNames(s.BackBtn, {}, [className])}
            onClick={() => navigate(-1)}
        >
            <ArrowLeft />
        </Button>
    )
}
