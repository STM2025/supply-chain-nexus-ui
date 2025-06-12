
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Settings, Shield, Plus, Edit, Trash2 } from "lucide-react";
import OrganizationManagement from './OrganizationManagement';
import SystemUserManagement from './SystemUserManagement';
import ModuleManagement from './ModuleManagement';
import PermissionManagement from './PermissionManagement';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Organizations',
      value: '6',
      change: '+2 this month',
      icon: Building2,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'System Users',
      value: '24',
      change: '+5 this week',
      icon: Users,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      title: 'Active Modules',
      value: '6',
      change: 'All operational',
      icon: Settings,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Permission Rules',
      value: '156',
      change: '12 updated',
      icon: Shield,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New organization registered',
      organization: 'Organic Foods Ltd',
      timestamp: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      action: 'Module access granted',
      organization: 'Green Valley Farms',
      details: 'Carbon Calculator module',
      timestamp: '4 hours ago',
      type: 'info'
    },
    {
      id: 3,
      action: 'User role updated',
      organization: 'Fresh Process Co',
      details: 'Manager → Admin',
      timestamp: '1 day ago',
      type: 'warning'
    },
    {
      id: 4,
      action: 'Permission rule modified',
      organization: 'System',
      details: 'Supply chain approval workflow',
      timestamp: '2 days ago',
      type: 'info'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage system-wide organizations, users, modules, and permissions</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Quick Actions
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Recent System Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-emerald-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.organization}</p>
                        {activity.details && (
                          <p className="text-xs text-gray-500">{activity.details}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Database Connection</span>
                    <Badge className="bg-emerald-100 text-emerald-700">Healthy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">API Response Time</span>
                    <Badge className="bg-emerald-100 text-emerald-700">125ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Sessions</span>
                    <Badge className="bg-blue-100 text-blue-700">18</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Security Alerts</span>
                    <Badge className="bg-yellow-100 text-yellow-700">2 pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="organizations">
          <OrganizationManagement />
        </TabsContent>

        <TabsContent value="users">
          <SystemUserManagement />
        </TabsContent>

        <TabsContent value="modules">
          <ModuleManagement />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
