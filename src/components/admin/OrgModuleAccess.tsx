
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings, Users, Activity, Clock, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrgModuleAccess = () => {
  const { toast } = useToast();

  const orgModules = [
    {
      id: 1,
      name: 'Farm Management',
      description: 'Manage farms, fields, recipes, and harvest operations',
      status: 'active',
      assignedUsers: 8,
      totalUsers: 12,
      lastUsed: '2024-06-12 10:30',
      usage: 85,
      features: ['Farm Creation', 'Field Management', 'Harvest Tracking', 'Recipe Management']
    },
    {
      id: 2,
      name: 'Supply Chain Management',
      description: 'Track product movements and supply chain operations',
      status: 'active',
      assignedUsers: 6,
      totalUsers: 12,
      lastUsed: '2024-06-12 09:15',
      usage: 72,
      features: ['Product Tracking', 'Movement Logs', 'Approval Workflows']
    },
    {
      id: 3,
      name: 'Carbon Calculator',
      description: 'Calculate and track carbon footprint of operations',
      status: 'active',
      assignedUsers: 4,
      totalUsers: 12,
      lastUsed: '2024-06-11 16:45',
      usage: 45,
      features: ['Carbon Measurement', 'Emission Reports', 'Sustainability Metrics']
    },
    {
      id: 4,
      name: 'Provenance Tracking',
      description: 'Track product origin and journey through supply chain',
      status: 'pending',
      assignedUsers: 0,
      totalUsers: 12,
      lastUsed: 'Never',
      usage: 0,
      features: ['Origin Tracking', 'Journey Mapping', 'Authenticity Verification']
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-yellow-100 text-yellow-700',
      disabled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleModuleToggle = (moduleId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'disabled' : 'active';
    toast({
      title: "Module Status Updated",
      description: `Module status changed to ${newStatus}.`,
    });
  };

  const handleRequestAccess = (moduleName) => {
    toast({
      title: "Access Request Sent",
      description: `Request for ${moduleName} module has been sent to Super Admin.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Module Access Management</h2>
          <p className="text-gray-600">Manage module access for Green Valley Farms</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Request New Module
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Module Access</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600">
                Request access to additional modules for your organization. 
                Your request will be reviewed by the Super Admin.
              </p>
              <div className="space-y-3">
                {['Processing Management', 'Distribution Management', 'Retail Management', 'Transport Management'].map(module => (
                  <div key={module} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{module}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRequestAccess(module)}
                    >
                      Request
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Module Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Modules</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orgModules.filter(m => m.status === 'active').length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orgModules.reduce((sum, m) => sum + m.assignedUsers, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Usage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(orgModules.reduce((sum, m) => sum + m.usage, 0) / orgModules.length)}%
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orgModules.filter(m => m.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orgModules.map((module) => (
          <Card key={module.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Settings className="h-5 w-5 text-emerald-600" />
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
                  {module.status !== 'pending' && (
                    <Switch
                      checked={module.status === 'active'}
                      onCheckedChange={() => handleModuleToggle(module.id, module.status)}
                    />
                  )}
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
                    <span className="text-gray-600">Assigned Users:</span>
                    <span className="font-medium ml-2">{module.assignedUsers}/{module.totalUsers}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Used:</span>
                    <span className="font-medium ml-2 text-xs">{module.lastUsed}</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  {module.status === 'pending' ? (
                    <Button variant="outline" size="sm" className="flex-1" disabled>
                      Awaiting Approval
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Users className="h-4 w-4 mr-1" />
                        Assign Users
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Module Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Resource Access</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Farms Management:</span>
                  <Badge variant="outline">Full Access</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fields Management:</span>
                  <Badge variant="outline">Full Access</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Products:</span>
                  <Badge variant="outline">Create, View, Edit</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Supply Chain:</span>
                  <Badge variant="outline">View, Track</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">User Permissions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Farm Owner:</span>
                  <Badge variant="outline">All Permissions</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Field Supervisor:</span>
                  <Badge variant="outline">Field Management</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Farm Worker:</span>
                  <Badge variant="outline">View Only</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Harvest Manager:</span>
                  <Badge variant="outline">Harvest Operations</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgModuleAccess;
