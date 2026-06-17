import { type ProductContent } from '../../../shared/components/product-page/product-content.model';

// Code-owned bilingual content for the Transportation & Warehouses page (Figma node 2142:2022).
// NOTE: Figma left the spec table as placeholder dots, so the specs below are neutral,
// provisional logistics facts (replace with real figures when available). Why-choose, the
// video blurb and `videoUrl` are shared OFC content (placeholder video — swap for the real
// link). FAQ is neutral provisional copy. Banner/overview images stay null → placeholders.

const EN: ProductContent = {
  name: 'Transportation & Warehouses',
  title: 'Transportation & Warehouses',
  intro:
    'We ensure efficient logistics and secure storage to deliver your products safely and on time. Our modern transportation network and well-managed warehouses support smooth operations from origin to destination.',
  bannerImage: 'assets/images/products/transportation-warehouses-banner.jpeg',
  bannerAlt: 'Transportation and warehouses',
  badges: [
    { icon: 'truck', label: 'Reliable Transportation' },
    { icon: 'warehouse', label: 'Secure Warehousing' },
    { icon: 'clock', label: 'On-Time Delivery' },
  ],
  overview: [
    'Our transportation and warehousing services support seamless wood chips and pallets exports. With strategic storage facilities and reliable logistics management, we ensure efficient handling, secure storage, and on-time delivery.',
    'Backed by a dedicated logistics network, we streamline cargo movement and export operations to meet the demands of global markets.',
  ],
  overviewImage: 'assets/images/products/transportation-warehouses-overview.png',
  overviewImageAlt: 'Container trucks at an OFC warehouse',
  specs: [
    { label: 'Service', value: 'End-to-end export logistics' },
    { label: 'Cargo', value: 'Wood chips, pellets, timber' },
    { label: 'Storage', value: 'Covered & open-yard warehouses' },
    { label: 'Loading', value: 'Bulk vessel & container' },
    { label: 'Ports', value: 'Cai Lan, Hai Phong' },
    { label: 'Coverage', value: 'Domestic & international' },
    { label: 'Documentation', value: 'Export docs & customs support' },
    { label: 'Delivery', value: 'On-time, origin to destination' },
  ],
  applicationsIntro: 'Our logistics and warehousing services support every stage of export.',
  applications: [
    {
      icon: 'ship',
      title: 'Export Logistics',
      description: 'Efficient transportation of wood chips and pallets to ports and customers',
    },
    {
      icon: 'warehouse',
      title: 'Warehousing',
      description: 'Secure storage with effective inventory management and cargo handling',
    },
    {
      icon: 'clock',
      title: 'Shipment Coordination',
      description: 'Timely loading, documentation support, and export scheduling',
    },
    {
      icon: 'route',
      title: 'Supply Chain Support',
      description: 'Logistics solutions ensuring smooth export operations',
    },
    {
      icon: 'packages',
      title: 'Cargo Consolidation',
      description: 'Flexible cargo consolidation for efficient shipments',
    },
  ],
  whyChoose: [
    { icon: 'ship', title: 'Export Success', description: 'Exported to China, Japan, and Korea' },
    {
      icon: 'chartBar',
      title: 'Capacity & Quality',
      description: 'Production capacity of 1 million BDMT/ year',
    },
    {
      icon: 'certificate',
      title: 'Certifications',
      description: 'PEFC FM/COC wood chips certification',
    },
    {
      icon: 'factory',
      title: 'Future Plans',
      description: '$24 million wood chips and pellets factory',
    },
  ],
  videoEyebrow: 'OFC Company',
  videoTitle: 'A Leading Wood Chips Producer',
  videoParagraphs: [
    'OFC Company, based in Vietnam, has emerged as a prominent player in the wood chips market.',
    'With a commitment to sustainable forestry practices, they have become a reliable supplier of high-quality wood chips to international markets.',
  ],
  videoUrl: 'https://youtu.be/hJiC6s2RfIo',
  videoThumbnail: null,
  faqs: [
    {
      question: 'What logistics services do you offer?',
      answer:
        'We provide end-to-end export logistics — inland transport, warehousing, loading, documentation and customs support — from origin to destination.',
    },
    {
      question: 'What cargo do you handle?',
      answer:
        'We handle wood chips, pellets and processed timber, loaded in bulk vessels or containers.',
    },
    {
      question: 'Which ports do you ship from?',
      answer: 'We primarily ship through Cai Lan and Hai Phong ports in northern Vietnam.',
    },
    {
      question: 'Can you consolidate and store cargo?',
      answer:
        'Yes — our covered and open-yard warehouses offer secure storage, inventory management and flexible cargo consolidation.',
    },
  ],
};

const VI: ProductContent = {
  name: 'Vận chuyển & Kho bãi',
  title: 'Vận chuyển & Kho bãi',
  intro:
    'Chúng tôi đảm bảo logistics hiệu quả và lưu kho an toàn để giao sản phẩm đúng hẹn, an toàn. Mạng lưới vận chuyển hiện đại và hệ thống kho bãi được quản lý tốt hỗ trợ vận hành thông suốt từ điểm đầu đến điểm cuối.',
  bannerImage: 'assets/images/products/transportation-warehouses-banner.jpeg',
  bannerAlt: 'Vận chuyển và kho bãi',
  badges: [
    { icon: 'truck', label: 'Vận chuyển tin cậy' },
    { icon: 'warehouse', label: 'Kho bãi an toàn' },
    { icon: 'clock', label: 'Giao hàng đúng hẹn' },
  ],
  overview: [
    'Dịch vụ vận chuyển và kho bãi của chúng tôi hỗ trợ xuất khẩu dăm gỗ và pallet liền mạch. Với cơ sở lưu trữ chiến lược và quản lý logistics đáng tin cậy, chúng tôi đảm bảo xử lý hiệu quả, lưu kho an toàn và giao hàng đúng hẹn.',
    'Được hậu thuẫn bởi mạng lưới logistics chuyên trách, chúng tôi tối ưu việc luân chuyển hàng hóa và hoạt động xuất khẩu để đáp ứng nhu cầu của thị trường toàn cầu.',
  ],
  overviewImage: 'assets/images/products/transportation-warehouses-overview.png',
  overviewImageAlt: 'Xe container tại kho của OFC',
  specs: [
    { label: 'Dịch vụ', value: 'Logistics xuất khẩu trọn gói' },
    { label: 'Loại hàng', value: 'Dăm gỗ, viên nén, gỗ chế biến' },
    { label: 'Lưu kho', value: 'Kho kín & bãi ngoài trời' },
    { label: 'Bốc xếp', value: 'Tàu rời & container' },
    { label: 'Cảng', value: 'Cái Lân, Hải Phòng' },
    { label: 'Phạm vi', value: 'Trong nước & quốc tế' },
    { label: 'Chứng từ', value: 'Hỗ trợ chứng từ & hải quan' },
    { label: 'Giao hàng', value: 'Đúng hẹn, từ điểm đầu đến cuối' },
  ],
  applicationsIntro: 'Dịch vụ logistics và kho bãi của chúng tôi hỗ trợ mọi khâu xuất khẩu.',
  applications: [
    {
      icon: 'ship',
      title: 'Logistics xuất khẩu',
      description: 'Vận chuyển dăm gỗ và pallet hiệu quả đến cảng và khách hàng.',
    },
    {
      icon: 'warehouse',
      title: 'Kho bãi',
      description: 'Lưu trữ an toàn với quản lý tồn kho và xử lý hàng hiệu quả.',
    },
    {
      icon: 'clock',
      title: 'Điều phối lô hàng',
      description: 'Bốc xếp đúng giờ, hỗ trợ chứng từ và lập lịch xuất khẩu.',
    },
    {
      icon: 'route',
      title: 'Hỗ trợ chuỗi cung ứng',
      description: 'Giải pháp logistics đảm bảo xuất khẩu thông suốt.',
    },
    {
      icon: 'packages',
      title: 'Gom hàng',
      description: 'Gom hàng linh hoạt cho các lô hàng tối ưu.',
    },
  ],
  whyChoose: [
    {
      icon: 'ship',
      title: 'Xuất khẩu thành công',
      description: 'Đã xuất khẩu sang Trung Quốc, Nhật Bản và Hàn Quốc',
    },
    {
      icon: 'chartBar',
      title: 'Công suất & chất lượng',
      description: 'Công suất sản xuất 1 triệu BDMT/năm',
    },
    { icon: 'certificate', title: 'Chứng nhận', description: 'Chứng nhận PEFC FM/COC cho dăm gỗ' },
    {
      icon: 'factory',
      title: 'Kế hoạch tương lai',
      description: 'Nhà máy dăm gỗ và viên nén trị giá 24 triệu USD',
    },
  ],
  videoEyebrow: 'OFC Company',
  videoTitle: 'Nhà sản xuất dăm gỗ hàng đầu',
  videoParagraphs: [
    'OFC Company, có trụ sở tại Việt Nam, đã trở thành một tên tuổi nổi bật trên thị trường dăm gỗ.',
    'Với cam kết về lâm nghiệp bền vững, công ty đã trở thành nhà cung cấp dăm gỗ chất lượng cao đáng tin cậy cho thị trường quốc tế.',
  ],
  videoUrl: 'https://youtu.be/hJiC6s2RfIo',
  videoThumbnail: null,
  faqs: [
    {
      question: 'Quý công ty cung cấp dịch vụ logistics nào?',
      answer:
        'Chúng tôi cung cấp logistics xuất khẩu trọn gói — vận chuyển nội địa, lưu kho, bốc xếp, chứng từ và hỗ trợ hải quan — từ điểm đầu đến điểm cuối.',
    },
    {
      question: 'Quý công ty xử lý loại hàng nào?',
      answer:
        'Chúng tôi xử lý dăm gỗ, viên nén và gỗ chế biến, bốc xếp bằng tàu rời hoặc container.',
    },
    {
      question: 'Hàng được xuất qua cảng nào?',
      answer: 'Chúng tôi chủ yếu xuất qua cảng Cái Lân và Hải Phòng ở miền Bắc Việt Nam.',
    },
    {
      question: 'Có thể gom và lưu kho hàng không?',
      answer:
        'Có — kho kín và bãi ngoài trời của chúng tôi cung cấp lưu trữ an toàn, quản lý tồn kho và gom hàng linh hoạt.',
    },
  ],
};

export function transportationContent(locale: string): ProductContent {
  return locale.startsWith('vi') ? VI : EN;
}
