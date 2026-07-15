import { apiService, API_BASE_URL } from './api';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  userId?: number;
  attachments?: string[];
}

export interface ComplaintSubmitRequest {
  title: string;
  description: string;
  category: string;
  attachment?: File | null;
}

export interface ComplaintUpdateRequest {
  status?: string;
  comment?: string;
}

export const complaintService = {
  getComplaints: () => 
    apiService.get<Complaint[]>('/complaints/list.php'),
  
  getComplaintById: (id: string) => 
    apiService.get<Complaint>(`/complaints/detail.php?id=${id}`),
  
  submitComplaint: (complaintData: ComplaintSubmitRequest) => {
    if (complaintData.attachment) {
      const formData = new FormData();
      formData.append('title', complaintData.title);
      formData.append('description', complaintData.description);
      formData.append('category', complaintData.category);
      formData.append('attachment', complaintData.attachment);
      
      return fetch(`${API_BASE_URL}/complaints/submit.php`, {
        method: 'POST',
        body: formData,
      }).then(response => {
        if (!response.ok) throw new Error('Failed to submit complaint');
        return response.json();
      });
    }
    
    return apiService.post<{ id: string; message: string }>(
      '/complaints/submit.php', 
      complaintData
    );
  },
  
  updateComplaint: (id: string, updateData: ComplaintUpdateRequest) => 
    apiService.put<{ message: string }>(`/complaints/update.php?id=${id}`, updateData),
};
