import React from 'react'
import 'react-simple-hook-modal/dist/styles.css';
import {
    Modal,
    useModal,
    ModalTransition,
} from 'react-simple-hook-modal';

const ListItem = ({ gif }: { gif: any }) => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const gifImageInfo = gif.images.fixed_height_small_still;
    const animatedGif = gif.images.original;
    return (
        <>
                <img className="cursor-pointer" src={gifImageInfo.url} alt={gifImageInfo.slug} height={gifImageInfo.height} onClick={openModal}></img>
            <Modal
                id={'gifmodal' + gif.id}
                isOpen={isModalOpen}
                transition={ModalTransition.BOTTOM_UP}
            >
                <div className="flex flex-col">
                    <img src={animatedGif.url} alt={animatedGif.slug} height={animatedGif.height} ></img>
                    <button className="bg-red-500 hover:bg-red-700" onClick={closeModal}>Close</button>
                </div>

            </Modal>
        </>
    )
}

export default ListItem