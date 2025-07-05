import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../utils/cn';

type ModalProps = {
    open: boolean;
    bgColor?: string;
    onClosed?: () => void;
    onBackdropClick?: () => void;
    children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.open) {
            if (!dialogRef.current?.open) {
                dialogRef.current?.showModal();
            }
        }
    }, [props.open]);

    const closeDialog = () => {
        dialogRef.current?.close();

        if (props.onClosed) {
            props.onClosed();
        }
    };

    return createPortal(
        <AnimatePresence onExitComplete={closeDialog}>
            {props.open && (
                <motion.dialog
                    key="modal"
                    ref={dialogRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={cn(
                        'fixed m-0 flex min-h-screen min-w-screen items-center justify-center overflow-hidden bg-gray-900/85 p-4 text-white outline-0 select-none',
                        {
                            [`bg-[${props.bgColor}`]: props.bgColor,
                        },
                    )}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            props.onBackdropClick?.();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            e.preventDefault();
                        }
                    }}
                >
                    {props.children}
                </motion.dialog>
            )}
        </AnimatePresence>,
        document.getElementById('modal-root')!,
    );
}
