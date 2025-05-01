import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uploadImages } from "@/config/Upload"; // Your Cloudinary upload utility
import AxiosInstance from "@/config/AxiosInstance";
import { useToast } from "@/components/ui/use-toast";

interface TourFormData {
    title: string;
    description: string;
    location: string;
    startDate: string; // ISO string for date input
    endDate: string;
    duration: number | "";
    price: number | "";
    maxParticipants: number | "";
    image: string;
    cancellationPolicy: string;
    status: "Active" | "Completed" | "Cancelled";
    guideId: string; // passed as prop
}

const TourForm: React.FC = () =>{
    const [formData, setFormData] = useState<TourFormData>({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        duration: "",
        price: "",
        maxParticipants: "",
        image: "",
        cancellationPolicy: "",
        status: "Active",
        guideId:"",
    });

    const [imageUploading, setImageUploading] = useState(false);
    const { toast } = useToast();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "number"
                    ? value === ""
                        ? ""
                        : Number(value)
                    : value,
        }));
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setImageUploading(true);
        try {
            const urls = await uploadImages(Array.from(e.target.files));
            if (urls.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    image: urls[0],
                }));
                toast({
                    title: "Success",
                    description: "Image uploaded successfully!",
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

        // Basic validation
        if (
            !formData.title ||
            !formData.description ||
            !formData.location ||
            !formData.startDate ||
            !formData.endDate ||
            !formData.duration ||
            !formData.price ||
            !formData.maxParticipants ||
            !formData.image ||
            !formData.cancellationPolicy ||
            !formData.guideId
        ) {
            toast({
                title: "Validation Error",
                description: "Please fill all required fields.",
                variant: "destructive",
            });
            return;
        }

        try {
            // Submit to your API
            await AxiosInstance.post("/tours/create", {
                ...formData,
                duration: Number(formData.duration),
                price: Number(formData.price),
                maxParticipants: Number(formData.maxParticipants),
            });

            toast({
                title: "Success",
                description: "Tour created successfully!",
            });

            // Reset form
            setFormData({
                title: "",
                description: "",
                location: "",
                startDate: "",
                endDate: "",
                duration: "",
                price: "",
                maxParticipants: "",
                image: "",
                cancellationPolicy: "",
                status: "Active",
                guideId:"",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || "Failed to create tour",
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
                gap: "1rem",
                alignItems: "start",
            }}
        >
            {/* Title */}
            <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Location */}
            <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Status */}
            <div>
                <Label htmlFor="status">Status *</Label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Start Date */}
            <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* End Date */}
            <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Duration (hours) */}
            <div>
                <Label htmlFor="duration">Duration (hours) *</Label>
                <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min={1}
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Price */}
            <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Max Participants */}
            <div>
                <Label htmlFor="maxParticipants">Max Participants *</Label>
                <Input
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    min={1}
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="guideId">guideId *</Label>
                <Input
                    id="guideId"
                    name="guideId"
                    type="text"
                    min={1}
                    value={formData.guideId}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* Cancellation Policy (span 3 columns) */}
            <div className="col-span-3">
                <Label htmlFor="cancellationPolicy">Cancellation Policy *</Label>
                <textarea
                    id="cancellationPolicy"
                    name="cancellationPolicy"
                    value={formData.cancellationPolicy}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full rounded border p-2"
                />
            </div>
            <div className="col-span-3">
                <Label htmlFor="description">Description *</Label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full rounded border p-2"
                />
            </div>
            {/* Image Upload */}
            <div className="col-span-3">
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
                            alt="Tour preview"
                            className="w-32 h-auto rounded-md object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Submit button spans all 3 columns */}
            <div className="col-span-3">
                <Button type="submit" disabled={imageUploading} className="w-full">
                    Create Tour
                </Button>
            </div>
        </form>
    );
};

export default TourForm;