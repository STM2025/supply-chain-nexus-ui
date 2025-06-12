
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Search, Edit, Plus, Users, MapPin } from "lucide-react";

const OrgResourceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const resources = [
    {
      id: 1,
      name: 'Main Wheat Farm',
      type: 'Farms',
      status: 'active',
      location: 'Rural County, State',
      assignedUsers: 5,
      createdBy: 'Maria Gonzalez',
      createdAt: '2024-01-15',
      lastActivity: '2024-06-12 10:30',
      details: { area: '100 acres', crop: 'Wheat' }
    },
    {
      id: 2,
      name: 'North Field A',
      type: 'Fields',
      status: 'active',
      location: 'Main Wheat Farm',
      assignedUsers: 3,
      createdBy: 'John Smith',
      createdAt: '2024-02-01',
      lastActivity: '2024-06-12 09:15',
      details: { area: '25 acres', crop: 'Winter Wheat' }
    },
    {
      id: 3,
      name: 'South Field B',
      type: 'Fields',
      status: 'active',
      location: 'Main Wheat Farm',
      assignedUsers: 2,
      createdBy: 'Sarah Johnson',
      createdAt: '2024-02-01',
      lastActivity: '2024-06-11 16:45',
      details: { area: '30 acres', crop: 'Spring Wheat' }
    },
    {
      id: 4,
      name: 'Organic Wheat Batch #001',
      type: 'Products',
      status: 'active',
      location: 'Storage Facility A',
      assignedUsers: 4,
      createdBy: 'Maria Gonzalez',
      createdAt: '2024-05-15',
      lastActivity: '2024-06-10 14:20',
      details: { quantity: '1000 kg', grade: 'Premium' }
    },
    {
      id: 5,
      name: 'Wheat to Processor',
      type: 'Supply_Chain',
      status: 'in_transit',
      location: 'En route to Fresh Process Co',
      assignedUsers: 2,
      createdBy: 'Lisa Wong',
      createdAt: '2024-06-10',
      lastActivity: '2024-06-12 08:00',
      details: { quantity: '800 kg', destination: 'Fresh Process Co' }
    }
  ];

  const getTypeColor = (type) => {
    const colors = {
      Farms: 'bg-green-100 text-green-700',
      Fields: 'bg-blue-100 text-blue-700',
      Products: 'bg-purple-100 text-purple-700',
      Supply_Chain: 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700',
      in_transit: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  const resourceStats = [
    {
      title: 'Total Resources',
      value: resources.length,
      icon: Activity,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Active Farms',
      value: resources.filter(r => r.type === 'Farms' && r.status === 'active').length,
      icon: MapPin,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Managed Fields',
      value: resources.filter(r => r.type === 'Fields').length,
      icon: Activity,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Active Products',
      value: resources.filter(r => r.type === 'Products' && r.status === 'active').length,
      icon: Users,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resource Management</h2>
          <p className="text-gray-600">Manage and monitor organization resources</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {resourceStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Farms">Farms</SelectItem>
                <SelectItem value="Fields">Fields</SelectItem>
                <SelectItem value="Products">Products</SelectItem>
                <SelectItem value="Supply_Chain">Supply Chain</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Resources ({filteredResources.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{resource.name}</p>
                      <p className="text-sm text-gray-500">
                        Created by {resource.createdBy} on {resource.createdAt}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(resource.type)}>
                      {resource.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(resource.status)}>
                      {resource.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{resource.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{resource.assignedUsers}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {resource.lastActivity}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resource Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Farms', 'Fields', 'Products', 'Supply_Chain'].map(type => {
                const count = resources.filter(r => r.type === type).length;
                const percentage = (count / resources.length) * 100;
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge className={getTypeColor(type)}>{type}</Badge>
                      <span className="text-sm text-gray-600">{count} resources</span>
                    </div>
                    <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredResources.slice(0, 4).map((resource) => (
                <div key={resource.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{resource.name}</p>
                    <p className="text-sm text-gray-600">
                      {resource.type} • Updated by {resource.createdBy}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{resource.lastActivity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrgResourceManagement;
