
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, FileText, LogIn, UserPlus, Settings, Shield } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-black">Grievance Redressal System</h1>
        </div>
        <nav>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Button
                variant={currentPath === "/" ? "secondary" : "ghost"}
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant={currentPath === "/submit-complaint" ? "secondary" : "ghost"}
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/submit-complaint">
                  <FileText className="h-4 w-4" />
                  <span>Submit Complaint</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant={currentPath === "/login" ? "secondary" : "ghost"}
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant={currentPath === "/register" ? "secondary" : "ghost"}
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/register">
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant={currentPath === "/admin" ? "secondary" : "ghost"}
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/admin">
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
