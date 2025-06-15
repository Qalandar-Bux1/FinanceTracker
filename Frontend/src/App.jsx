import React from 'react';
import AppRoutes from './Routes/AppRoutes';
import { AuthProvider } from './context/authcontext'; // ✅ Import your AuthProvider

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
