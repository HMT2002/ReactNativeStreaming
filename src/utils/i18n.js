// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Polyfill } from 'intl-pluralrules'; // Import the polyfill

if (!global.Intl.PluralRules) {
  global.Intl.PluralRules = Polyfill; // Use the polyfill if Intl.PluralRules is not available
}

const resources = {

  en: {
    translation: {
      "hello": "Hello",
      "welcome": "Welcome",
      "login": "Login",
      "popular": "Popular",
      "tv show": "Tv show",
      "continue watching": "Continue watching",
      "home": "Home",
      "hot movie": "Hot movie",
      "search": "Search",
      "profile": "Profile",
      "register": "Register",
      "logout": "Logout",
      "settings": "Settings",
      "update primium": "Update primium",
      "movie": "Movie", "espisode": "Espisode",
      "play speed": "Play speed",
      "age restriction": "Age ",
      "number of movies": " espisole",
      "play video": "Play video",
      "read more": "Read more",
      "read less": "Read less",
      "add to playlist": "Add to playlist",
      "rate movie": "Rate movie",
      "share": "Share",
      "download": "Download",
      "comment": "Comment",
      "rate": "vote",
      "day release": "day release"



      // Add more English translations here
    }
  },
  vi: {
    translation: {
      "hello": "Xin chào",
      "welcome": "Chào mừng",
      "login": "Đăng nhập",
      "popular": "Phổ biển",
      "tv show": "Chương trình thực tế",
      "continue watching": "Tiếp tục xem",
      "home": "Trang chủ",
      "hot movie": "Phim hay",
      "search": "Tìm kiếm",
      "movie": "Phim lẻ",
      "profile": "Hồ sơ",
      "register": "Đăng kí",
      "logout": "Đăng xuất",
      "settings": "Cài đặt",
      "update primium": "Mua bản dùng trước",
      "espisode": "Tập phim ",
      "play speed": "Tốc độ phát",
      "age restriction": " độ tuổi",
      "number of movies": "Số lượng tập phim",
      "play video": "Xem phim",
      "read more": "Đọc thêm",
      "read less": "Ẩn bớt",
      "add to playlist": "Thêm vào danh sách phát",
      "rate movie": "Đánh giá",
      "share": "Chia sẻ",
      "download": "Tải về",
      "comment": "Bình luận",
      "rate": "+",
      "day release": "ngay phat hanh"
      // Add corresponding Vietnamese translations here
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
