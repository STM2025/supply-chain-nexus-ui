
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Edit, Trash2, Search, Shield, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemUserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrg, setFilterOrg] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Emma Thompson',
      email: 'emma@admin.com',
      role: 'super_admin',
      organization: 'System Org',
      status: 'active',
      lastLogin: '2024-06-12 10:30',
      modules: ['All']
    },
    {
      id: 2,
      name: 'Maria Gonzalez',
      email: 'maria@greenvalley.com',
      role: 'farm_wheat_specialist',
      organization: 'Green Valley Farms',
      status: 'active',
      lastLogin: '2024-06-12 09:15',
      modules: ['Farm Management', 'Supply Chain']
    },
    {
      id: 3,
      name: 'Raj Patel',
      email: 'raj@freshprocess.com',
      role: 'processor_wheat_specialist',
      organization: 'Fresh Process Co',
      status: 'active',
      lastLogin: '2024-06-11 16:45',
      modules: ['Processing', 'Supply Chain']
    },
    {
      id: 4,
      name: 'Aisha Khan',
      email: 'aisha@quickdist.com',
      role: 'warehouse_manager',
      organization: 'Quick Distribute',
      status: 'active',
      lastLogin: '2024-06-12 08:20',
      modules: ['Distribution', 'Supply Chain']
    },
    {
      id: 5,
      name: 'Carlos Mendes',
      email: 'carlos@citymart.com',
      role: 'retail_manager',
      organization: 'City Mart',
      status: 'active',
      lastLogin: '2024-06-10 14:30',
      modules: ['Retail', 'Supply Chain']
    },
    {
      id: 6,
      name: 'Li Wei',
      email: 'li@fasttrans.com',
      role: 'transporter',
      organization: 'Fast Trans',
      status: 'pending',
      lastLogin: '2024-06-09 12:00',
      modules: ['Transport', 'Supply Chain']
    }
  ];

  const getRoleColor = (role) => {
    const colors = {
      super_admin: 'bg-red-100 text-red-700',
      farm_wheat_specialist: 'bg-green-100 text-green-700',
      processor_wheat_specialist: 'bg-blue-100 text-blue-700',
      warehouse_manager: 'bg-purple-100 text-purple-700',
      retail_manager: 'bg-orange-100 text-orange-700',
      transporter: 'bg-yellow-100 text-yellow-700'
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrg = filterOrg === 'all' || user.organization === filterOrg;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesOrg && matchesRole;
  });

  const handleCreateUser = () => {
    toast({
      title: "User Created",
      description: "New user has been successfully created.",
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System User Management</h2>
          <p className="text-gray-600">Manage all users across organizations</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
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
                <Label htmlFor="user-org">Organization</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green_valley">Green Valley Farms</SelectItem>
                    <SelectItem value="fresh_process">Fresh Process Co</SelectItem>
                    <SelectItem value="quick_distribute">Quick Distribute</SelectItem>
                    <SelectItem value="city_mart">City Mart</SelectItem>
                    <SelectItem value="fast_trans">Fast Trans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="user-role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="farm_wheat_specialist">Farm Specialist</SelectItem>
                    <SelectItem value="processor_wheat_specialist">Processor Specialist</SelectItem>
                    <SelectItem value="warehouse_manager">Warehouse Manager</SelectItem>
                    <SelectItem value="retail_manager">Retail Manager</SelectItem>
                    <SelectItem value="transporter">Transporter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser}>
                  Create User
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
            <Select value={filterOrg} onValueChange={setFilterOrg}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                <SelectItem value="Green Valley Farms">Green Valley Farms</SelectItem>
                <SelectItem value="Fresh Process Co">Fresh Process Co</SelectItem>
                <SelectItem value="Quick Distribute">Quick Distribute</SelectItem>
                <SelectItem value="City Mart">City Mart</SelectItem>
                <SelectItem value="Fast Trans">Fast Trans</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="farm_wheat_specialist">Farm Specialist</SelectItem>
                <SelectItem value="processor_wheat_specialist">Processor Specialist</SelectItem>
                <SelectItem value="warehouse_manager">Warehouse Manager</SelectItem>
                <SelectItem value="retail_manager">Retail Manager</SelectItem>
                <SelectItem value="transporter">Transporter</SelectItem>
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
            <span>System Users ({filteredUsers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Organization</TableHead>
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
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{user.organization}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.replace('_', ' ')}
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
    </div>
  );
};

export default SystemUserManagement;
