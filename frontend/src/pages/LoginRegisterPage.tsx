import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginRegisterPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const direction = mode === 'login' ? -1 : 1;

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <AnimatePresence mode='wait'>
          {mode === 'login' ? (
            <motion.div
              key="login"
              initial={{ x: 200 * direction, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200 * direction, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoginForm onSwitch={() => setMode('register')} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ x: 200 * direction, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200 * direction, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RegisterForm onSwitch={() => setMode('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
