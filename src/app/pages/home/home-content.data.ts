import { parseEmphasis } from '../../shared/components/text-segments/text-segments.component';
import type { HomeContent, PartnerLogo } from './home-content.model';

// Locale-independent partner logos, defined once and shared by both copies below.
const PARTNER_LOGOS: readonly PartnerLogo[] = [
  { name: 'Vietcombank', imageUrl: 'assets/images/partners/vietcombank.png' },
  { name: 'Preferred by Nature', imageUrl: 'assets/images/partners/preferred-by-nature.png' },
  { name: 'SGS', imageUrl: 'assets/images/partners/sgs.png' },
  { name: 'Vinacontrol CE', imageUrl: 'assets/images/partners/vinacontrol.jpg' },
  { name: 'Korea Forest Service', imageUrl: 'assets/images/partners/korea-forest-service.png' },
  { name: 'VIFORES', imageUrl: 'assets/images/partners/vifores.png' },
];

// THE homepage editorial copy - code-owned, one full copy per locale. Homepage text
// changes ~yearly and always with a dev in the loop. Sanity only supplies posts and
// optional siteSettings media overrides such as the hero background.
// Plain strings (NOT $localize): this is editorial copy, not UI chrome. Emphasis is
// authored inline with <b>…</b> / <accent>…</accent> via parseEmphasis.

const EN: HomeContent = {
  hero: {
    heading: [{ tone: 'navy', text: 'HARVESTING FOR GROWING' }],
    subheading: 'Sustainable sourcing. Reliable global supply chain.',
    imageUrl: 'assets/images/hero-banner.webp',
    stats: [
      {
        icon: 'factory',
        lines: [
          { text: '1M+', style: 'value' },
          { text: 'BDMT Annual Capacity', style: 'caption' },
        ],
      },
      {
        icon: 'experience',
        lines: [
          { text: '20+', style: 'value' },
          { text: 'Years Experience', style: 'caption' },
        ],
      },
      {
        icon: 'people',
        lines: [
          { text: '740+', style: 'value' },
          { text: 'Employees & Collaborators', style: 'caption' },
        ],
      },
      {
        icon: 'globe',
        lines: [
          { text: 'Export to', style: 'lead' },
          { text: 'Japan & China', style: 'highlight' },
        ],
      },
    ],
  },
  about: {
    eyebrow: 'About OFC Company',
    heading: 'Sustainable products. Reliable supply chain',
    body: parseEmphasis(
      '<b>Dai Duong Forest Products JSC</b> was established in 2017. Our leaders and employees strive to make OFC company a professional and reputable provider of wood industry products and services, constantly innovating technology, creating new value, and implementing reliable production processes to contribute to sustainable social development.',
    ),
    videoUrl: 'https://www.youtube.com/embed/YTUConEONEs',
    majorBusiness: {
      label: 'Major business',
      value: parseEmphasis(
        'Manufacturing of <accent>wood chips</accent> and <accent>wood pellets</accent> for export, manufacturing of <accent>edge-glued panels</accent>',
      ),
    },
    exportVolume: {
      label: 'Annual export volume',
      value: parseEmphasis(''),
    },
    exportVolumes: [
      { year: '2018', volume: '350.000 BDMT' },
      { year: '2019', volume: '450.000 BDMT' },
      { year: '2020', volume: '500.000 BDMT' },
      { year: '2021', volume: '600.000 BDMT' },
      { year: '2022', volume: '800.000 BDMT' },
      { year: '2023', volume: '900.000 BDMT' },
      { year: '2024', volume: '1.050.000 BDMT' },
      { year: '2025', volume: '1.100.000 BDMT' },
      { year: '2026', volume: '1.300.000 BDMT (Plan)' },
    ],
    subsidiaries: {
      label: 'Subsidiaries network',
      value: parseEmphasis(
        '7 subsidiaries at <accent>Nghi Son Port</accent> & 5 subsidiaries at <accent>VISSAI Port</accent>',
      ),
    },
  },
  products: {
    eyebrow: 'Products & Services',
    heading: 'High-quality wood products for global industries',
    body: parseEmphasis(
      'OFC Company supplies <b>wood chips for pulp production</b> and <b>wood pellets as eco-friendly biomass fuel</b>. Supporting services include <b>raw material supply</b>, <b>forest development</b>, and <b>logistics</b>, enabling stable supply chains and efficient delivery for industrial-scale operations.',
    ),
    items: [
      {
        title: 'Wood chips export',
        description: 'Wood chips for export, supplied for pulp and paper production.',
        imageUrl: 'assets/images/wood-chips-export.webp',
        route: '/products/wood-chips-export',
      },
      {
        title: 'Wood pellets export',
        description: 'Wood pellets for export, used as biomass fuel for energy.',
        imageUrl: 'assets/images/wood-pellets-export.jpg',
        route: '/products/wood-pellets-export',
      },
      {
        title: 'Timber processing',
        description: 'Timber processing from raw wood into finished wood products.',
        imageUrl: 'assets/images/timber-processing.jpeg',
        route: '/products/timber-processing',
      },
      {
        title: 'Afforestation',
        description: 'Afforestation and forest planting for raw material development.',
        imageUrl: 'assets/images/afforestation.jpg',
        route: '/products/afforestation',
      },
      {
        title: 'Transportation & warehouses',
        description: 'Transportation and warehouse services for storage and delivery.',
        imageUrl: 'assets/images/transportation-warehouses.jpg',
        route: '/products/transportation-and-warehouses',
      },
    ],
  },
  partners: {
    eyebrow: 'Partners & Certificates',
    heading: 'Trusted by national and global organizations',
    viewAllLabel: 'View all partners',
    logos: PARTNER_LOGOS,
    certificatesTitle: 'Our certificates',
    certificatesBody:
      'We are committed to international and national standards for quality control, environment and responsible forestry.',
    certificates: [
      {
        imageUrl: 'assets/images/certificates/fsc.png',
        name: 'FSC FM',
        subtitle: 'Forest Management',
        codes: ['FSC-STD-50-001', 'FSC-STD-30-005'],
      },
      {
        imageUrl: 'assets/images/certificates/fsc.png',
        name: 'FSC COC',
        subtitle: 'Chains of Custody',
        codes: ['FSC-STD-40-004 V3-1', 'FSC-STD-50-001'],
      },
      {
        imageUrl: 'assets/images/certificates/fsc.png',
        name: 'FSC CW',
        subtitle: 'Controlled Wood',
        codes: ['FSC-STD-40-005 V3-1', 'FSC-STD-50-001'],
      },
      {
        imageUrl: 'assets/images/certificates/pefc.png',
        name: 'PEFC COC',
        subtitle: 'Chains of Custody',
        codes: ['PEFC ST 2002:2020', 'PEFC ST 2001:2020'],
      },
      {
        imageUrl: 'assets/images/certificates/sbp.png',
        name: 'SBP',
        subtitle: 'The promise of good biomass',
        codes: [],
      },
    ],
    figures: [
      {
        value: '1M BDMT',
        label: 'Production capacity',
        sublabel: 'Annual production capacity BDMT',
      },
      { value: '740+', label: 'Collaborators', sublabel: 'Number of employees' },
      { value: '16%', label: 'Growth', sublabel: 'Growth rate year over year' },
    ],
  },
  news: {
    eyebrow: 'News and updates',
    tagline: 'Stay informed with the latest from OFC Company',
    featuredLabel: 'Featured news',
    viewAllLabel: 'View all news',
  },
};

const VI: HomeContent = {
  hero: {
    heading: [{ tone: 'navy', text: 'KHAI THÁC ĐỂ PHÁT TRIỂN' }],
    subheading: 'Nguồn cung ứng bền vững. Chuỗi cung ứng toàn cầu đáng tin cậy.',
    imageUrl: 'assets/images/hero-banner.webp',
    stats: [
      {
        icon: 'factory',
        lines: [
          { text: '1Tr+', style: 'value' },
          { text: 'BDMT công suất hàng năm', style: 'caption' },
        ],
      },
      {
        icon: 'experience',
        lines: [
          { text: '20+', style: 'value' },
          { text: 'Năm kinh nghiệm', style: 'caption' },
        ],
      },
      {
        icon: 'people',
        lines: [
          { text: '740+', style: 'value' },
          { text: 'Nhân viên & cộng tác viên', style: 'caption' },
        ],
      },
      {
        icon: 'globe',
        lines: [
          { text: 'Xuất khẩu đến', style: 'lead' },
          { text: 'Nhật Bản & Trung Quốc', style: 'highlight' },
        ],
      },
    ],
  },
  about: {
    eyebrow: 'Về công ty OFC',
    heading: 'Sản phẩm bền vững. Chuỗi cung ứng đáng tin cậy',
    body: parseEmphasis(
      '<b>Công ty Cổ phần Chế biến Lâm sản Đại Dương</b> được thành lập năm 2017. Ban lãnh đạo và tập thể nhân viên không ngừng nỗ lực đưa OFC trở thành nhà cung cấp sản phẩm, dịch vụ ngành gỗ chuyên nghiệp và uy tín - liên tục đổi mới công nghệ, tạo ra giá trị mới và vận hành quy trình sản xuất tin cậy, góp phần phát triển xã hội bền vững.',
    ),
    videoUrl: 'https://www.youtube.com/embed/YTUConEONEs',
    majorBusiness: {
      label: 'Lĩnh vực kinh doanh chính',
      value: parseEmphasis(
        'Sản xuất <accent>dăm gỗ</accent> và <accent>viên nén gỗ</accent> phục vụ xuất khẩu, sản xuất <accent>ván ghép thanh</accent>',
      ),
    },
    exportVolume: {
      label: 'Sản lượng xuất khẩu hàng năm',
      value: parseEmphasis(''),
    },
    exportVolumes: [
      { year: '2018', volume: '350.000 BDMT' },
      { year: '2019', volume: '450.000 BDMT' },
      { year: '2020', volume: '500.000 BDMT' },
      { year: '2021', volume: '600.000 BDMT' },
      { year: '2022', volume: '800.000 BDMT' },
      { year: '2023', volume: '900.000 BDMT' },
      { year: '2024', volume: '1.050.000 BDMT' },
      { year: '2025', volume: '1.100.000 BDMT' },
      { year: '2026', volume: '1.300.000 BDMT (Kế hoạch)' },
    ],
    subsidiaries: {
      label: 'Mạng lưới công ty thành viên',
      value: parseEmphasis(
        '7 công ty thành viên tại <accent>cảng Nghi Sơn</accent> & 5 công ty thành viên tại <accent>cảng VISSAI</accent>',
      ),
    },
  },
  products: {
    eyebrow: 'Sản phẩm & dịch vụ',
    heading: 'Sản phẩm gỗ chất lượng cao cho công nghiệp toàn cầu',
    body: parseEmphasis(
      'OFC Company cung cấp <b>dăm gỗ cho sản xuất bột giấy</b> và <b>viên nén gỗ - nhiên liệu sinh khối thân thiện môi trường</b>. Các dịch vụ hỗ trợ gồm <b>cung ứng nguyên liệu</b>, <b>phát triển rừng</b> và <b>logistics</b>, đảm bảo chuỗi cung ứng ổn định và giao hàng hiệu quả ở quy mô công nghiệp.',
    ),
    items: [
      {
        title: 'Xuất khẩu dăm gỗ',
        description: 'Dăm gỗ xuất khẩu, cung cấp cho sản xuất bột giấy và giấy.',
        imageUrl: 'assets/images/wood-chips-export.webp',
        route: '/products/wood-chips-export',
      },
      {
        title: 'Xuất khẩu viên nén gỗ',
        description: 'Viên nén gỗ xuất khẩu, dùng làm nhiên liệu sinh khối cho năng lượng.',
        imageUrl: 'assets/images/wood-pellets-export.jpg',
        route: '/products/wood-pellets-export',
      },
      {
        title: 'Chế biến gỗ',
        description: 'Chế biến gỗ từ gỗ nguyên liệu thành các sản phẩm gỗ hoàn thiện.',
        imageUrl: 'assets/images/timber-processing.jpeg',
        route: '/products/timber-processing',
      },
      {
        title: 'Trồng rừng',
        description: 'Trồng rừng và phát triển rừng nguyên liệu.',
        imageUrl: 'assets/images/afforestation.jpg',
        route: '/products/afforestation',
      },
      {
        title: 'Vận tải & kho bãi',
        description: 'Dịch vụ vận tải và kho bãi phục vụ lưu trữ, giao nhận.',
        imageUrl: 'assets/images/transportation-warehouses.jpg',
        route: '/products/transportation-and-warehouses',
      },
    ],
  },
  partners: {
    eyebrow: 'Đối tác & chứng chỉ',
    heading: 'Được tin cậy bởi các tổ chức trong nước và quốc tế',
    viewAllLabel: 'Xem tất cả đối tác',
    logos: PARTNER_LOGOS,
    certificatesTitle: 'Chứng chỉ của chúng tôi',
    certificatesBody:
      'Chúng tôi cam kết tuân thủ các tiêu chuẩn quốc tế và trong nước về kiểm soát chất lượng, môi trường và lâm nghiệp có trách nhiệm.',
    certificates: [
      {
        imageUrl: 'assets/images/certificates/fsc.png',
        name: 'FSC FM',
        subtitle: 'Quản lý rừng',
        codes: ['FSC-STD-50-001', 'FSC-STD-30-005'],
      },
      {
        imageUrl: 'assets/images/certificates/fsc.png',
        name: 'FSC COC',
        subtitle: 'Chuỗi hành trình sản phẩm',
        codes: ['FSC-STD-40-004 V3-1', 'FSC-STD-50-001'],
      },
      {
        imageUrl: 'assets/images/certificates/fsc.png',
        name: 'FSC CW',
        subtitle: 'Gỗ có kiểm soát',
        codes: ['FSC-STD-40-005 V3-1', 'FSC-STD-50-001'],
      },
      {
        imageUrl: 'assets/images/certificates/pefc.png',
        name: 'PEFC COC',
        subtitle: 'Chuỗi hành trình sản phẩm',
        codes: ['PEFC ST 2002:2020', 'PEFC ST 2001:2020'],
      },
      {
        imageUrl: 'assets/images/certificates/sbp.png',
        name: 'SBP',
        subtitle: 'The promise of good biomass',
        codes: [],
      },
    ],
    figures: [
      {
        value: '1Tr BDMT',
        label: 'Công suất sản xuất',
        sublabel: 'Công suất sản xuất hàng năm (BDMT)',
      },
      { value: '740+', label: 'Cộng tác viên', sublabel: 'Số lượng nhân sự' },
      { value: '16%', label: 'Tăng trưởng', sublabel: 'Tốc độ tăng trưởng hàng năm' },
    ],
  },
  news: {
    eyebrow: 'Tin tức & cập nhật',
    tagline: 'Cập nhật những thông tin mới nhất từ OFC Company',
    featuredLabel: 'Tin nổi bật',
    viewAllLabel: 'Xem tất cả tin',
  },
};

export function homeContent(locale: string): HomeContent {
  return locale.startsWith('vi') ? VI : EN;
}
