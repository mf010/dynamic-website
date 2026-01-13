import { useState, useCallback } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'primary';
    isLoading?: boolean;
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = 'تأكيد',
    message,
    confirmText = 'تأكيد',
    cancelText = 'إلغاء',
    variant = 'danger',
    isLoading = false,
}: ConfirmDialogProps) {
    const [loading, setLoading] = useState(false);

    const handleConfirm = useCallback(async () => {
        setLoading(true);
        try {
            await onConfirm();
        } finally {
            setLoading(false);
        }
    }, [onConfirm]);

    const buttonVariant = variant === 'primary' ? 'primary' : variant;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading || isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={buttonVariant}
                        onClick={handleConfirm}
                        isLoading={loading || isLoading}
                    >
                        {confirmText}
                    </Button>
                </>
            }
        >
            <p className="text-gray-600">{message}</p>
        </Modal>
    );
}
