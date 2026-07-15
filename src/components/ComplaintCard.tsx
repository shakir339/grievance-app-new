
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export interface ComplaintProps {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
}

const ComplaintCard = ({ id, title, description, category, date, status }: ComplaintProps) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <StatusBadge status={status} />
        </div>
        <CardDescription>
          <span className="text-sm text-muted-foreground">Category: {category}</span>
          <span className="text-sm text-muted-foreground block">Submitted: {date}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/complaint/${id}`} className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
