
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Plus, Edit, Trash2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrgUserManagementProps {
  organizationType?: string;
}

const OrgUserManagement = ({ organizationType = 'farmer' }: OrgUserManagementProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Sample users data based on organization type
  const getOrgUsers = () => {
    switch (organizationType) {
      case 'farmer':
        return [
          { id: 1, name: 'John Smith', email: 'john@greenvalley.com', role: 'Field Supervisor', status: 'active', lastLogin: '2024-01-15' },
          { id: 2, name: 'Sarah Johnson', email: 'sarah@greenvalley.com', role: 'Agronomist', status: 'active', lastLogin: '2024-01-14' },
          { id: 3, name: 'Mike Davis', email: 'mike@greenvalley.com', role: 'Farm Worker', status: 'inactive', lastLogin: '2024-01-10' },
          { id: 4, name: 'Lisa Wong', email: 'lisa@greenvalley.com', role: 'Harvest Manager', status: 'active', lastLogin: '2024-01-15' }
        ];
      case 'processor':
        return [
          { id: 1, name: 'David Chen', email: 'david@freshprocess.com', role: 'Plant Manager', status: 'active', lastLogin: '2024-01-15' },
          { id: 2, name: 'Emma Wilson', email: 'emma@freshprocess.com', role: 'Quality Assurance', status: 'active', lastLogin: '2024-01-14' },
          { id: 3, name: 'James Brown', email: 'james@freshprocess.com', role: 'Production Supervisor', status: 'active', lastLogin: '2024-01-13' }
        ];
      case 'distributor':
        return [
          { id: 1, name: 'Ahmed Hassan', email: 'ahmed@quickdist.com', role: 'Warehouse Manager', status: 'active', lastLogin: '2024-01-15' },
          { id: 2, name: 'Sofia Rodriguez', email: 'sofia@quickdist.com', role: 'Inventory Planner', status: 'active', lastLogin: '2024-01-14' },
          { id: 3, name: 'Robert Kim', email: 'robert@quickdist.com', role: 'Logistics Coordinator', status: 'active', lastLogin: '2024-01-12' }
        ];
      case 'transporter':
        return [
          { id: 1, name: 'Carlos Mendez', email: 'carlos@fasttrans.com', role: 'Fleet Manager', status: 'active', lastLogin: '2024-01-15' },
          { id: 2, name: 'Nina Patel', email: 'nina@fasttrans.com', role: 'Driver', status: 'active', lastLogin: '2024-01-14' },
          { id: 3, name: 'Tom Anderson', email: 'tom@fasttrans.com', role: 'Route Coordinator', status: 'active', lastLogin: '2024-01-13' }
        ];
      default:
        return [];
    }
  };

  const orgUsers = getOrgUsers();

  const availableRoles = {
    farmer: ['Farm Owner', 'Field Supervisor', 'Agronomist', 'Farm Worker', 'Harvest Manager'],
    processor: ['Plant Manager', 'Quality Assurance', 'Production Supervisor', 'Process Engineer'],
    distributor: ['Warehouse Manager', 'Inventory Planner', 'Logistics Coordinator', 'Distribution Manager'],
    transporter: ['Fleet Manager', 'Driver', 'Route Coordinator', 'Dispatch Manager']
  };

  const handleAddUser = () => {
    toast({
      title: "User Added",
      description: "New user has been successfully added to the organization.",
    });
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">User Management</h3>
          <p className="text-gray-600">Manage users and their roles within your organization</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {(availableRoles[organizationType] || []).map(role => (
                      <SelectItem key={role} value={role.toLowerCase().replace(' ', '_')}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>
                  Add User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Organization Users</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgUserManagement;
