import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './OAuth2Callback.css';

function OAuth2Callback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // React 18 Strict Mode'da useEffect iki kere çalışabilir, bunu engellemek için ref kullanıyoruz
    const processed = useRef(false);

    useEffect(() => {
        if (processed.current) return;
        processed.current = true;

        // URL'den parametreleri çek
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        const error = searchParams.get('error');

        if (token) {
            // --- BAŞARILI GİRİŞ ---
            
            // 1. JWT Token'ı sakla (API isteklerinde kullanacağız)
            localStorage.setItem('token', token);

            // 2. Kullanıcı bilgisini sakla (Arayüzde göstermek için)
            // Backend şu an sadece email dönüyor, istersen token içinden decode edilebilir
            localStorage.setItem('user', JSON.stringify({ email: email }));
            
            // 3. Giriş yapıldı bayrağını dik
            localStorage.setItem('isLoggedIn', 'true');

            // 4. Tasarım sayfasına yönlendir
            console.log("Token alındı, yönlendiriliyor...");
            navigate('/design');
        } else {
            // --- HATA DURUMU ---
            console.error("Token bulunamadı veya hata oluştu.");
            if (error) {
                navigate(`/login?error=${encodeURIComponent(error)}`);
            } else {
                navigate('/login?error=unknown');
            }
        }
    }, [navigate, searchParams]);

    return (
        <div className="oauth2-callback">
            <div className="loading-spinner"></div>
            <p>Giriş onaylandı, yönlendiriliyorsunuz...</p>
        </div>
    );
}

export default OAuth2Callback;