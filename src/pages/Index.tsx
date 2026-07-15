import { Button } from "@/components/ui/button";
import { FileText, ChevronRight, Check, Activity, BarChart3, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">Grievance Redressal System</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              A simple and effective way to submit your complaints and track their resolution
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-white text-blue-800 hover:bg-gray-100">
                <Link to="/submit-complaint" className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Submit Complaint
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800" asChild>
                <Link to="/login">Login to Track</Link>
              </Button>
              <Button size="lg" variant="secondary" className="bg-amber-500 text-white hover:bg-amber-600" asChild>
                <Link to="/admin" className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Portal
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Submit Your Complaint</h3>
                <p className="text-gray-600 mb-4">Fill out our easy-to-use form with details of your grievance.</p>
                <Link to="/submit-complaint" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                  Submit Now <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Track Progress</h3>
                <p className="text-gray-600 mb-4">Monitor the status of your complaint through our dashboard.</p>
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                  Track Status <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">Get Resolution</h3>
                <p className="text-gray-600 mb-4">Receive updates and resolution for your submitted complaints.</p>
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                  Register Now <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6 text-black">Admin Portal</h2>
            <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
              Access the administrator dashboard to manage complaints, track statistics, and generate reports.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800" asChild>
                <Link to="/admin" className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Access Admin Portal
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-600">Resolution Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">48h</div>
                <p className="text-gray-600">Average Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                <p className="text-gray-600">Complaints Handled</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
                <p className="text-gray-600">User Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-black">How do I submit a complaint?</h3>
                <p className="text-gray-600">Register an account, login, and use our submission form to file your complaint with all relevant details.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-black">How long does it take to resolve a complaint?</h3>
                <p className="text-gray-600">Most complaints are addressed within 48 hours, with resolution times varying based on complexity.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-black">Can I track the status of my complaint?</h3>
                <p className="text-gray-600">Yes, you can track the real-time status of your complaint through your personal dashboard after logging in.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Grievance Redressal System. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
