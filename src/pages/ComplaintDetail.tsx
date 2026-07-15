import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { MessageSquare, Paperclip, Clock, Calendar, User } from "lucide-react";

const mockComplaint = {
  id: "GRS1001",
  title: "Faulty Product Delivery",
  description: "I received a damaged product in the package. The box was crushed and the product inside was broken. This is unacceptable as I paid for express delivery to ensure safe handling. The damage appears to have occurred during transit as the outer packaging was also damaged. I would like a replacement or refund as soon as possible.",
  category: "Product Issue",
  dateSubmitted: "2025-05-01",
  status: "pending" as 'pending' | 'in-progress' | 'resolved' | 'rejected',
  userInfo: {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "123-456-7890"
  },
  updates: [
    {
      id: 1,
      date: "2025-05-01 14:30",
      user: "John Smith",
      message: "Complaint submitted",
      type: "system"
    },
    {
      id: 2,
      date: "2025-05-02 09:15",
      user: "Admin",
      message: "We've received your complaint and are reviewing it. We'll get back to you shortly.",
      type: "staff"
    }
  ]
};

const ComplaintDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [complaint] = useState(mockComplaint);
  const [newComment, setNewComment] = useState("");
  const [newStatus, setNewStatus] = useState<string>(complaint.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = (value: string) => {
    setNewStatus(value);
  };

  const handleUpdateStatus = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Status updated successfully!");
      complaint.status = newStatus as any;
      complaint.updates.push({
        id: complaint.updates.length + 1,
        date: new Date().toLocaleString(),
        user: "Admin",
        message: `Status updated to ${newStatus}`,
        type: "system"
      });
      setLoading(false);
    }, 1000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    setTimeout(() => {
      complaint.updates.push({
        id: complaint.updates.length + 1,
        date: new Date().toLocaleString(),
        user: "Admin",
        message: newComment,
        type: "staff"
      });
      setNewComment("");
      toast.success("Comment added successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Complaint #{id}</h1>
            <p className="text-muted-foreground">View and manage this complaint</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={newStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Set status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleUpdateStatus} disabled={loading}>Update Status</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{complaint.title}</CardTitle>
                  <StatusBadge status={complaint.status} />
                </div>
                <CardDescription>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Submitted on {complaint.dateSubmitted}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>{complaint.description}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                  <span>No attachments</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Category: {complaint.category}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Complaint Updates
                </CardTitle>
                <CardDescription>History of all actions and communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complaint.updates.map((update) => (
                    <div key={update.id} className="relative pl-6 border-l-2 border-gray-200 pb-6">
                      <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary" />
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{update.user}</p>
                          <p className="text-sm text-muted-foreground">{update.date}</p>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {update.type === 'system' ? 'System' : 'Staff'}
                        </span>
                      </div>
                      <p className="mt-2">{update.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <form onSubmit={handleAddComment} className="w-full space-y-4">
                  <Textarea
                    placeholder="Add a comment or update..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button type="submit" disabled={!newComment.trim() || loading}>
                    Add Comment
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Complainant Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                    <dd>{complaint.userInfo.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                    <dd>{complaint.userInfo.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                    <dd>{complaint.userInfo.phone}</dd>
                  </div>
                </dl>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${complaint.userInfo.email}`}>Contact User</a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Submitted</span>
                    <span className="font-medium">{complaint.dateSubmitted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="font-medium">
                      {complaint.updates[complaint.updates.length - 1].date.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Resolution Target</span>
                    <span className="font-medium">
                      2025-05-06
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">Export as PDF</Button>
                <Button variant="outline" className="w-full justify-start">Forward to Department</Button>
                <Button variant="outline" className="w-full justify-start">Send Reminder</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
