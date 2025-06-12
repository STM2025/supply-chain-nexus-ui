
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Users, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrgModuleAccessProps {
  organizationType?: string;
}

const OrgModuleAccess = ({ organizationType = 'farmer' }: OrgModuleAccessProps) => {
  const { toast } = useToast();

  // Sample module access data based on organization type
  const getModuleAccess = () => {
    switch (organizationType) {
      case 'farmer':
        return [
          { id: 1, name: 'Farm Management', description: 'Manage farms and fields', enabled: true, userCount: 8 },
          { id: 2, name: 'Carbon Calculator', description: 'Calculate carbon footprint', enabled: true, userCount: 5 },
          { id: 3, name: 'Provenance Tracking', description: 'Track product provenance', enabled: true, userCount: 12 },
          { id: 4, name: 'Supply Chain Management', description: 'Manage supply chain operations', enabled: false, userCount: 0 }
        ];
      case 'processor':
        return [
          { id: 1, name: 'Processing Management', description: 'Manage processing operations', enabled: true, userCount: 6 },
          { id: 2, name: 'Quality Control', description: 'Quality assurance and control', enabled: true, userCount: 4 },
          { id: 3, name: 'Supply Chain Management', description: 'Manage supply chain operations', enabled: true, userCount: 8 },
          { id: 4, name: 'Carbon Calculator', description: 'Calculate carbon footprint', enabled: false, userCount: 0 }
        ];
      case 'distributor':
        return [
          { id: 1, name: 'Warehouse Management', description: 'Manage warehouse operations', enabled: true, userCount: 5 },
          { id: 2, name: 'Supply Chain Management', description: 'Manage supply chain operations', enabled: true, userCount: 7 },
          { id: 3, name: 'Inventory Tracking', description: 'Track inventory levels', enabled: true, userCount: 3 },
          { id: 4, name: 'Transport Coordination', description: 'Coordinate transport logistics', enabled: false, userCount: 0 }
        ];
      case 'transporter':
        return [
          { id: 1, name: 'Fleet Management', description: 'Manage vehicle fleet', enabled: true, userCount: 4 },
          { id: 2, name: 'Route Optimization', description: 'Optimize delivery routes', enabled: true, userCount: 3 },
          { id: 3, name: 'Supply Chain Management', description: 'Manage supply chain operations', enabled: true, userCount: 6 },
          { id: 4, name: 'Vehicle Tracking', description: 'Track vehicle locations', enabled: false, userCount: 0 }
        ];
      default:
        return [];
    }
  };

  const [moduleAccess, setModuleAccess] = useState(getModuleAccess());

  const handleToggleModule = (moduleId: number) => {
    setModuleAccess(prev => 
      prev.map(module => 
        module.id === moduleId 
          ? { ...module, enabled: !module.enabled }
          : module
      )
    );
    
    const module = moduleAccess.find(m => m.id === moduleId);
    toast({
      title: `Module ${module?.enabled ? 'Disabled' : 'Enabled'}`,
      description: `${module?.name} has been ${module?.enabled ? 'disabled' : 'enabled'} for your organization.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Module Access Control</h3>
          <p className="text-gray-600">Control which modules are available to your organization</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configure Access
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Available Modules</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moduleAccess.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.name}</TableCell>
                  <TableCell>{module.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {module.enabled ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Badge className={module.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {module.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{module.userCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={module.enabled}
                        onCheckedChange={() => handleToggleModule(module.id)}
                      />
                      <Button variant="ghost" size="sm">
                        Configure
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

export default OrgModuleAccess;
