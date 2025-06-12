
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Search, Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PermissionManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterResource, setFilterResource] = useState('all');

  const permissions = [
    'create', 'view', 'read', 'edit', 'approve', 'manage', 'control'
  ];

  const resourceTypes = [
    'Farms', 'Fields', 'Products', 'Supply_Chain', 'Processing_Plants',
    'Warehouses', 'Distribution_Locations', 'Retail_Locations', 'Retail_Stores', 'Vehicles'
  ];

  const roles = [
    'super_admin', 'farm_wheat_specialist', 'processor_wheat_specialist',
    'warehouse_manager', 'retail_manager', 'transporter'
  ];

  // Mock permission matrix data
  const permissionMatrix = {};
  roles.forEach(role => {
    permissionMatrix[role] = {};
    resourceTypes.forEach(resource => {
      permissionMatrix[role][resource] = {};
      permissions.forEach(permission => {
        // Generate some mock data
        permissionMatrix[role][resource][permission] = Math.random() > 0.6;
      });
    });
  });

  // Set specific permissions based on the schema
  if (permissionMatrix['super_admin']) {
    resourceTypes.forEach(resource => {
      permissions.forEach(permission => {
        permissionMatrix['super_admin'][resource][permission] = true;
      });
    });
  }

  const getPermissionColor = (permission) => {
    const colors = {
      create: 'bg-green-100 text-green-700',
      view: 'bg-blue-100 text-blue-700',
      read: 'bg-purple-100 text-purple-700',
      edit: 'bg-yellow-100 text-yellow-700',
      approve: 'bg-orange-100 text-orange-700',
      manage: 'bg-red-100 text-red-700',
      control: 'bg-gray-100 text-gray-700'
    };
    return colors[permission] || 'bg-gray-100 text-gray-700';
  };

  const handlePermissionToggle = (role, resource, permission) => {
    toast({
      title: "Permission Updated",
      description: `${permission} permission for ${role} on ${resource} has been updated.`,
    });
  };

  const filteredData = () => {
    if (filterRole === 'all' && filterResource === 'all') {
      return Object.entries(permissionMatrix);
    }
    
    const filtered = {};
    Object.entries(permissionMatrix).forEach(([role, resources]) => {
      if (filterRole === 'all' || role === filterRole) {
        filtered[role] = {};
        Object.entries(resources).forEach(([resource, perms]) => {
          if (filterResource === 'all' || resource === filterResource) {
            filtered[role][resource] = perms;
          }
        });
      }
    });
    
    return Object.entries(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Permission Management</h2>
          <p className="text-gray-600">Manage role-based access control permissions</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Permission Rule
        </Button>
      </div>

      {/* Permission Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Permissions</p>
                <p className="text-2xl font-bold text-gray-900">{permissions.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resource Types</p>
                <p className="text-2xl font-bold text-gray-900">{resourceTypes.length}</p>
              </div>
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Rules</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search permissions..."
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
                {roles.map(role => (
                  <SelectItem key={role} value={role}>
                    {role.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterResource} onValueChange={setFilterResource}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                {resourceTypes.map(resource => (
                  <SelectItem key={resource} value={resource}>
                    {resource}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Permission Matrix</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredData().map(([role, resources]) => (
              <div key={role} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {role.replace('_', ' ')}
                  </h3>
                  <Badge variant="outline">{Object.keys(resources).length} resources</Badge>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Resource Type</TableHead>
                        {permissions.map(permission => (
                          <TableHead key={permission} className="text-center">
                            <Badge className={getPermissionColor(permission)}>
                              {permission}
                            </Badge>
                          </TableHead>
                        ))}
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(resources).map(([resource, perms]) => (
                        <TableRow key={resource}>
                          <TableCell className="font-medium">{resource}</TableCell>
                          {permissions.map(permission => (
                            <TableCell key={permission} className="text-center">
                              <Checkbox
                                checked={perms[permission] || false}
                                onCheckedChange={() => handlePermissionToggle(role, resource, permission)}
                              />
                            </TableCell>
                          ))}
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permission Definitions */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {permissions.map(permission => (
              <div key={permission} className="p-4 rounded-lg border">
                <div className="flex items-center space-x-3 mb-2">
                  <Badge className={getPermissionColor(permission)}>
                    {permission}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {permission === 'create' && 'Create new records of a resource type'}
                  {permission === 'view' && 'View summary data of a resource type'}
                  {permission === 'read' && 'Read detailed records of a resource type'}
                  {permission === 'edit' && 'Edit records of a resource type'}
                  {permission === 'approve' && 'Approve actions on a resource type'}
                  {permission === 'manage' && 'Manage resource assignments and configurations'}
                  {permission === 'control' && 'Control high-level operations on a resource type'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionManagement;
