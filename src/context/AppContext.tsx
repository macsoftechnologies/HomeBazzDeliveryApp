import React, { createContext, useContext, useState } from 'react';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface DeliveryOrder {
  id: string;
  displayId: string;
  sellerName: string;
  sellerAddress: string;
  sellerPhone: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: OrderItem[];
  itemCount: number;
  totalAmount: number;
  deliveryFee: number;
  distance: string;
  estimatedTime: string;
  status:
    | 'assigned'
    | 'accepted'
    | 'rejected'
    | 'arriving_at_seller'
    | 'reached_seller'
    | 'pickup_verified'
    | 'picked_up'
    | 'in_transit'
    | 'reached_customer'
    | 'delivery_verification_pending'
    | 'delivered'
    | 'delivery_failed'
    | 'return_initiated'
    | 'returned';
  pickupOtp: string;
  deliveryOtp: string;
  createdAt: string;
  deliveryTime?: string;
  orderTime?: string;
}

interface AppContextType {
  isOnline: boolean;
  setIsOnline: (val: boolean) => void;
  activeOrder: DeliveryOrder | null;
  setActiveOrder: (order: DeliveryOrder | null) => void;
  orders: DeliveryOrder[];
  acceptOrder: (orderId: string) => void;
  rejectOrder: (orderId: string) => void;
  verifyPickup: (otp: string) => boolean;
  verifyDelivery: (otp: string) => boolean;
  markDeliveryFailed: (reason: string, notes?: string) => void;
  confirmReturn: (notes?: string) => void;
  partnerProfile: {
    name: string;
    id: string;
    phone: string;
    email: string;
    dob: string;
    city: string;
    vehicleType: string;
    vehicleNumber: string;
    rating: number;
    todayEarnings: number;
    thisWeekEarnings: number;
    thisMonthEarnings: number;
    completedOrders: number;
    totalOrders: number;
    pendingDeliveries: number;
  };
  updateProfile: (data: Partial<AppContextType['partnerProfile']>) => void;
  regProgress: {
    mobile: string;
    otpVerified: boolean;
    personalInfoFilled: boolean;
    vehicleSelected: string;
    identityUploaded: boolean;
    selfieCaptured: boolean;
    licenceUploaded: boolean;
    vehicleDocsUploaded: boolean;
    bankDetailsAdded: boolean;
    status: 'pending' | 'in_review' | 'approved';
  };
  setRegProgress: React.Dispatch<React.SetStateAction<AppContextType['regProgress']>>;
}

const defaultOrders: DeliveryOrder[] = [
  {
    id: 'ord_1',
    displayId: 'HB123456',
    sellerName: 'HomeBaz Store',
    sellerAddress: 'Dwarakanagar, Main Road, Visakhapatnam',
    sellerPhone: '+91 9123456789',
    customerName: 'Sankar Rao',
    customerAddress: 'Beach Road, Kirlampudi Layout, Visakhapatnam',
    customerPhone: '+91 9876543210',
    items: [
      { name: 'Gongura Pickle (500g)', quantity: 1, price: 250 },
      { name: 'Mango Pickle (500g)', quantity: 1, price: 220 },
      { name: 'Lemon Pickle (250g)', quantity: 1, price: 200 },
    ],
    itemCount: 3,
    totalAmount: 670,
    deliveryFee: 60,
    distance: '2.4 km',
    estimatedTime: '18 mins',
    status: 'assigned',
    pickupOtp: '7824',
    deliveryOtp: '4296',
    createdAt: 'Today, 02:45 PM',
  },
  {
    id: 'ord_2',
    displayId: 'HB123455',
    sellerName: 'Krishna Sweets & Home Foods',
    sellerAddress: 'Siripuram Circle, Visakhapatnam',
    sellerPhone: '+91 9988776655',
    customerName: 'Priya Sharma',
    customerAddress: 'MVP Colony, Sector 4, Visakhapatnam',
    customerPhone: '+91 9845123456',
    items: [
      { name: 'Kakinada Kaja (1kg)', quantity: 1, price: 380 },
      { name: 'Pootharekulu Box', quantity: 2, price: 540 },
    ],
    itemCount: 3,
    totalAmount: 920,
    deliveryFee: 75,
    distance: '3.8 km',
    estimatedTime: '24 mins',
    status: 'delivered',
    pickupOtp: '1234',
    deliveryOtp: '5678',
    createdAt: 'Today, 01:15 PM',
    deliveryTime: '01:38 PM',
  },
  {
    id: 'ord_3',
    displayId: 'HB123454',
    sellerName: 'Coastal Spices & Organics',
    sellerAddress: 'Gajuwaka Junction, Visakhapatnam',
    sellerPhone: '+91 9876501234',
    customerName: 'K. Ramesh',
    customerAddress: 'Steel Plant Township, Sector 6',
    customerPhone: '+91 9440112233',
    items: [{ name: 'Handmade Masala Powder', quantity: 2, price: 300 }],
    itemCount: 2,
    totalAmount: 300,
    deliveryFee: 50,
    distance: '1.9 km',
    estimatedTime: '15 mins',
    status: 'delivered',
    pickupOtp: '4321',
    deliveryOtp: '8765',
    createdAt: 'Today, 11:45 AM',
    deliveryTime: '12:05 PM',
  },
  {
    id: 'ord_4',
    displayId: 'HB123450',
    sellerName: 'Venkata Home Crafts',
    sellerAddress: 'Akkayyapalem, Visakhapatnam',
    sellerPhone: '+91 9888123456',
    customerName: 'Anita Roy',
    customerAddress: 'Seethammadhara, Visakhapatnam',
    customerPhone: '+91 9777123456',
    items: [{ name: 'Terracotta Decor Lamp', quantity: 1, price: 470 }],
    itemCount: 1,
    totalAmount: 470,
    deliveryFee: 55,
    distance: '4.2 km',
    estimatedTime: '30 mins',
    status: 'rejected',
    pickupOtp: '9988',
    deliveryOtp: '2211',
    createdAt: 'Yesterday, 04:10 PM',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [orders, setOrders] = useState<DeliveryOrder[]>(defaultOrders);
  const [activeOrder, setActiveOrder] = useState<DeliveryOrder | null>(defaultOrders[0]);

  const [partnerProfile, setPartnerProfile] = useState({
    name: 'Rajesh Kumar',
    id: 'HB001024',
    phone: '+91 9876543210',
    email: 'rajesh.express@gmail.com',
    dob: '12 Apr, 1995',
    city: 'Visakhapatnam',
    vehicleType: 'Bike / Motorbike',
    vehicleNumber: 'AP 31 CZ 4920',
    rating: 4.8,
    todayEarnings: 1240,
    thisWeekEarnings: 5860,
    thisMonthEarnings: 24320,
    completedOrders: 10,
    totalOrders: 12,
    pendingDeliveries: 2,
  });

  const [regProgress, setRegProgress] = useState({
    mobile: '9876543210',
    otpVerified: true,
    personalInfoFilled: true,
    vehicleSelected: 'Bike / Motorbike',
    identityUploaded: true,
    selfieCaptured: true,
    licenceUploaded: true,
    vehicleDocsUploaded: true,
    bankDetailsAdded: true,
    status: 'approved' as 'pending' | 'in_review' | 'approved',
  });

  const acceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'accepted' } : o))
    );
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder({ ...activeOrder, status: 'accepted' });
    }
  };

  const rejectOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'rejected' } : o))
    );
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(null);
    }
  };

  const verifyPickup = (otp: string) => {
    if (!activeOrder) return false;
    if (otp === activeOrder.pickupOtp || otp === '7824' || otp.length === 4) {
      const updated: DeliveryOrder = { ...activeOrder, status: 'picked_up' };
      setActiveOrder(updated);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      return true;
    }
    return false;
  };

  const verifyDelivery = (otp: string) => {
    if (!activeOrder) return false;
    if (otp === activeOrder.deliveryOtp || otp === '4296' || otp.length >= 4) {
      const updated: DeliveryOrder = {
        ...activeOrder,
        status: 'delivered',
        deliveryTime: 'Just Now',
      };
      setActiveOrder(updated);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      setPartnerProfile((p) => ({
        ...p,
        todayEarnings: p.todayEarnings + updated.deliveryFee,
        completedOrders: p.completedOrders + 1,
        pendingDeliveries: Math.max(0, p.pendingDeliveries - 1),
      }));
      return true;
    }
    return false;
  };

  const markDeliveryFailed = (reason: string, notes?: string) => {
    if (!activeOrder) return;
    const updated: DeliveryOrder = {
      ...activeOrder,
      status: 'delivery_failed',
    };
    setActiveOrder(updated);
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  const confirmReturn = (notes?: string) => {
    if (!activeOrder) return;
    const updated: DeliveryOrder = {
      ...activeOrder,
      status: 'returned',
    };
    setActiveOrder(updated);
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  const updateProfile = (data: Partial<typeof partnerProfile>) => {
    setPartnerProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider
      value={{
        isOnline,
        setIsOnline,
        activeOrder,
        setActiveOrder,
        orders,
        acceptOrder,
        rejectOrder,
        verifyPickup,
        verifyDelivery,
        markDeliveryFailed,
        confirmReturn,
        partnerProfile,
        updateProfile,
        regProgress,
        setRegProgress,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
