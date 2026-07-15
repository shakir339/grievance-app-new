import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ComplaintCard, { ComplaintProps } from "@/components/ComplaintCard";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";

const mockComplaints: ComplaintProps[] = [
  {
    id: "GRS1001",
    title: "Faulty Product Delivery",
    description: "I received a damaged product in the package. The box was crushed and the product inside was broken.",
    category: "Product Issue",
    date: "2025-05-01",
    status: "pending"
  },
  {
    id: "GRS1002",
    title: "Billing Discrepancy",
    description: "I was charged twice for my last order. Please check and refund the extra amount charged to my account.",
    category: "Billing Problem",
    date: "2025-05-02",
    status: "in-progress"
  },
  {
    id: "GRS1003",
    title: "Delayed Service Response",
    description: "My service request from last week is still pending. No technician has contacted me yet.",
    category: "Service Issue",
    date: "2025-05-03",
    status: "resolved"
  },
  {
    id: "GRS1004",
    title: "Rude Staff Behavior",
    description: "The customer service representative was extremely rude and unhelpful when I called regarding my issue.",
    category: "Staff Behavior",
    date: "2025-05-04",
    status: "rejected"
  },
  {
    id: "GRS1005",
    title: "Wrong Order Delivered",
    description: "I received someone else's order. My order number is #45678 but I received items I didn't order.",
    category: "Delivery Complaint",
    date: "2025-05-05",
    status: "pending"
  },
  {
    id: "GRS1006",
    title: "Website Malfunction",
    description: "I'm unable to place orders on your website. It shows an error at the payment stage every time.",
    category: "Other",
    date: "2025-05-06",
    status: "in-progress"
  },
];

const chartData = [
  { name: 'Jan', pending: 40, resolved: 24, rejected: 10 },
  { name: 'Feb', pending: 30, resolved: 45, rejected: 15 },
  { name: 'Mar', pending: 20, resolved: 55, rejected: 5 },
  { name: 'Apr', pending: 27, resolved: 58, rejected: 12 },
  { name: 'May', pending: 18, resolved: 48, rejected: 8 },
];

const pieData = [
  { name: 'Product Issue', value: 35 },
  { name: 'Service Issue', value: 25 },
  { name: 'Billing Problem', value: 20 },
  { name: 'Delivery Complaint', value: 15 },
  { name: 'Staff Behavior', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ADMIN_CREDENTIALS = {
  userId: "admin",
  password: "admin123"
};

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (userId === ADMIN_CREDENTIALS.userId && password === ADMIN_CREDENTIALS.password) {
        setIsAuthenticated(true);
        toast.success("Login successful", {
          description: "Welcome to the Admin Portal",
        });
      } else {
        toast.error("Login failed", {
          description: "Invalid user ID or password",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Admin Portal</CardTitle>
              <CardDescription className="text-center">
                Please enter your admin credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-sm font-medium">
                    User ID
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">
                      <User className="h-5 w-5" />
                    </span>
                    <Input
                      id="userId"
                      type="text"
                      className="pl-10"
                      placeholder="Enter your admin ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </span>
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login to Admin Portal"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500">
              <p className="w-full">
                This is a secured area. Unauthorized access is prohibited.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsAuthenticated(false);
              setUserId("");
              setPassword("");
              toast.info("Logged out successfully");
            }}
          >
            Logout
          </Button>
        </div>
        
        <Tabs defaultValue="complaints" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 mb-8">
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complaint Management</CardTitle>
                <CardDescription>View and manage all submitted complaints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search complaints by title, ID or description..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredComplaints.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredComplaints.map((complaint) => (
                      <ComplaintCard key={complaint.id} {...complaint} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No complaints found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Complaints Over Time</CardTitle>
                  <CardDescription>Monthly breakdown of complaint resolution status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pending" fill="#FFA500" />
                        <Bar dataKey="resolved" fill="#2ecc71" />
                        <Bar dataKey="rejected" fill="#e74c3c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Complaint Categories</CardTitle>
                  <CardDescription>Distribution by complaint type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Summary Statistics</CardTitle>
                <CardDescription>Key metrics for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Complaints</p>
                    <p className="text-2xl font-bold">142</p>
                    <p className="text-xs text-green-600">↑ 12% from last month</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-500">Resolved</p>
                    <p className="text-2xl font-bold">98</p>
                    <p className="text-xs text-green-600">↑ 8% from last month</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold">32</p>
                    <p className="text-xs text-red-600">↑ 5% from last month</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-500">Avg. Resolution Time</p>
                    <p className="text-2xl font-bold">1.8 days</p>
                    <p className="text-xs text-green-600">↓ 0.3 days from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure notification preferences and system behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifyNewComplaint" className="rounded" checked />
                        <label htmlFor="notifyNewComplaint">New Complaint Submissions</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifyStatusChange" className="rounded" checked />
                        <label htmlFor="notifyStatusChange">Complaint Status Changes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifyComments" className="rounded" checked />
                        <label htmlFor="notifyComments">New Comments on Complaints</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifyEscalation" className="rounded" checked />
                        <label htmlFor="notifyEscalation">Complaint Escalations</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Automated Responses</h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="autoReplyTemplate">New Complaint Auto-Reply Template</label>
                        <Textarea
                          id="autoReplyTemplate"
                          defaultValue="Thank you for submitting your complaint. Your complaint ID is [COMPLAINT_ID]. We will review it shortly and get back to you."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="resolvedTemplate">Resolved Complaint Template</label>
                        <Textarea
                          id="resolvedTemplate"
                          defaultValue="Your complaint [COMPLAINT_ID] has been resolved. If you are satisfied with the resolution, no further action is needed. If not, you may reply to this email."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">System Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="autoClosure">Auto-close resolved complaints after</label>
                        <div className="flex items-center space-x-2">
                          <Input id="autoClosure" type="number" defaultValue="14" className="w-20" />
                          <span>days</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="escalationThreshold">Auto-escalate complaints older than</label>
                        <div className="flex items-center space-x-2">
                          <Input id="escalationThreshold" type="number" defaultValue="3" className="w-20" />
                          <span>days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit">Save Settings</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
