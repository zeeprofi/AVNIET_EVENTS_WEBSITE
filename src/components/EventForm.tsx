
import { useState, useEffect } from "react";
import { Event } from "@/data/mockEvents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { MotionBox, fadeIn } from "./ui/motion";

interface EventFormProps {
  event?: Event;
  onSubmit: (eventData: Omit<Event, "id">) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const EventForm = ({
  event,
  onSubmit,
  onCancel,
  isEditing = false,
}: EventFormProps) => {
  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: "",
    shortDescription: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "Technical",
    image: "",
    contactInfo: "",
    isFeatured: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (event) {
      const { id, ...eventData } = event;
      setFormData(eventData);
    }
  }, [event]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required";
    } else if (formData.shortDescription.length > 150) {
      newErrors.shortDescription = "Short description must be less than 150 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    }

    if (!formData.time.trim()) {
      newErrors.time = "Time is required";
    }

    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!formData.image.match(/^https?:\/\/.+/)) {
      newErrors.image = "Please enter a valid URL";
    }

    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = "Contact information is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: checked,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));

    // Clear error when user selects
    if (errors.category) {
      setErrors((prev) => ({
        ...prev,
        category: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(formData);
      
      toast({
        title: isEditing ? "Event Updated" : "Event Created",
        description: isEditing 
          ? `${formData.title} has been updated successfully` 
          : `${formData.title} has been added successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Technical",
    "Cultural",
    "Sports",
    "Workshop",
    "Business",
    "Academic",
  ];

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Event" : "Add New Event"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Event Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">
              Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date"
              name="date"
              placeholder="e.g., June 10, 2025"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? "border-red-500" : ""}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Short Description */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="shortDescription">
              Short Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className={errors.shortDescription ? "border-red-500" : ""}
            />
            {errors.shortDescription && (
              <p className="text-red-500 text-sm">{errors.shortDescription}</p>
            )}
            <p className="text-sm text-gray-500">
              Brief description for event cards (max 150 characters)
            </p>
          </div>

          {/* Full Description */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">
              Full Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label htmlFor="time">
              Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="time"
              name="time"
              placeholder="e.g., 10:00 AM - 4:00 PM"
              value={formData.time}
              onChange={handleChange}
              className={errors.time ? "border-red-500" : ""}
            />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time}</p>
            )}
          </div>

          {/* Venue */}
          <div className="space-y-2">
            <Label htmlFor="venue">
              Venue <span className="text-red-500">*</span>
            </Label>
            <Input
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className={errors.venue ? "border-red-500" : ""}
            />
            {errors.venue && (
              <p className="text-red-500 text-sm">{errors.venue}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger
                id="category"
                className={errors.category ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <Label htmlFor="contactInfo">
              Contact Info <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactInfo"
              name="contactInfo"
              placeholder="Email or phone number"
              value={formData.contactInfo}
              onChange={handleChange}
              className={errors.contactInfo ? "border-red-500" : ""}
            />
            {errors.contactInfo && (
              <p className="text-red-500 text-sm">{errors.contactInfo}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="image">
              Image URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="image"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              className={errors.image ? "border-red-500" : ""}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image}</p>
            )}
          </div>

          {/* Featured checkbox */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="isFeatured">Feature this event on homepage</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update Event"
              : "Create Event"}
          </Button>
        </div>
      </form>
    </MotionBox>
  );
};
