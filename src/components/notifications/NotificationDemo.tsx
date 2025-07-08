'use client';

import { useToast } from '@/hooks/useToast';

const NotificationDemo = () => {
  const toast = useToast();

  const handleTestNotifications = () => {
    // Test different types of notifications
    toast.success('Thành công!', 'Đơn hàng đã được tạo thành công');
    
    setTimeout(() => {
      toast.info('Thông tin', 'Đơn hàng đang được xử lý');
    }, 1000);

    setTimeout(() => {
      toast.warning('Cảnh báo', 'Sản phẩm sắp hết hàng');
    }, 2000);

    setTimeout(() => {
      toast.error('Lỗi', 'Không thể kết nối đến server');
    }, 3000);

    // Test persistent notification
    setTimeout(() => {
      toast.persistent.info(
        'Cập nhật hệ thống',
        'Hệ thống sẽ được bảo trì vào 2:00 AM',
        {
          label: 'Xem chi tiết',
          onClick: () => alert('Chi tiết bảo trì...')
        }
      );
    }, 4000);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">
        Demo Hệ Thống Thông Báo
      </h3>
      <div className="space-y-4">
        <button
          onClick={handleTestNotifications}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Test Thông Báo
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => toast.success('Thành công', 'Thao tác hoàn thành')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Success Toast
          </button>
          
          <button
            onClick={() => toast.error('Lỗi', 'Có lỗi xảy ra')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Error Toast
          </button>
          
          <button
            onClick={() => toast.warning('Cảnh báo', 'Vui lòng kiểm tra lại')}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
          >
            Warning Toast
          </button>
          
          <button
            onClick={() => toast.info('Thông tin', 'Thông tin hữu ích')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Info Toast
          </button>
        </div>

        <button
          onClick={() => toast.persistent.success(
            'Đơn hàng mới',
            'Bạn có đơn hàng mới từ khách hàng ABC',
            {
              label: 'Xem đơn hàng',
              onClick: () => alert('Chuyển đến trang đơn hàng...')
            }
          )}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Persistent Notification
        </button>
      </div>
    </div>
  );
};

export default NotificationDemo;
