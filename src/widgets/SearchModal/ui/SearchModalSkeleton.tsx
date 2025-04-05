

import { Modal, Skeleton } from 'antd';

export const SearchModalSkeleton = () => {
    return (
        <Modal
            open={true}
            footer={null}
            centered
        >
            <Skeleton.Input
                active
                block
                size="large"
            />
        </Modal>
    )
}
