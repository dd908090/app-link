export default function CustomCard({ children, className = "" }) {
    return (
        <div className={`max-w-md mx-auto mt-10 p-6 shadow-xl bg-white rounded-2xl ${className}`}>
            {children}
        </div>
    );
}
