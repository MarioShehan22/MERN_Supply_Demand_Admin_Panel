import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uploadImages } from "@/config/Upload"; // Import your Cloudinary upload utility
import AxiosInstance from "@/config/AxiosInstance";
import { useToast } from "@/components/ui/use-toast";

interface LocationFormData {
    locationName: string;
    temperature: number | "";
    image: string;
    description: string;
    type: string;
    accessibility_info?: string;
    best_visit_time: string;
    facilities?: string;
    is_active: boolean;
    to: string;
}

const LocationForm: React.FC = () => {
    const [formData, setFormData] = useState<LocationFormData>({
        locationName: "",
        temperature: "",
        image: "",
        description: "",
        type: "",
        accessibility_info: "",
        best_visit_time: "",
        facilities: "",
        is_active: false,
        to: "",
    });

    const [imageUploading, setImageUploading] = useState(false);
    const { toast } = useToast();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setImageUploading(true);
        console.log(e.target.files);
        try {
            // Use the Cloudinary upload function
            const urls = await uploadImages(Array.from(e.target.files));

            if (urls.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    image: urls[0], // We're just using the first image
                }));
                toast({
                    title: "Success",
                    description: "Image uploaded successfully!"
                });
            } else {
                throw new Error("No images were uploaded");
            }
        } catch (err: any) {
            toast({
                title: "Error",
                description: "Image upload failed: " + (err.message || "Unknown error"),
                variant: "destructive",
            });
        } finally {
            setImageUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (
            !formData.locationName ||
            !formData.temperature ||
            !formData.image ||
            !formData.description ||
            !formData.type ||
            !formData.best_visit_time ||
            !formData.to
        ) {
            toast({
                title: "Validation Error",
                description: "Please fill all required fields.",
                variant: "destructive"
            });
            return;
        }

        try {
            // Submit to your API
            await AxiosInstance.post("/location/create", {
                ...formData,
                temperature: Number(formData.temperature),
            });

            toast({
                title: "Success",
                description: "Location created successfully!"
            });

            // Reset form after successful submission
            setFormData({
                locationName: "",
                temperature: "",
                image: "",
                description: "",
                type: "",
                accessibility_info: "",
                best_visit_time: "",
                facilities: "",
                is_active: false,
                to: "",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || "Failed to create location",
                variant: "destructive",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-8xl mx-auto p-2 space-y-2"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "1.0rem",
                alignItems: "start",
            }}
        >
            {/* Location Name */}
            <div>
                <Label htmlFor="locationName">Location Name *</Label>
                <Input
                    id="locationName"
                    name="locationName"
                    value={formData.locationName}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Temperature */}
            <div>
                <Label htmlFor="temperature">Temperature (°C) *</Label>
                <Input
                    id="temperature"
                    name="temperature"
                    type="number"
                    value={formData.temperature}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Image Upload */}
            <div>
                <Label htmlFor="image">Image *</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={imageUploading}
                />
                {imageUploading && <p className="text-sm text-gray-500">Uploading...</p>}
                {formData.image && (
                    <div className="mt-2">
                        <img
                            src={formData.image}
                            alt="Location preview"
                            className="w-32 h-auto rounded-md object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Description (span 3 columns) */}
            <div className="col-span-3">
                <Label htmlFor="description">Description *</Label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full rounded border p-2"
                />
            </div>

            {/* Type */}
            <div>
                <Label htmlFor="type">Type *</Label>
                <Input
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Accessibility Info */}
            <div>
                <Label htmlFor="accessibility_info">Accessibility Info</Label>
                <Input
                    id="accessibility_info"
                    name="accessibility_info"
                    value={formData.accessibility_info}
                    onChange={handleChange}
                />
            </div>

            {/* Best Visit Time */}
            <div>
                <Label htmlFor="best_visit_time">Best Visit Time *</Label>
                <Input
                    id="best_visit_time"
                    name="best_visit_time"
                    value={formData.best_visit_time}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Facilities */}
            <div>
                <Label htmlFor="facilities">Facilities</Label>
                <Input
                    id="facilities"
                    name="facilities"
                    value={formData.facilities}
                    onChange={handleChange}
                />
            </div>

            {/* Is Active */}
            <div className="flex items-center gap-2">
                <input
                    id="is_active"
                    name="is_active"
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4"
                />
                <Label htmlFor="is_active" className="mb-0 cursor-pointer">
                    Is Active
                </Label>
            </div>

            {/* To Location */}
            <div>
                <Label htmlFor="to">To Location *</Label>
                <Input
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Submit button spans all 3 columns */}
            <div className="col-span-3">
                <Button
                    type="submit"
                    disabled={imageUploading}
                    className="w-full"
                >
                    Create Location
                </Button>
            </div>
        </form>
    );
};

export default LocationForm;