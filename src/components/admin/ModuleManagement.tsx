
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Settings, Users, Building2, Activity, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ModuleManagement = () => {
  const { toast } = useToast();

  const modules = [
    {
      id: 1,
      name: 'Supply Chain Management',
      description: 'Track product movements across the supply chain',
      status: 'active',
      organizations: 6,
      totalUsers: 48,
      resourceTypes: ['Supply_Chain', 'Products'],
      permissions: ['create', 'view', 'read', 'edit', 'approve'],
      usage: 85
    },
    {
      id: 2,
      name: 'Carbon Calculator',
      description: 'Calculate and track carbon footprint',
      status: 'active',
      organizations: 4,
      totalUsers: 23,
      resourceTypes: ['Farms', 'Products'],
      permissions: ['view', 'read', 'create'],
      usage: 62
    },
    {
      id: 3,
      name: 'Provenance Tracking',
      description: 'Track product origin and journey',
      status: 'active',
      organizations: 5,
      totalUsers: 35,
      resourceTypes: ['Products', 'Supply_Chain'],
      permissions: ['view', 'read', 'approve'],
      usage: 73
    },
    {
      id: 4,
      name: 'Farm Management',
      description: 'Manage farms, fields, and harvests',
      status: 'beta',
      organizations: 2,
      totalUsers: 12,
      resourceTypes: ['Farms', 'Fields'],
      permissions: ['create', 'view', 'read', 'edit', 'manage'],
      usage: 28
    },
    {
      id: 5,
      name: 'Processing Management',
      description: 'Manage processing plants and operations',
      status: 'active',
      organizations: 3,
      totalUsers: 18,
      resourceTypes: ['Processing_Plants', 'Products'],
      permissions: ['create', 'view', 'read', 'edit', 'control'],
      usage: 45
    },
    {
      id: 6,
      name: 'Transport Management',
      description: 'Manage vehicles and transport operations',
      status: 'maintenance',
      organizations: 2,
      totalUsers: 8,
      resourceTypes: ['Vehicles', 'Supply_Chain'],
      permissions: ['view', 'read', 'manage'],
      usage: 15
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700',
      beta: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-yellow-100 text-yellow-700',
      deprecated: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getUsageColor = (usage) => {
    if (usage >= 75) return 'bg-emerald-500';
    if (usage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleStatusToggle = (moduleId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'maintenance' : 'active';
    toast({
      title: "Module Status Updated",
      description: `Module status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Module Management</h2>
          <p className="text-gray-600">Manage system modules and their configurations</p>
        </div>
      </div>

      {/* Module Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Modules</p>
                <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Modules</p>
                <p className="text-2xl font-bold text-gray-900">
                  {modules.filter(m => m.status === 'active').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {modules.reduce((sum, m) => sum + m.totalUsers, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Organizations</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <Building2 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Settings className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(module.status)}>
                    {module.status}
                  </Badge>
                  <Switch
                    checked={module.status === 'active'}
                    onCheckedChange={() => handleStatusToggle(module.id, module.status)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Usage Stats */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Usage</span>
                    <span className="font-medium">{module.usage}%</span>
                  </div>
                  <Progress value={module.usage} className="h-2" />
                </div>

                {/* Module Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Organizations:</span>
                    <span className="font-medium ml-2">{module.organizations}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Users:</span>
                    <span className="font-medium ml-2">{module.totalUsers}</span>
                  </div>
                </div>

                {/* Resource Types */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Resource Types:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.resourceTypes.map((resource, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.permissions.map((permission, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="h-4 w-4 mr-1" />
                    Users
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Shield className="h-4 w-4 mr-1" />
                    Permissions
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Building2 className="h-4 w-4 mr-1" />
                    Orgs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModuleManagement;
