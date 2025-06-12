
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Package, Plus, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductScopeManagement = ({ organizationType = 'farmer' }) => {
  const { toast } = useToast();
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  // Sample product scopes based on organization type
  const getProductScopes = () => {
    switch (organizationType) {
      case 'farmer':
        return [
          { id: 1, name: 'Wheat Products', type: 'grain', assignedUsers: 5 },
          { id: 2, name: 'Organic Wheat', type: 'organic_grain', assignedUsers: 3 },
          { id: 3, name: 'Corn Products', type: 'grain', assignedUsers: 2 }
        ];
      case 'processor':
        return [
          { id: 1, name: 'Wheat Flour', type: 'processed_grain', assignedUsers: 4 },
          { id: 2, name: 'Organic Flour', type: 'organic_processed', assignedUsers: 2 },
          { id: 3, name: 'Bread Products', type: 'baked_goods', assignedUsers: 3 }
        ];
      case 'distributor':
        return [
          { id: 1, name: 'Packaged Flour', type: 'packaged_goods', assignedUsers: 3 },
          { id: 2, name: 'Bulk Grain', type: 'bulk_products', assignedUsers: 2 },
          { id: 3, name: 'Specialty Products', type: 'specialty', assignedUsers: 1 }
        ];
      case 'transporter':
        return [
          { id: 1, name: 'Refrigerated Goods', type: 'cold_chain', assignedUsers: 2 },
          { id: 2, name: 'Dry Goods', type: 'ambient', assignedUsers: 4 },
          { id: 3, name: 'Liquid Products', type: 'liquid_transport', assignedUsers: 1 }
        ];
      default:
        return [];
    }
  };

  const productScopes = getProductScopes();

  const userScopeAssignments = [
    { userId: 1, userName: 'John Smith', scopeIds: [1, 2], role: 'Field Supervisor' },
    { userId: 2, userName: 'Sarah Johnson', scopeIds: [1], role: 'Agronomist' },
    { userId: 3, userName: 'Mike Davis', scopeIds: [3], role: 'Farm Worker' },
    { userId: 4, userName: 'Lisa Wong', scopeIds: [1, 3], role: 'Harvest Manager' }
  ];

  const handleAssignScope = () => {
    toast({
      title: "Scope Assigned",
      description: "Product scope has been successfully assigned to user.",
    });
    setIsAssignDialogOpen(false);
  };

  const getScopeTypeColor = (type) => {
    const colors = {
      grain: 'bg-yellow-100 text-yellow-700',
      organic_grain: 'bg-green-100 text-green-700',
      processed_grain: 'bg-blue-100 text-blue-700',
      organic_processed: 'bg-emerald-100 text-emerald-700',
      baked_goods: 'bg-orange-100 text-orange-700',
      packaged_goods: 'bg-purple-100 text-purple-700',
      bulk_products: 'bg-gray-100 text-gray-700',
      specialty: 'bg-pink-100 text-pink-700',
      cold_chain: 'bg-cyan-100 text-cyan-700',
      ambient: 'bg-amber-100 text-amber-700',
      liquid_transport: 'bg-indigo-100 text-indigo-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Product Scope Management</h3>
          <p className="text-gray-600">Control user access to specific products and resources</p>
        </div>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Assign Scope
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Product Scope</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-select">Select User</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose user" />
                  </SelectTrigger>
                  <SelectContent>
                    {userScopeAssignments.map(user => (
                      <SelectItem key={user.userId} value={user.userId.toString()}>
                        {user.userName} - {user.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Product Scopes</Label>
                <div className="space-y-2 mt-2">
                  {productScopes.map(scope => (
                    <div key={scope.id} className="flex items-center space-x-2">
                      <Checkbox id={`scope-${scope.id}`} />
                      <Label htmlFor={`scope-${scope.id}`} className="text-sm">
                        {scope.name}
                      </Label>
                      <Badge className={getScopeTypeColor(scope.type)}>
                        {scope.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignScope}>
                  Assign Scope
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Product Scopes Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Available Product Scopes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productScopes.map(scope => (
              <div key={scope.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{scope.name}</h4>
                  <Badge className={getScopeTypeColor(scope.type)}>
                    {scope.type.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{scope.assignedUsers} users assigned</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Scope Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>User Scope Assignments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Assigned Scopes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userScopeAssignments.map((assignment) => (
                <TableRow key={assignment.userId}>
                  <TableCell className="font-medium">{assignment.userName}</TableCell>
                  <TableCell>{assignment.role}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {assignment.scopeIds.map(scopeId => {
                        const scope = productScopes.find(s => s.id === scopeId);
                        return scope ? (
                          <Badge key={scopeId} variant="outline" className="text-xs">
                            {scope.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
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

export default ProductScopeManagement;
