'use client';

import { useState } from 'react';

interface Warehouse {
  id: string;
  name: string;
  address: string;
  capacity: number;
  currentStock: number;
  utilization: number;
  manager: string;
  phone: string;
  status: 'active' | 'maintenance' | 'inactive';
  zones: Zone[];
}

interface Zone {
  id: string;
  name: string;
  capacity: number;
  currentStock: number;
  shelves: Shelf[];
}

interface Shelf {
  id: string;
  code: string;
  capacity: number;
  currentStock: number;
  products: number;
}

const warehouses: Warehouse[] = [
  {
    id: '1',
    name: 'Kho Chính - Hà Nội',
    address: '123 Đường ABC, Quận Cầu Giấy, Hà Nội',
    capacity: 10000,
    currentStock: 7850,
    utilization: 78.5,
    manager: 'Nguyễn Văn A',
    phone: '024-1234-5678',
    status: 'active',
    zones: [
      {
        id: '1a',
        name: 'Khu A - Tai Nghe',
        capacity: 3000,
        currentStock: 2340,
        shelves: [
          { id: '1a1', code: 'A1-01', capacity: 100, currentStock: 78, products: 3 },
          { id: '1a2', code: 'A1-02', capacity: 100, currentStock: 65, products: 2 }
        ]
      },
      {
        id: '1b',
        name: 'Khu B - Loa',
        capacity: 4000,
        currentStock: 3200,
        shelves: [
          { id: '1b1', code: 'B1-01', capacity: 150, currentStock: 120, products: 4 },
          { id: '1b2', code: 'B1-02', capacity: 150, currentStock: 95, products: 3 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Kho Phụ - TP.HCM',
    address: '456 Đường XYZ, Quận 1, TP.HCM',
    capacity: 8000,
    currentStock: 5600,
    utilization: 70.0,
    manager: 'Trần Thị B',
    phone: '028-9876-5432',
    status: 'active',
    zones: [
      {
        id: '2a',
        name: 'Khu A - Microphone',
        capacity: 2000,
        currentStock: 1400,
        shelves: [
          { id: '2a1', code: 'A2-01', capacity: 80, currentStock: 60, products: 2 }
        ]
      }
    ]
  }
];

export default function WarehouseLocations() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/30 border-green-700';
      case 'maintenance': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700';
      case 'inactive': return 'text-red-400 bg-red-900/30 border-red-700';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 75) return 'bg-yellow-500';
    if (utilization >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-100">Vị Trí Kho Hàng</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🔲 Lưới
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📋 Danh Sách
          </button>
        </div>
      </div>

      {/* Warehouses Overview */}
      <div className={`grid gap-6 animate-fade-in-up animation-delay-200 ${
        viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
      }`}>
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.id}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-300"
          >
            {/* Warehouse Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{warehouse.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{warehouse.address}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span>👤 {warehouse.manager}</span>
                  <span>📞 {warehouse.phone}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(warehouse.status)}`}>
                {warehouse.status === 'active' ? 'Hoạt Động' : 
                 warehouse.status === 'maintenance' ? 'Bảo Trì' : 'Ngừng Hoạt Động'}
              </span>
            </div>

            {/* Utilization */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Tỷ Lệ Sử Dụng</span>
                <span className="text-gray-100 font-medium">{warehouse.utilization}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUtilizationColor(warehouse.utilization)}`}
                  style={{ width: `${warehouse.utilization}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{warehouse.currentStock.toLocaleString()} units</span>
                <span>{warehouse.capacity.toLocaleString()} units</span>
              </div>
            </div>

            {/* Zones */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-gray-200">Khu Vực ({warehouse.zones.length})</h4>
              {warehouse.zones.map((zone) => (
                <div key={zone.id} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-100">{zone.name}</span>
                    <span className="text-sm text-gray-400">
                      {zone.currentStock}/{zone.capacity} units
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mb-3">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${(zone.currentStock / zone.capacity) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Shelves */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {zone.shelves.map((shelf) => (
                      <div
                        key={shelf.id}
                        className="bg-gray-600/50 rounded p-2 text-center hover:bg-gray-600/70 transition-colors cursor-pointer"
                        title={`${shelf.code}: ${shelf.currentStock}/${shelf.capacity} units, ${shelf.products} sản phẩm`}
                      >
                        <div className="text-xs font-medium text-gray-200">{shelf.code}</div>
                        <div className="text-xs text-gray-400">
                          {shelf.currentStock}/{shelf.capacity}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full ${
                              (shelf.currentStock / shelf.capacity) >= 0.9 ? 'bg-red-500' :
                              (shelf.currentStock / shelf.capacity) >= 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(shelf.currentStock / shelf.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex space-x-2 mt-6">
              <button className="flex-1 bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/30 text-blue-400 py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                📊 Chi Tiết
              </button>
              <button className="flex-1 bg-green-600/20 border border-green-600/50 hover:bg-green-600/30 text-green-400 py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                📦 Quản Lý
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in-up animation-delay-400">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {warehouses.length}
          </div>
          <div className="text-gray-400 text-sm">Tổng Kho</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {warehouses.filter(w => w.status === 'active').length}
          </div>
          <div className="text-gray-400 text-sm">Đang Hoạt Động</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {warehouses.reduce((sum, w) => sum + w.zones.length, 0)}
          </div>
          <div className="text-gray-400 text-sm">Tổng Khu Vực</div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-400 mb-1">
            {warehouses.reduce((sum, w) => sum + w.zones.reduce((zSum, z) => zSum + z.shelves.length, 0), 0)}
          </div>
          <div className="text-gray-400 text-sm">Tổng Kệ Hàng</div>
        </div>
      </div>
    </div>
  );
}
