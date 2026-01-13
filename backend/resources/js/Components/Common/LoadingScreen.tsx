import Spinner from '../UI/Spinner';

interface LoadingScreenProps {
    message?: string;
    fullScreen?: boolean;
}

export default function LoadingScreen({
    message = 'جاري التحميل...',
    fullScreen = false,
}: LoadingScreenProps) {
    const content = (
        <div className="flex flex-col items-center justify-center gap-4">
            <Spinner size="xl" />
            <p className="text-gray-500 text-sm">{message}</p>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                {content}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[200px]">
            {content}
        </div>
    );
}
