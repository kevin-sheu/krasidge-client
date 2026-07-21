import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/layouts/main-layout';
import { AdminLayout } from '@/layouts/admin-layout';
import { ProtectedRoute } from '@/components/protected-route';
import { AdminRoute } from '@/components/admin-route';
import { LoadingState } from '@/components/loading-state';

const HomePage = lazy(() => import('@/pages/home'));
const ProductsPage = lazy(() => import('@/pages/products'));
const ProductDetailPage = lazy(() => import('@/pages/product-detail'));
const AiLandscapeDesignPage = lazy(() => import('@/pages/ai-landscape-design'));
const CustomSoftwarePage = lazy(() => import('@/pages/custom-software'));
const AboutPage = lazy(() => import('@/pages/about'));
const ContactPage = lazy(() => import('@/pages/contact'));
const LoginPage = lazy(() => import('@/pages/login'));
const RegisterPage = lazy(() => import('@/pages/register'));
const ForgotPasswordPage = lazy(() => import('@/pages/forgot-password'));
const ResetPasswordPage = lazy(() => import('@/pages/reset-password'));
const AccountPage = lazy(() => import('@/pages/account'));
const PrivacyPage = lazy(() => import('@/pages/privacy'));
const TermsPage = lazy(() => import('@/pages/terms'));
const AccessibilityPage = lazy(() => import('@/pages/accessibility'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));
const UnauthorizedPage = lazy(() => import('@/pages/unauthorized'));

const AdminDashboardPage = lazy(() => import('@/pages/admin/admin-dashboard'));
const AdminProductsPage = lazy(() => import('@/pages/admin/admin-products'));
const AdminProductFormPage = lazy(() => import('@/pages/admin/admin-product-form'));
const AdminInquiriesPage = lazy(() => import('@/pages/admin/admin-inquiries'));
const AdminUsersPage = lazy(() => import('@/pages/admin/admin-users'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function PageFallback() {
  return <LoadingState fullPage />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="ai-landscape-design" element={<AiLandscapeDesignPage />} />
          <Route path="custom-software" element={<CustomSoftwarePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          <Route path="unauthorized" element={<UnauthorizedPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="account" element={<AccountPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/:id/edit" element={<AdminProductFormPage />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes />
              <Toaster />
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
