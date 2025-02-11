import { Input, Button } from '@headlessui/react';
import CustomCard from "@/Components/CustomCard.jsx";
import CardContent from "@/Components/CardContent.jsx";
import { useForm } from "@inertiajs/react";

export default function LinkForm() {
    const { data, setData, post, errors, reset } = useForm({
        long_link: '',
        custom_link: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('links.store'));
    };

    return (
        <CustomCard className="bg-gray-100 p-6 shadow-md rounded-xl">
            <CardContent>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">🔗 Shorten Your URL</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label htmlFor="long_link" className="block text-gray-700 font-medium">
                            Original URL
                        </label>
                        <Input
                            type="url"
                            name="long_link"
                            placeholder="Enter your long link (e.g., https://example.com)"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            onChange={(e) => setData("long_link", e.target.value)}
                        />
                        {errors.long_link && <p className="text-red-600 text-sm">{errors.long_link}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="custom_link" className="block text-gray-700 font-medium">
                            Custom Short Link (Optional)
                        </label>
                        <Input
                            type="text"
                            name="custom_link"
                            placeholder="Enter custom short link (e.g., my-awesome-link)"
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                            onChange={(e) => setData("custom_link", e.target.value)}
                        />
                        {errors.custom_link && <p className="text-red-600 text-sm">{errors.custom_link}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold shadow-sm">
                        Shorten URL
                    </Button>
                </form>
            </CardContent>
        </CustomCard>
    );
}
