
import { Badge } from "@/components/ui/badge";

type StatusType = 'pending' | 'in-progress' | 'resolved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-status-pending';
      case 'in-progress':
        return 'bg-status-inProgress';
      case 'resolved':
        return 'bg-status-resolved';
      case 'rejected':
        return 'bg-status-rejected';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <Badge className={`${getStatusColor()} text-white`}>
      {getStatusText()}
    </Badge>
  );
};

export default StatusBadge;
