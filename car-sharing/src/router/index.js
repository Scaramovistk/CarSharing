import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('../views/clients/ClientList.vue')
  },
  {
    path: '/clients/new',
    name: 'client-create',
    component: () => import('../views/clients/ClientForm.vue')
  },
  {
    path: '/clients/:id',
    name: 'client-details',
    component: () => import('../views/clients/ClientDetails.vue')
  },
  {
    path: '/clients/:id/edit',
    name: 'client-edit',
    component: () => import('../views/clients/ClientForm.vue')
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: () => import('../views/vehicles/VehicleList.vue')
  },
  {
    path: '/vehicles/new',
    name: 'vehicle-create',
    component: () => import('../views/vehicles/VehicleForm.vue')
  },
  {
    path: '/vehicles/:id',
    name: 'vehicle-details',
    component: () => import('../views/vehicles/VehicleDetails.vue')
  },
  {
    path: '/vehicles/:id/edit',
    name: 'vehicle-edit',
    component: () => import('../views/vehicles/VehicleForm.vue')
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import('../views/reservations/ReservationList.vue')
  },
  {
    path: '/reservations/new',
    name: 'reservation-create',
    component: () => import('../views/reservations/ReservationForm.vue')
  },
  {
    path: '/reservations/:id',
    name: 'reservation-details',
    component: () => import('../views/reservations/ReservationDetails.vue')
  },
  {
    path: '/reservations/:id/edit',
    name: 'reservation-edit',
    component: () => import('../views/reservations/ReservationForm.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;