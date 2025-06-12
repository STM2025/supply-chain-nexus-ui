
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, Shield, Plus, Activity, TrendingUp } from "lucide-react";
import OrgUserManagement from './OrgUserManagement';
import OrgModuleAccess from './OrgModuleAccess';
import OrgResourceManagement from './OrgResourceManagement';

const OrgAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const orgStats = [
    {
      title: 'Organization Users',
      value: '12',
      change: '+3 this month',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Active Modules',
      value: '4',
      change: '2 pending approval',
      icon: Settings,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      title: 'Resources Managed',
      value: '28',
      change: '+8 this week',
      icon: Activity,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Permission Groups',
      value: '6',
      change: 'All active',
      icon: Shield,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const moduleStatus = [
    { name: 'Supply Chain Management', status: 'active', users: 8 },
    { name: 'Carbon Calculator', status: 'active', users: 5 },
    { name: 'Provenance Tracking', status: 'active', users: 12 },
    { name: 'Farm Management', status: 'pending', users: 0 }
  ];

  const recentActions = [
    {
      id: 1,
      action: 'User role updated',
      user: 'John Smith',
      details: 'Field Worker → Supervisor',
      timestamp: '1 hour ago'
    },
    {
      id: 2,
      action: 'Module access granted',
      user: 'Sarah Johnson',
      details: 'Carbon Calculator',
      timestamp: '3 hours ago'
    },
    {
      id: 3,
      action: 'New user added',
      user: 'Mike Davis',
      details: 'Farm Worker role',
      timestamp: '1 day ago'
    },
    {
      id: 4,
      action: 'Permission updated',
      user: 'Lisa Wong',
      details: 'Resource approval rights',
      timestamp: '2 days ago'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Dashboard</h1>
          <p className="text-gray-600 mt-2">Green Valley Farms - Manage users, modules, and access controls</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orgStats.map((stat, index) => (
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Module Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Module Access Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moduleStatus.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{module.name}</p>
                        <p className="text-xs text-gray-500">{module.users} users assigned</p>
                      </div>
                      <Badge className={module.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}>
                        {module.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActions.map((action) => (
                    <div key={action.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{action.action}</p>
                        <p className="text-sm text-gray-600">{action.user}</p>
                        <p className="text-xs text-gray-500">{action.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{action.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <OrgUserManagement />
        </TabsContent>

        <TabsContent value="modules">
          <OrgModuleAccess />
        </TabsContent>

        <TabsContent value="resources">
          <OrgResourceManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrgAdminDashboard;
