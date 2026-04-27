// In-memory data store for ReliefLink AI

export const volunteers = [
  { id: 'v1', name: 'Aisha Khan', skills: ['Medical', 'First Aid'], location: 'Downtown', distance: 2.5, profilePicture: '/placeholder.png' },
  { id: 'v2', name: 'Marcus Johnson', skills: ['Fire', 'Search & Rescue'], location: 'Westside', distance: 5.1, profilePicture: '/placeholder.png' },
  { id: 'v3', name: 'Elena Rodriguez', skills: ['Food', 'Logistics'], location: 'North Hills', distance: 8.0, profilePicture: '/placeholder.png' },
  { id: 'v4', name: 'David Chen', skills: ['General', 'Heavy Lifting'], location: 'Uptown', distance: 1.2, profilePicture: '/placeholder.png' },
  { id: 'v5', name: 'Sarah Miller', skills: ['Medical', 'Pediatrics'], location: 'Eastside', distance: 12.4, profilePicture: '/placeholder.png' },
  { id: 'v6', name: 'Liam Patel', skills: ['Logistics', 'Coordination'], location: 'Southtown', distance: 3.3, profilePicture: '/placeholder.png' },
  { id: 'v7', name: 'Nina Gomez', skills: ['Water Rescue', 'First Aid'], location: 'Riverside', distance: 6.7, profilePicture: '/placeholder.png' },
  { id: 'v8', name: 'Omar Ali', skills: ['Medical', 'Psychology'], location: 'Midtown', distance: 4.0, profilePicture: '/placeholder.png' },
  { id: 'v9', name: 'Priya Singh', skills: ['Food Distribution', 'Community Outreach'], location: 'Old Town', distance: 9.2, profilePicture: '/placeholder.png' },
  { id: 'v10', name: 'Carlos Mendes', skills: ['Engineering', 'Infrastructure'], location: 'Industrial Zone', distance: 7.5, profilePicture: '/placeholder.png' },
  { id: 'v11', name: 'Fatima Zahra', skills: ['Medical', 'Nursing'], location: 'Harbor', distance: 2.0, profilePicture: '/placeholder.png' },
  { id: 'v12', name: 'James Lee', skills: ['Search & Rescue', 'Navigation'], location: 'Hilltop', distance: 5.8, profilePicture: '/placeholder.png' },
  { id: 'v13', name: 'Sofia Ivanova', skills: ['Logistics', 'Supply Chain'], location: 'East End', distance: 11.3, profilePicture: '/placeholder.png' },
  { id: 'v14', name: 'Tomás Ruiz', skills: ['Firefighting', 'Hazardous Materials'], location: 'Northwest', distance: 3.9, profilePicture: '/placeholder.png' },
  { id: 'v15', name: 'Aisha Al-Mansour', skills: ['Medical', 'Trauma Care'], location: 'Central', distance: 1.8, profilePicture: '/placeholder.png' },
  { id: 'v16', name: 'Ravi Kumar', skills: ['Engineering', 'Construction'], location: 'Southwest', distance: 6.2, profilePicture: '/placeholder.png' },
  { id: 'v17', name: 'Emily Watson', skills: ['Psychology', 'Counseling'], location: 'Lakeside', distance: 4.5, profilePicture: '/placeholder.png' },
  { id: 'v18', name: 'Yusuf Hassan', skills: ['Water Rescue', 'Diving'], location: 'Coastal', distance: 2.7, profilePicture: '/placeholder.png' }
];

export const requests = [
  {
    id: 'req-1',
    title: 'Medical Assistance Needed',
    description: 'Elderly patient with minor injuries after fall.',
    location: 'Uptown',
    category: 'Medical',
    status: 'Pending',
    priority: null,
    assignedVolunteerId: null,
    explanation: null,
    createdAt: new Date().toISOString()
  }
];

export function getRequests() {
  return [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addRequest(requestData) {
  const newRequest = {
    id: `req-${Date.now()}`,
    ...requestData,
    status: 'Pending',
    priority: null,
    assignedVolunteerId: null,
    explanation: null,
    createdAt: new Date().toISOString()
  };
  requests.push(newRequest);
  return newRequest;
}

export function updateRequest(id, data) {
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...data };
    return requests[index];
  }
  return null;
}
