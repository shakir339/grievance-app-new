import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { complaintService, ComplaintSubmitRequest } from "@/services/complaintService";
import { useNavigate } from "react-router-dom";

const SubmitComplaint = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    attachment: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        attachment: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const complaintData: ComplaintSubmitRequest = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        attachment: formData.attachment,
      };
      
      const response = await complaintService.submitComplaint(complaintData);
      
      toast.success("Complaint submitted successfully!", {
        description: `Your complaint has been recorded with tracking ID: ${response.id}`,
      });
      
      setFormData({
        title: "",
        category: "",
        description: "",
        attachment: null,
      });
      
      navigate('/');
    } catch (error) {
      toast.error("Failed to submit complaint", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto py-8 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Submit a Complaint</CardTitle>
            <CardDescription>
              Fill out the form below to submit your grievance. We'll review it and get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Complaint Title
                </label>
                <Input
                  id="title"
                  placeholder="Brief title of your complaint"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select value={formData.category} onValueChange={handleSelectChange} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic Issues</SelectItem>
                    <SelectItem value="faculty">Faculty Behavior</SelectItem>
                    <SelectItem value="infrastructure">Campus Infrastructure</SelectItem>
                    <SelectItem value="hostel">Hostel/Accommodation</SelectItem>
                    <SelectItem value="examination">Examination & Results</SelectItem>
                    <SelectItem value="fees">Fees & Financial Matters</SelectItem>
                    <SelectItem value="ragging">Ragging/Harassment</SelectItem>
                    <SelectItem value="canteen">Canteen/Food Services</SelectItem>
                    <SelectItem value="library">Library Services</SelectItem>
                    <SelectItem value="transport">Transport Services</SelectItem>
                    <SelectItem value="internet">Internet/Wi-Fi Issues</SelectItem>
                    <SelectItem value="admin">Administrative Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Detailed Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Please provide a detailed description of your complaint"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="attachment" className="text-sm font-medium">
                  Attachment (Optional)
                </label>
                <Input
                  id="attachment"
                  type="file"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500">
                  Supported file formats: JPG, PNG, PDF (Max size: 5MB)
                </p>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Complaint"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-5">
            <p className="text-sm text-gray-500">
              All complaints are reviewed within 24-48 hours. You will receive a confirmation email with tracking details.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubmitComplaint;
