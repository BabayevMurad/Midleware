import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const login = () => {
    document.cookie = "access=true; path=/";
    router.push('/upload');
  };

  return (
    <div>
      <h1>Login səhifəsi</h1>
      <button onClick={login}>Giriş et</button>
    </div>
  );
}
