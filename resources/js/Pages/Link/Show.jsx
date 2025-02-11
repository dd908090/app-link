import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LinkForm from "@/Pages/Link/LinkForm.jsx";

export default function Show({ short_link = null, message = null }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Link Aggregation
                </h2>
            }
        >
            <Head title="Link Aggregation" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md rounded-xl dark:bg-gray-800 p-8">
                        <LinkForm />

                        {short_link && (
                            <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
                                <p className="text-lg font-semibold">
                                    Shortened Link:
                                    <a
                                        href={short_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-blue-600 hover:underline"
                                    >
                                        {short_link}
                                    </a>
                                </p>
                            </div>
                        )}

                        {message && (
                            <div className={`mt-6 p-4 rounded-lg flex items-center ${
                                message.includes("занята")
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-100 text-blue-700"
                            }`}>
                                <p className="text-lg font-medium">
                                    {message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
