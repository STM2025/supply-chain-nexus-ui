
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import SuperAdminDashboard from "@/components/admin/SuperAdminDashboard";
import OrgAdminDashboard from "@/components/admin/OrgAdminDashboard";
import { Users, Building2, Shield, Settings } from "lucide-react";

const Index = () => {
  const [currentUser, setCurrentUser] = useState('super_admin');
  const [currentOrg, setCurrentOrg] = useState('system');

  const userProfiles = {
    super_admin: {
      name: 'Emma Thompson',
      email: 'emma@admin.com',
      role: 'Super Admin',
      organization: 'System Organization',
      permissions: ['manage_organizations', 'manage_users', 'control_all_resources']
    },
    org_admin: {
      name: 'Maria Gonzalez', 
      email: 'maria@greenvalley.com',
      role: 'Organization Admin',
      organization: 'Green Valley Farms',
      permissions: ['manage_users', 'manage_modules', 'view_resources']
    }
  };

  const currentProfile = userProfiles[currentUser];

  const handleUserSwitch = (userType) => {
    setCurrentUser(userType);
    if (userType === 'super_admin') {
      setCurrentOrg('system');
    } else {
      setCurrentOrg('green_valley');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-emerald-600" />
                <h1 className="text-xl font-bold text-gray-900">SupplyChain Pro</h1>
              </div>
              <Badge variant="outline" className="text-emerald-700 border-emerald-200">
                {currentProfile.role}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={currentUser} onValueChange={handleUserSwitch}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin View</SelectItem>
                  <SelectItem value="org_admin">Organization Admin View</SelectItem>
                </SelectContent>
              </Select>
              
              <Card className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currentProfile.name}</p>
                    <p className="text-xs text-gray-500">{currentProfile.organization}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentUser === 'super_admin' ? (
          <SuperAdminDashboard />
        ) : (
          <OrgAdminDashboard />
        )}
      </main>
    </div>
  );
};

export default Index;
