import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, usePathname } from 'expo-router';
import { Home, Package, Wallet, User } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomNavBarProps {
  activeTab?: 'home' | 'orders' | 'earnings' | 'profile';
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab }) => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const currentTab =
    activeTab ||
    (pathname.includes('home')
      ? 'home'
      : pathname.includes('orders')
      ? 'orders'
      : pathname.includes('earnings')
      ? 'earnings'
      : pathname.includes('profile')
      ? 'profile'
      : 'home');

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      route: '/(tabs)/home',
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Package,
      route: '/(tabs)/orders',
    },
    {
      id: 'earnings',
      label: 'Earnings',
      icon: Wallet,
      route: '/(tabs)/earnings',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      route: '/(tabs)/profile',
    },
  ];

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.bar}>
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const IconComp = item.icon;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.tabBtn}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.8}>
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <IconComp
                  size={20}
                  color={isActive ? '#FFFFFF' : Colors.secondaryText}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    shadowColor: '#1B1744',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    flex: 1,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  iconWrapActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.secondaryText,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
});
