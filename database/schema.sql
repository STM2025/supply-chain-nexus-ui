
-- Supply Chain RBAC Database Schema
-- This schema supports the complete supply chain management system with role-based access control

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS Audit_Logs;
DROP TABLE IF EXISTS Control_Actions;
DROP TABLE IF EXISTS Approvals;
DROP TABLE IF EXISTS Resource_Scope_Assignments;
DROP TABLE IF EXISTS Resource_Scopes;
DROP TABLE IF EXISTS Vehicles_Attributes;
DROP TABLE IF EXISTS Retail_Stores_Attributes;
DROP TABLE IF EXISTS Retail_Locations_Attributes;
DROP TABLE IF EXISTS Distribution_Locations_Attributes;
DROP TABLE IF EXISTS Warehouses_Attributes;
DROP TABLE IF EXISTS Processing_Plants_Attributes;
DROP TABLE IF EXISTS Supply_Chain_Attributes;
DROP TABLE IF EXISTS Products_Attributes;
DROP TABLE IF EXISTS Fields_Attributes;
DROP TABLE IF EXISTS Farms_Attributes;
DROP TABLE IF EXISTS Resources;
DROP TABLE IF EXISTS Role_Permission_Resource_Types;
DROP TABLE IF EXISTS Organization_Permissions;
DROP TABLE IF EXISTS User_Roles;
DROP TABLE IF EXISTS Organization_Modules;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Resource_Types;
DROP TABLE IF EXISTS Permissions;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Modules;
DROP TABLE IF EXISTS Organizations;

-- Create Organizations table
CREATE TABLE Organizations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type ENUM('farmer', 'processor', 'distributor', 'retailer', 'transporter', 'system') NOT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_org_type (type),
    INDEX idx_org_status (status)
);

-- Create Modules table
CREATE TABLE Modules (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Organization_Modules table (many-to-many relationship)
CREATE TABLE Organization_Modules (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    organization_id BIGINT NOT NULL,
    module_id BIGINT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    enabled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    disabled_at TIMESTAMP NULL,
    UNIQUE KEY unique_org_module (organization_id, module_id),
    FOREIGN KEY (organization_id) REFERENCES Organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES Modules(id) ON DELETE CASCADE,
    INDEX idx_org_modules_org (organization_id),
    INDEX idx_org_modules_module (module_id)
);

-- Create Roles table
CREATE TABLE Roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    organization_type ENUM('farmer', 'processor', 'distributor', 'retailer', 'transporter', 'system', 'all') DEFAULT 'all',
    is_system_role BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_roles_org_type (organization_type),
    INDEX idx_roles_system (is_system_role)
);

-- Create Permissions table
CREATE TABLE Permissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    category ENUM('resource', 'system', 'organization') DEFAULT 'resource',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Resource_Types table
CREATE TABLE Resource_Types (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    category ENUM('farm', 'processing', 'distribution', 'retail', 'transport', 'general') DEFAULT 'general',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Users table
CREATE TABLE Users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    organization_id BIGINT,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES Organizations(id) ON DELETE SET NULL,
    INDEX idx_user_org (organization_id),
    INDEX idx_user_email (email),
    INDEX idx_user_status (status)
);

-- Create User_Roles table (many-to-many relationship)
CREATE TABLE User_Roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    assigned_by BIGINT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE KEY unique_user_role (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES Users(id),
    INDEX idx_user_roles_user (user_id),
    INDEX idx_user_roles_role (role_id)
);

-- Create Role_Permission_Resource_Types table (defines what permissions each role has on resource types)
CREATE TABLE Role_Permission_Resource_Types (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    resource_type_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_role_perm_resource (role_id, permission_id, resource_type_id),
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES Permissions(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_type_id) REFERENCES Resource_Types(id) ON DELETE CASCADE,
    INDEX idx_role_perm_resource_role (role_id),
    INDEX idx_role_perm_resource_perm (permission_id),
    INDEX idx_role_perm_resource_type (resource_type_id)
);

-- Create Organization_Permissions table (defines what permissions an organization has)
CREATE TABLE Organization_Permissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    organization_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    resource_type_id BIGINT NOT NULL,
    granted_by BIGINT NOT NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE KEY unique_org_perm_resource (organization_id, permission_id, resource_type_id),
    FOREIGN KEY (organization_id) REFERENCES Organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES Permissions(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_type_id) REFERENCES Resource_Types(id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES Users(id),
    INDEX idx_org_perm_org (organization_id),
    INDEX idx_org_perm_perm (permission_id),
    INDEX idx_org_perm_resource (resource_type_id)
);

-- Create Resources table (stores actual resource instances)
CREATE TABLE Resources (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    resource_type_id BIGINT NOT NULL,
    organization_id BIGINT NOT NULL,
    created_by BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('active', 'inactive', 'maintenance', 'retired') DEFAULT 'active',
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_type_id) REFERENCES Resource_Types(id) ON DELETE RESTRICT,
    FOREIGN KEY (organization_id) REFERENCES Organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES Users(id),
    INDEX idx_resource_type_org (resource_type_id, organization_id),
    INDEX idx_resource_creator (created_by),
    INDEX idx_resource_status (status)
);

-- Create Resource_Scopes table (defines product-level access control)
CREATE TABLE Resource_Scopes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    resource_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    scope_type ENUM('product', 'category', 'location', 'custom') DEFAULT 'product',
    organization_id BIGINT NOT NULL,
    created_by BIGINT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (organization_id) REFERENCES Organizations(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES Users(id),
    INDEX idx_resource_scope_resource (resource_id),
    INDEX idx_resource_scope_org (organization_id),
    INDEX idx_resource_scope_type (scope_type)
);

-- Create Resource_Scope_Assignments table (assigns users to specific product scopes)
CREATE TABLE Resource_Scope_Assignments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    resource_scope_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    user_id BIGINT,
    assigned_by BIGINT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (resource_scope_id) REFERENCES Resource_Scopes(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES Users(id),
    INDEX idx_scope_product_user (resource_scope_id, product_id, user_id),
    INDEX idx_scope_assignments_user (user_id),
    INDEX idx_scope_assignments_product (product_id)
);

-- Resource-specific attribute tables

-- Create Farms_Attributes table
CREATE TABLE Farms_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    area DECIMAL(10,2),
    farm_type ENUM('organic', 'conventional', 'mixed') DEFAULT 'conventional',
    certification_level VARCHAR(100),
    soil_type VARCHAR(100),
    climate_zone VARCHAR(100),
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE
);

-- Create Fields_Attributes table
CREATE TABLE Fields_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    farm_id BIGINT NOT NULL,
    area DECIMAL(10,2),
    crop_type VARCHAR(100),
    planting_date DATE,
    harvest_date DATE,
    assigned_to BIGINT,
    field_condition ENUM('excellent', 'good', 'fair', 'poor') DEFAULT 'good',
    irrigation_type VARCHAR(50),
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (farm_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES Users(id) ON DELETE SET NULL,
    INDEX idx_field_farm (farm_id),
    INDEX idx_field_assigned (assigned_to)
);

-- Create Products_Attributes table
CREATE TABLE Products_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    product_code VARCHAR(50) UNIQUE,
    type VARCHAR(100),
    category VARCHAR(100),
    lifecycle_stage ENUM('new', 'used', 'recycled', 'remanufactured') NOT NULL,
    current_location VARCHAR(100),
    batch_number VARCHAR(100),
    quantity DECIMAL(15,3),
    unit VARCHAR(20),
    quality_grade ENUM('A', 'B', 'C', 'D') DEFAULT 'A',
    expiry_date DATE,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    INDEX idx_product_code (product_code),
    INDEX idx_product_type (type),
    INDEX idx_product_category (category)
);

-- Create Supply_Chain_Attributes table
CREATE TABLE Supply_Chain_Attributes (
    resource_id BIGINT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    from_organization_id BIGINT NOT NULL,
    to_organization_id BIGINT NOT NULL,
    movement_date DATE,
    movement_type ENUM('sale', 'return', 'recycling', 'remanufacturing', 'transfer') NOT NULL,
    quantity DECIMAL(15,3),
    unit VARCHAR(20),
    tracking_number VARCHAR(100),
    status ENUM('pending', 'in_transit', 'delivered', 'cancelled') DEFAULT 'pending',
    estimated_delivery DATE,
    actual_delivery DATE,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (from_organization_id) REFERENCES Organizations(id) ON DELETE RESTRICT,
    FOREIGN KEY (to_organization_id) REFERENCES Organizations(id) ON DELETE RESTRICT,
    INDEX idx_supply_chain_product (product_id),
    INDEX idx_supply_chain_from (from_organization_id),
    INDEX idx_supply_chain_to (to_organization_id),
    INDEX idx_supply_chain_tracking (tracking_number)
);

-- Create Processing_Plants_Attributes table
CREATE TABLE Processing_Plants_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    capacity DECIMAL(15,3),
    capacity_unit VARCHAR(20),
    plant_type VARCHAR(100),
    certification_level VARCHAR(100),
    operational_status ENUM('operational', 'maintenance', 'shutdown') DEFAULT 'operational',
    last_inspection_date DATE,
    next_inspection_date DATE,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE
);

-- Create Warehouses_Attributes table
CREATE TABLE Warehouses_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    capacity DECIMAL(15,3),
    capacity_unit VARCHAR(20),
    warehouse_type ENUM('dry', 'cold', 'frozen', 'mixed') DEFAULT 'dry',
    temperature_range VARCHAR(50),
    humidity_control BOOLEAN DEFAULT FALSE,
    security_level ENUM('basic', 'standard', 'high') DEFAULT 'standard',
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE
);

-- Create Distribution_Locations_Attributes table
CREATE TABLE Distribution_Locations_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    hub_type ENUM('regional', 'local', 'cross_dock') DEFAULT 'regional',
    operating_hours VARCHAR(100),
    contact_info JSON,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE
);

-- Create Retail_Locations_Attributes table
CREATE TABLE Retail_Locations_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    location_type ENUM('chain', 'franchise', 'independent') DEFAULT 'chain',
    operating_hours VARCHAR(100),
    contact_info JSON,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE
);

-- Create Retail_Stores_Attributes table
CREATE TABLE Retail_Stores_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    retail_location_id BIGINT NOT NULL,
    store_size DECIMAL(10,2),
    store_type ENUM('supermarket', 'convenience', 'specialty', 'online') DEFAULT 'supermarket',
    manager_id BIGINT,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (retail_location_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES Users(id) ON DELETE SET NULL,
    INDEX idx_retail_store_location (retail_location_id),
    INDEX idx_retail_store_manager (manager_id)
);

-- Create Vehicles_Attributes table
CREATE TABLE Vehicles_Attributes (
    resource_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    vehicle_type VARCHAR(100),
    license_plate VARCHAR(50) UNIQUE,
    capacity DECIMAL(15,3),
    capacity_unit VARCHAR(20),
    fuel_type ENUM('diesel', 'gasoline', 'electric', 'hybrid') DEFAULT 'diesel',
    driver_id BIGINT,
    last_maintenance DATE,
    next_maintenance DATE,
    insurance_expiry DATE,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES Users(id) ON DELETE SET NULL,
    INDEX idx_vehicle_license (license_plate),
    INDEX idx_vehicle_driver (driver_id)
);

-- Approval and Control tables

-- Create Approvals table
CREATE TABLE Approvals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    resource_id BIGINT NOT NULL,
    resource_type_id BIGINT NOT NULL,
    approver_id BIGINT NOT NULL,
    requested_by BIGINT NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'cancelled') NOT NULL DEFAULT 'pending',
    approval_type VARCHAR(100) NOT NULL,
    comments TEXT,
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_type_id) REFERENCES Resource_Types(id) ON DELETE RESTRICT,
    FOREIGN KEY (approver_id) REFERENCES Users(id) ON DELETE RESTRICT,
    FOREIGN KEY (requested_by) REFERENCES Users(id) ON DELETE RESTRICT,
    INDEX idx_approval_resource (resource_id, resource_type_id),
    INDEX idx_approval_approver (approver_id),
    INDEX idx_approval_status (status)
);

-- Create Control_Actions table
CREATE TABLE Control_Actions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    resource_id BIGINT NOT NULL,
    resource_type_id BIGINT NOT NULL,
    controller_id BIGINT NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    action_status ENUM('pending', 'in_progress', 'completed', 'failed') DEFAULT 'pending',
    details JSON,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_type_id) REFERENCES Resource_Types(id) ON DELETE RESTRICT,
    FOREIGN KEY (controller_id) REFERENCES Users(id) ON DELETE RESTRICT,
    INDEX idx_control_resource (resource_id, resource_type_id),
    INDEX idx_control_controller (controller_id),
    INDEX idx_control_status (action_status)
);

-- Create Audit_Logs table
CREATE TABLE Audit_Logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_id BIGINT,
    resource_type_id BIGINT,
    organization_id BIGINT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE RESTRICT,
    FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE SET NULL,
    FOREIGN KEY (resource_type_id) REFERENCES Resource_Types(id) ON DELETE SET NULL,
    FOREIGN KEY (organization_id) REFERENCES Organizations(id) ON DELETE SET NULL,
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_resource (resource_id),
    INDEX idx_audit_action (action),
    INDEX idx_audit_timestamp (created_at)
);

-- Insert base data

-- Insert Modules
INSERT INTO Modules (name, description) VALUES
('Farm Management', 'Manage farms, fields, and harvests'),
('Carbon Calculator', 'Calculate and track carbon footprint'),
('Provenance Tracking', 'Track product origins and journey'),
('Supply Chain Management', 'Manage supply chain movements and logistics'),
('Processing Management', 'Manage processing plants and operations'),
('Quality Control', 'Quality assurance and control processes'),
('Warehouse Management', 'Manage warehouses and inventory'),
('Inventory Tracking', 'Track inventory levels and movements'),
('Transport Coordination', 'Coordinate transport and logistics'),
('Fleet Management', 'Manage vehicle fleets'),
('Route Optimization', 'Optimize delivery routes'),
('Vehicle Tracking', 'Track vehicle locations and status'),
('Distribution Management', 'Manage distribution centers and hubs'),
('Retail Management', 'Manage retail locations and stores');

-- Insert Resource_Types
INSERT INTO Resource_Types (name, display_name, description, category) VALUES
('Farms', 'Farms', 'Agricultural farms and farming operations', 'farm'),
('Fields', 'Fields', 'Specific areas within farms for cultivation', 'farm'),
('Products', 'Products', 'Supply chain products and goods', 'general'),
('Supply_Chain', 'Supply Chain Movements', 'Product movements in the supply chain', 'general'),
('Processing_Plants', 'Processing Plants', 'Facilities for processing products', 'processing'),
('Warehouses', 'Warehouses', 'Storage facilities and warehouses', 'distribution'),
('Distribution_Locations', 'Distribution Centers', 'Distribution hubs and centers', 'distribution'),
('Retail_Locations', 'Retail Locations', 'Retail chain locations', 'retail'),
('Retail_Stores', 'Retail Stores', 'Individual retail stores', 'retail'),
('Vehicles', 'Vehicles', 'Transport vehicles and fleet', 'transport');

-- Insert Permissions
INSERT INTO Permissions (name, display_name, description, category) VALUES
('create', 'Create', 'Create new records of a resource type', 'resource'),
('view', 'View', 'View summary data of a resource type', 'resource'),
('read', 'Read', 'Read detailed records of a resource type', 'resource'),
('edit', 'Edit', 'Edit records of a resource type', 'resource'),
('approve', 'Approve', 'Approve actions on a resource type', 'resource'),
('manage', 'Manage', 'Manage resource assignments and configurations', 'resource'),
('control', 'Control', 'Control high-level operations on a resource type', 'resource'),
('manage_users', 'Manage Users', 'Manage users within organization', 'organization'),
('manage_organizations', 'Manage Organizations', 'Manage system-wide organizations', 'system'),
('manage_modules', 'Manage Modules', 'Manage module access and configurations', 'organization'),
('manage_permissions', 'Manage Permissions', 'Manage permission assignments', 'organization');

-- Insert Roles
INSERT INTO Roles (name, display_name, description, organization_type, is_system_role) VALUES
('super_admin', 'Super Administrator', 'System-wide administrator with full access', 'system', TRUE),
('org_admin', 'Organization Administrator', 'Administrator for organization-level management', 'all', FALSE),
('farm_owner', 'Farm Owner', 'Owner and manager of farming operations', 'farmer', FALSE),
('field_supervisor', 'Field Supervisor', 'Supervisor for field operations', 'farmer', FALSE),
('agronomist', 'Agronomist', 'Agricultural specialist and advisor', 'farmer', FALSE),
('farm_worker', 'Farm Worker', 'General farm worker', 'farmer', FALSE),
('harvest_manager', 'Harvest Manager', 'Manager of harvest operations', 'farmer', FALSE),
('plant_manager', 'Plant Manager', 'Manager of processing plant operations', 'processor', FALSE),
('quality_assurance', 'Quality Assurance', 'Quality control and assurance specialist', 'processor', FALSE),
('production_supervisor', 'Production Supervisor', 'Supervisor of production operations', 'processor', FALSE),
('process_engineer', 'Process Engineer', 'Engineering specialist for processing', 'processor', FALSE),
('warehouse_manager', 'Warehouse Manager', 'Manager of warehouse operations', 'distributor', FALSE),
('inventory_planner', 'Inventory Planner', 'Planner for inventory management', 'distributor', FALSE),
('logistics_coordinator', 'Logistics Coordinator', 'Coordinator for logistics operations', 'distributor', FALSE),
('distribution_manager', 'Distribution Manager', 'Manager of distribution operations', 'distributor', FALSE),
('fleet_manager', 'Fleet Manager', 'Manager of vehicle fleet operations', 'transporter', FALSE),
('driver', 'Driver', 'Vehicle driver', 'transporter', FALSE),
('route_coordinator', 'Route Coordinator', 'Coordinator for delivery routes', 'transporter', FALSE),
('dispatch_manager', 'Dispatch Manager', 'Manager of dispatch operations', 'transporter', FALSE);

-- Insert Organizations
INSERT INTO Organizations (name, type, status, contact_email) VALUES
('System Organization', 'system', 'active', 'admin@supplychain.com'),
('Green Valley Farms', 'farmer', 'active', 'info@greenvalley.com'),
('Fresh Process Co', 'processor', 'active', 'contact@freshprocess.com'),
('Quick Distribute', 'distributor', 'active', 'info@quickdist.com'),
('Fast Trans', 'transporter', 'active', 'dispatch@fasttrans.com'),
('City Mart Chain', 'retailer', 'active', 'corporate@citymart.com');

-- Insert Users
INSERT INTO Users (name, email, password_hash, organization_id, status) VALUES
('Emma Thompson', 'emma@admin.com', '$2b$12$hash_super_admin', 1, 'active'),
('Maria Gonzalez', 'maria@greenvalley.com', '$2b$12$hash_farm_admin', 2, 'active'),
('Raj Patel', 'raj@freshprocess.com', '$2b$12$hash_processor_admin', 3, 'active'),
('Aisha Khan', 'aisha@quickdist.com', '$2b$12$hash_distributor_admin', 4, 'active'),
('Li Wei', 'li@fasttrans.com', '$2b$12$hash_transporter_admin', 5, 'active'),
('Carlos Mendez', 'carlos@citymart.com', '$2b$12$hash_retailer_admin', 6, 'active');

-- Insert User_Roles
INSERT INTO User_Roles (user_id, role_id, assigned_by) VALUES
(1, 1, 1), -- Emma as Super Admin
(2, 2, 1), -- Maria as Org Admin
(3, 2, 1), -- Raj as Org Admin
(4, 2, 1), -- Aisha as Org Admin
(5, 2, 1), -- Li as Org Admin
(6, 2, 1); -- Carlos as Org Admin

-- Insert Organization_Modules (enable relevant modules for each organization)
INSERT INTO Organization_Modules (organization_id, module_id, is_enabled) VALUES
-- Green Valley Farms (farmer)
(2, 1, TRUE), -- Farm Management
(2, 2, TRUE), -- Carbon Calculator
(2, 3, TRUE), -- Provenance Tracking
(2, 4, TRUE), -- Supply Chain Management
-- Fresh Process Co (processor)
(3, 5, TRUE), -- Processing Management
(3, 6, TRUE), -- Quality Control
(3, 4, TRUE), -- Supply Chain Management
(3, 2, FALSE), -- Carbon Calculator (disabled)
-- Quick Distribute (distributor)
(4, 7, TRUE), -- Warehouse Management
(4, 8, TRUE), -- Inventory Tracking
(4, 4, TRUE), -- Supply Chain Management
(4, 13, FALSE), -- Distribution Management (disabled)
-- Fast Trans (transporter)
(5, 10, TRUE), -- Fleet Management
(5, 11, TRUE), -- Route Optimization
(5, 12, TRUE), -- Vehicle Tracking
(5, 4, TRUE), -- Supply Chain Management
-- City Mart Chain (retailer)
(6, 14, TRUE), -- Retail Management
(6, 4, TRUE); -- Supply Chain Management

-- This schema provides a comprehensive foundation for the supply chain RBAC system
-- with proper relationships, indexes, and sample data to support all UI functionality.
