
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Plus, Edit, Trash2, Search, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrgUserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const orgUsers = [
    {
      id: 1,
      name: 'Maria Gonzalez',
      email: 'maria@greenvalley.com',
      role: 'farm_owner',
      status: 'active',
      lastLogin: '2024-06-12 09:15',
      modules: ['Farm Management', 'Supply Chain', 'Carbon Calculator'],
      permissions: {
        farms: ['create', 'view', 'read', 'edit', 'manage'],
        fields: ['create', 'view', 'read', 'edit'],
        products: ['view', 'read', 'approve']
      }
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@greenvalley.com',
      role: 'field_supervisor',
      status: 'active',
      lastLogin: '2024-06-11 16:30',
      modules: ['Farm Management'],
      permissions: {
        fields: ['view', 'read', 'edit'],
        products: ['view']
      }
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah.j@greenvalley.com',
      role: 'agronomist',
      status: 'active',
      lastLogin: '2024-06-12 08:45',
      modules: ['Farm Management', 'Carbon Calculator'],
      permissions: {
        fields: ['view', 'read', 'manage'],
        products: ['view', 'read']
      }
    },
    {
      id: 4,
      name: 'Mike Davis',
      email: 'mike.d@greenvalley.com',
      role: 'farm_worker',
      status: 'active',
      lastLogin: '2024-06-10 14:20',
      modules: ['Farm Management'],
      permissions: {
        fields: ['view'],
        products: ['view']
      }
    },
    {
      id: 5,
      name: 'Lisa Wong',
      email: 'lisa.w@greenvalley.com',
      role: 'harvest_manager',
      status: 'pending',
      lastLogin: '2024-06-09 12:00',
      modules: ['Farm Management', 'Supply Chain'],
      permissions: {
        fields: ['view', 'read'],
        products: ['create', 'view', 'read', 'approve']
      }
    }
  ];

  const availableRoles = [
    { id: 'farm_owner', name: 'Farm Owner', description: 'Full access to farm operations' },
    { id: 'field_supervisor', name: 'Field Supervisor', description: 'Manage field operations' },
    { id: 'agronomist', name: 'Agronomist', description: 'Crop and soil expertise' },
    { id: 'farm_worker', name: 'Farm Worker', description: 'Basic field access' },
    { id: 'harvest_manager', name: 'Harvest Manager', description: 'Manage harvest operations' }
  ];

  const availableModules = [
    'Farm Management',
    'Supply Chain Management', 
    'Carbon Calculator',
    'Provenance Tracking'
  ];

  const getRoleColor = (role) => {
    const colors = {
      farm_owner: 'bg-emerald-100 text-emerald-700',
      field_supervisor: 'bg-blue-100 text-blue-700',
      agronomist: 'bg-purple-100 text-purple-700',
      farm_worker: 'bg-gray-100 text-gray-700',
      harvest_manager: 'bg-orange-100 text-orange-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-yellow-100 text-yellow-700',
      suspended: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredUsers = orgUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = () => {
    toast({
      title: "User Created",
      description: "New user has been successfully added to the organization.",
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Organization Users</h2>
          <p className="text-gray-600">Manage users and their access within Green Valley Farms</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-name">Full Name</Label>
                <Input id="user-name" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="user-role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map(role => (
                      <SelectItem key={role.id} value={role.id}>
                        <div>
                          <p className="font-medium">{role.name}</p>
                          <p className="text-xs text-gray-500">{role.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Module Access</Label>
                <div className="space-y-2 mt-2">
                  {availableModules.map(module => (
                    <div key={module} className="flex items-center space-x-2">
                      <Checkbox id={`module-${module}`} />
                      <Label htmlFor={`module-${module}`} className="text-sm">
                        {module}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser}>
                  Add User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {availableRoles.map(role => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Users ({filteredUsers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {availableRoles.find(r => r.id === user.role)?.name || user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.modules.slice(0, 2).map((module, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                      {user.modules.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.modules.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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

      {/* User Roles Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Available Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRoles.map((role) => (
              <div key={role.id} className="p-4 rounded-lg border">
                <div className="flex items-center space-x-3 mb-2">
                  <Badge className={getRoleColor(role.id)}>
                    {role.name}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                <div className="text-xs text-gray-500">
                  <p>Users with this role: {orgUsers.filter(u => u.role === role.id).length}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgUserManagement;
